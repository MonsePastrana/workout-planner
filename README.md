# 🏋️ Workout Planner

Workout Planner is a web application designed for students, young adults, and people with limited time who want a simple way to organize their workout routines.

## Main Idea

Workout Planner helps users create and organize workout routines based on:

- Fitness goal
- Experience level
- Available training days
- Workout duration

The main purpose of the project is to make workout planning simple, practical, and easy to understand.

## Problem

Many students and young adults want to exercise consistently but struggle to create a workout routine that fits their goals, experience level, available time, and weekly schedule.

Workout Planner addresses this problem by turning those preferences into a structured workout plan.

## Users

The main users of Workout Planner are:

- Students
- Young adults
- People with limited time
- Beginners who need help organizing workouts
- Users who want a simple training structure

## Generative Core Module

The main functional module of Workout Planner is available at:

`/core`

The Core module converts the original Workout Planner methodology into a working generative experience.

The user selects:

### 1. Fitness Goal

- Muscle Gain
- Strength
- General Fitness
- Weight Loss

### 2. Experience Level

- Beginner
- Intermediate
- Advanced

### 3. Days per Week

- 2 days
- 3 days
- 4 days
- 5 days

### 4. Workout Duration

- 30 minutes
- 45 minutes
- 60 minutes

After selecting the preferences, the user can press:

`Generate Workout`

Workout Planner then creates a structured workout based on the selected inputs.

The generated workout:

- Changes depending on the selected preferences
- Is divided by training day
- Includes a training focus
- Includes exercises
- Includes sets
- Includes repetitions

Example:

### Day 1 — Push

- Bench Press: 3 sets × 8–10 reps
- Shoulder Press: 3 sets × 8–10 reps
- Incline Dumbbell Press: 3 sets × 10–12 reps
- Lateral Raises: 3 sets × 12–15 reps

## Supabase Integration

Workout Planner uses Supabase as the backend database.

Generated workouts can be saved using the:

`Save Workout`

button.

The generated results are stored in the Supabase table:

`core_outputs`

The table stores information such as:

- Fitness goal
- Experience level
- Days per week
- Workout duration
- Generated workout output
- Creation date and time

Supabase credentials are not hardcoded in the source code.

The project uses environment variables for the Supabase connection.

## Saved Workouts

The `/core` page includes a section called:

`Saved Workouts`

This section displays a simple preview of recently saved workout plans from Supabase.

The implementation is intentionally simple because user authentication and advanced dashboard features are outside the current project scope.

## Current Version

The current version includes:

- Workout Planner logo
- Responsive homepage
- Navigation bar
- Hero section
- Main feature cards
- Core product section
- Product section
- Pricing preview
- Marketing section
- Chat preview
- Demo section
- Dashboard preview
- Project roadmap
- Footer
- `/docs` placeholder page
- `/core` workout generator
- Dynamic workout generation
- Supabase integration
- Save Workout functionality
- Saved Workouts preview
- Responsive desktop and mobile design

## Technology Stack

Workout Planner is built with:

- Next.js
- TypeScript
- React
- Tailwind CSS
- Supabase
- Git
- GitHub
- Vercel
- Visual Studio Code

## Architecture

### Application

User / Browser  
↓  
Workout Planner  
Next.js + TypeScript + Tailwind CSS  
↓  
Core Workout Generator  
↓  
Supabase  
Database for generated workout outputs

### Deployment

GitHub  
↓  
Vercel  
↓  
Live Workout Planner URL

## Core Workflow

The main product workflow is:

1. User opens `/core`
2. User selects a fitness goal
3. User selects an experience level
4. User selects training days per week
5. User selects workout duration
6. User presses Generate Workout
7. Workout Planner creates a structured workout
8. User can press Save Workout
9. Workout output is stored in Supabase
10. Recent saved workouts appear in the Saved Workouts section

## Testing

The Core module was tested using the following required test cases.

### Test 1

- Fitness Goal: Muscle Gain
- Experience Level: Beginner
- Days per Week: 3 days
- Workout Duration: 45 minutes

Expected result:

A 3-day muscle-building workout with appropriate exercises, sets, and repetitions.

### Test 2

- Fitness Goal: Strength
- Experience Level: Intermediate
- Days per Week: 4 days
- Workout Duration: 60 minutes

Expected result:

A 4-day strength-focused workout with lower repetition ranges and more exercises per training session.

### Test 3

- Fitness Goal: General Fitness
- Experience Level: Beginner
- Days per Week: 2 days
- Workout Duration: 30 minutes

Expected result:

A simple 2-day general fitness workout with fewer exercises per session because of the shorter workout duration.

All three test cases were verified locally.

Save Workout was also tested and generated results were successfully stored in Supabase.

## Project Routes

### Homepage

`/`

Main public Workout Planner landing page.

### Core

`/core`

Working generative workout module.

### Documentation

`/docs`

Documentation placeholder page for future project documentation.

## Scope

The current version focuses on the core workout planning experience.

The following features are not included in the current scope:

- User authentication
- Nutrition planning
- Smartwatch integration
- Social features
- Payments
- Advanced progress tracking
- AI chat assistance
- Advanced exercise database
- Unnecessary additional pages

## Future Features

Possible future improvements include:

- User accounts
- Personal workout libraries
- Advanced progress tracking
- Exercise database
- Workout history
- More advanced workout customization
- Interactive workout assistance
- Dashboard functionality
- Additional training methods

## Project Roadmap

The project roadmap is divided into six phases:

1. Infrastructure
2. Workout Input
3. Routine Generator
4. Saved Workouts
5. Progress Tracking
6. Final Product

The current project has completed important parts of:

- Infrastructure
- Workout Input
- Routine Generator
- Basic Saved Workouts

## Project Status

🚧 Workout Planner is currently under development.

The working generative Core module has been implemented and connected to Supabase.

The next priorities are:

- Final production verification
- Vercel deployment verification
- Documentation improvements
- Final project testing
- Final project evidence and screenshots