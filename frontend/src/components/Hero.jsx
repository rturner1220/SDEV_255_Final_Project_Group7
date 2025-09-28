const Hero = () => {
  return (
    <section className="mx-auto max-w-6xl px-4 py-10">
      <div className="rounded-2xl border border-slate-800 bg-gradient-to-br from-slate-900 to-slate-800 p-8 shadow-xl">
        <h1 className="text-4xl font-bold tracking-tight">
          Welcome to Web App
        </h1>
        <p className="mt-3 max-w-2xl text-slate-300">
          Mini college registration system. Clean UI now — CRUD and auth will
          come in the next stages.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href="/courses"
            className="rounded-xl bg-[#1c48a5] px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
          >
            View Courses
          </a>
        </div>
      </div>
    </section>
  );
};
export default Hero;
