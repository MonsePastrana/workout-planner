import Image from "next/image";
import Link from "next/link";

export default function DocsPage() {
  return (
    <main className="min-h-screen bg-white px-6 py-12">
      <div className="mx-auto max-w-4xl">

        <div className="flex justify-center">
          <Image
            src="/workout-planner-logo.png"
            alt="Workout Planner Logo"
            width={300}
            height={150}
            className="h-auto"
          />
        </div>

        <div className="mt-12 text-center">

          <p className="font-bold uppercase tracking-widest text-purple-600">
            Workout Planner
          </p>

          <h1 className="mt-4 text-4xl font-black text-black md:text-5xl">
            Documentation
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600">
            This page is currently a placeholder for future Workout Planner
            documentation.
          </p>

          <p className="mx-auto mt-4 max-w-2xl text-gray-500">
            Product information, architecture, features, development notes,
            and technical documentation will be added as the project grows.
          </p>

          <div className="mt-10">
            <Link
              href="/"
              className="inline-block rounded-full bg-purple-600 px-8 py-3 font-semibold text-white transition hover:bg-purple-700"
            >
              Back to Home
            </Link>
          </div>

        </div>

      </div>
    </main>
  );
}