import { useEffect, useState } from "react";
import { getCoursesCount } from "../services/coursesApi.js";
import Hero from "../components/Hero";
import Card from "../components/Card";

const Home = () => {
  const [counts, setCounts] = useState({
    courses: 0,
    teachers: 8,
    students: 120,
  });

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const n = await getCoursesCount();
        if (alive) setCounts((c) => ({ ...c, courses: n }));
      } catch (e) {
        console.error(e);
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  const stats = [
    { label: "Courses", value: String(counts.courses) },
    { label: "Teachers", value: String(counts.teachers) },
    { label: "Students", value: String(counts.students) },
  ];

  return (
    <>
      <Hero />
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-4 px-4 pb-12 md:grid-cols-3">
        {stats.map((s) => (
          <Card key={s.label} title={s.label}>
            <div className="text-3xl font-bold">{s.value}</div>
            <p className="mt-1 text-sm text-slate-400">
              {" "}
              {s.label === "Courses" ? "Live data" : "Sample data"}
            </p>
          </Card>
        ))}
      </div>
    </>
  );
};

export default Home;
