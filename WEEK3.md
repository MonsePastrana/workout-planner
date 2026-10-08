# Week 3 — Product Architecture + Pricing Simulator

## Objective

Module 3 organizes Workout Planner into product features, pricing tiers, customer segments, and an interactive pricing and revenue simulator.

## Live Pages

- `/product`
- `/pricing`

## Product Architecture

The `/product` page includes:

- Product Feature Map
- Free, Plus, and Pro pricing tiers
- Students & Young Adults customer segment
- Busy Professionals customer segment

### Product Features

- Workout Generator
- Basic Personalization
- Saved Workouts
- Research Insights
- Advanced Personalization
- Progress Tracking

### Pricing Tiers

- Free: $0/month
- Plus: $4.99/month
- Pro: $8.99/month

## Pricing Simulator

The `/pricing` page includes:

- Conservative and Growth scenarios
- Customer segment selection
- Free, Plus, and Pro user inputs
- Plus and Pro monthly price inputs
- Assumptions Table
- Monthly Revenue
- Annual Revenue
- Paid Conversion
- Revenue per User
- Save Pricing Scenario
- Reset Scenario
- Saved Pricing Scenarios

## Supabase

Saved pricing scenarios are stored in the:

`pricing_scenarios`

table.

Saved records are retrieved from Supabase and displayed again in the Saved Pricing Scenarios section.

## Revenue Logic

Monthly Revenue:

`Plus Users × Plus Price + Pro Users × Pro Price`

Annual Revenue:

`Monthly Revenue × 12`

## Testing

Module 3 includes:

- 2 pricing logic tests
- 3 software tests
- Empty scenario name edge-case validation
- Supabase save and retrieval testing
- Scenario toggle and reset testing

## Iteration

After testing the pricing simulator, a Reset Scenario option was added so users can quickly restore the default Conservative scenario values.

## Live Website

https://workout-planner-lilac-six.vercel.app/