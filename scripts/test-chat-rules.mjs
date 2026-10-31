
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join, resolve } from "node:path";
import { runInNewContext } from "node:vm";
import ts from "typescript";

// Locate the project root.
const root = resolve(
  dirname(fileURLToPath(import.meta.url)),
  ".."
);

// Read the actual chatbot rules.
const source = readFileSync(
  join(root, "lib", "chat-rules.ts"),
  "utf8"
);

// Convert TypeScript to executable JavaScript.
const compiled = ts.transpileModule(source, {
  compilerOptions: {
    target: ts.ScriptTarget.ES2022,
    module: ts.ModuleKind.CommonJS,
  },
  reportDiagnostics: true,
});

const errors = (compiled.diagnostics ?? []).filter(
  (diagnostic) =>
    diagnostic.category === ts.DiagnosticCategory.Error
);

assert.equal(
  errors.length,
  0,
  "TypeScript transpilation should succeed"
);

const exported = {};

runInNewContext(compiled.outputText, {
  exports: exported,
});

const {
  goals,
  levels,
  days,
  durations,
  buildGuidance,
  answerQuestion,
} = exported;

let checks = 0;

// Test all 144 valid workout preference combinations.
for (const goal of goals) {
  for (const level of levels) {
    for (const day of days) {
      for (const duration of durations) {
        const guidance = buildGuidance({
          goal,
          level,
          days: day,
          duration,
        });

        assert.ok(
          guidance.includes(goal),
          `Expected goal: ${goal}`
        );

        assert.ok(
          guidance.includes(`${day} training days`),
          `Expected days: ${day}`
        );

        assert.ok(
          guidance.includes(`${duration}-minute`),
          `Expected duration: ${duration}`
        );

        checks++;
      }
    }
  }
}

// Test chatbot responses and safety rules.
const intake = {
  goal: "Strength",
  level: "Beginner",
  days: "3",
  duration: "45",
};

const scenarios = [
  ["My knee hurts, what exercise should I do?", "guardrail"],
  ["I have pain in my shoulder", "guardrail"],
  ["How do I recover from an injury?", "guardrail"],
  ["Is starving a good idea?", "guardrail"],
  ["Should I take steroids?", "guardrail"],
  ["How many days per week?", "guidance"],
  ["How long should my workout last?", "guidance"],
  ["What is my goal?", "guidance"],
  ["How much experience do I need?", "guidance"],
  ["What should I do next?", "guidance"],
  ["What is the weather?", "fallback"],
  ["", "fallback"],
  ["I am visiting Spain", "fallback"],
  ["The drugstore is closed", "fallback"],
];

for (const [question, expected] of scenarios) {
  const reply = answerQuestion(question, intake);

  assert.equal(
    reply.category,
    expected,
    `Unexpected response for: ${question}`
  );

  assert.ok(
    reply.message.length > 0,
    "Every response should contain a message"
  );

  checks++;
}

console.log(
  `PASS: ${checks} pure-logic checks (144 combinations + ${scenarios.length} questions).`
);

console.log(
  "Software tests completed. External-user and Supabase tests are separate."
);
