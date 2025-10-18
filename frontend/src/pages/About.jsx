const About = () => {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
        <h1 className="text-3xl font-bold mb-3">About</h1>
        <p className="text-slate-300 mb-3">
          This app is a mini college registration system built as a two‑stage project.
          Stage 1 delivered teacher authentication and full CRUD for courses. Stage 2 adds
          student authorization and experience: browsing courses, adding to a personal schedule,
          and managing enrollments.
        </p>
        <ul className="list-disc pl-6 text-slate-300 space-y-1">
          <li>Teachers: create, edit, and delete courses.</li>
          <li>Students: search courses by name or number, add/remove from schedule.</li>
          <li>Role-based routing and UI using React Router guards.</li>
          <li>Clean UI with Tailwind CSS.</li>
        </ul>
      </section>
    </div>
  );
};

export default About;