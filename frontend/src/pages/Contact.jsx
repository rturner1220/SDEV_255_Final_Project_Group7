const Contact = () => {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
        <h1 className="text-3xl font-bold mb-3">Contact</h1>
        <p className="text-slate-300 mb-3">
          This project was built for Rosa Turner. Frontend: React + Vite + Tailwind CSS.
          Backend: Node.js + Express + MongoDB (Mongoose). Authentication uses JWT.
          Deployed on modern hosting platforms with environment-based configuration.
        </p>
        <div className="text-slate-400">
          Tech stack highlights:
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>Frontend: React, React Router, Redux (course state), Axios, Tailwind CSS</li>
            <li>Backend: Node.js, Express, Mongoose, JWT, CORS</li>
            <li>Build/Deploy: Vite on the frontend, Render for the backend</li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default Contact;