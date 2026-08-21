import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen bg-white flex items-center justify-center px-6">
      <div className="text-center max-w-3xl">

        <Image
          src="/workout-planner-logo.png"
          alt="Workout Planner Logo"
          width={500}
          height={250}
          className="mx-auto mb-10"
          priority
        />

        <p className="text-purple-600 font-bold tracking-widest uppercase mb-4">
          Workout Planner
        </p>

        <h1 className="text-5xl md:text-7xl font-black text-black">
          Próximamente
        </h1>

        <p className="mt-6 text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
          Estamos creando una nueva forma de organizar tus entrenamientos
          según tus objetivos, tiempo disponible y nivel de experiencia.
        </p>

        <div className="mt-10">
          <span className="inline-block rounded-full bg-purple-600 px-8 py-3 text-white font-semibold">
            Build a workout that fits your life.
          </span>
        </div>

        <p className="mt-16 text-sm text-gray-400">
          ©️ 2026 Workout Planner. All rights reserved.
        </p>

      </div>
    </main>
  );
}