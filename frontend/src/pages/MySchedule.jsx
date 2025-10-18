import { useEffect, useState } from "react";
import Card from "../components/Card";
import { fetchCourses } from "../services/coursesApi";
import { getSchedule, removeFromSchedule } from "../services/scheduleStore";

const MySchedule = () => {
  const [all, setAll] = useState([]);
  const [ids, setIds] = useState(getSchedule());

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const data = await fetchCourses();
        if (alive) setAll(data);
      } catch {
        // ignore for now
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  const mine = all.filter((c) => ids.includes(String(c._id)));

  const drop = (id) => {
    const next = removeFromSchedule(id);
    setIds(next);
  };

  return (
    <div className="mx-auto max-w-6xl space-y-6 px-4 py-10">
      <Card title="My Schedule">
        <div className="overflow-x-auto rounded-xl border border-slate-800">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-800/60 text-slate-300">
              <tr>
                <th className="p-3">Name</th>
                <th className="p-3">Number</th>
                <th className="p-3">Subject</th>
                <th className="p-3">Credits</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {mine.map((c, idx) => (
                <tr
                  key={c._id}
                  className={idx % 2 ? "bg-slate-900" : "bg-slate-950"}
                >
                  <td className="p-3">{c.name}</td>
                  <td className="p-3">{c.number}</td>
                  <td className="p-3">{c.subject}</td>
                  <td className="p-3">{c.credits}</td>
                  <td className="p-3">
                    <button
                      onClick={() => drop(c._id)}
                      className="rounded-md border cursor-pointer border-red-700 px-3 py-1 text-xs text-red-300 hover:bg-red-900/60"
                    >
                      Drop
                    </button>
                  </td>
                </tr>
              ))}
              {!mine.length && (
                <tr>
                  <td className="p-3 text-slate-400" colSpan={5}>
                    No classes in your schedule yet. Go to Student → View
                    Courses to add some.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default MySchedule;
