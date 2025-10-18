import { useEffect, useMemo, useState } from "react";
import Card from "../components/Card";
import { fetchCourses } from "../services/coursesApi";
import {
  addToSchedule,
  removeFromSchedule,
  isInSchedule,
} from "../services/scheduleStore";

const StudentCourses = () => {
  const [all, setAll] = useState([]);
  const [query, setQuery] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let alive = true;
    (async () => {
      setBusy(true);
      setError("");
      try {
        const data = await fetchCourses();
        if (alive) setAll(data);
      } catch {
        if (alive) setError("Failed to load courses");
      } finally {
        if (alive) setBusy(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return all;
    return all.filter((c) => {
      const name = (c.name || "").toLowerCase();
      const number = (c.number || "").toLowerCase();
      return name.includes(q) || number.includes(q);
    });
  }, [query, all]);

  const toggle = (id) => {
    if (isInSchedule(id)) {
      removeFromSchedule(id);
    } else {
      addToSchedule(id);
    }
    // trigger rerender by resetting state
    setAll((list) => [...list]);
  };

  return (
    <div className="mx-auto max-w-6xl space-y-6 px-4 py-10">
      <Card
        title="Browse Courses"
        action={
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name or number"
            className="rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm"
          />
        }
      >
        {busy && <div className="text-sm text-slate-400">Loading…</div>}
        {error && <div className="text-sm text-red-400">{error}</div>}
        {!busy && !error && (
          <div className="overflow-x-auto rounded-xl border border-slate-800">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-800/60 text-slate-300">
                <tr>
                  <th className="p-3">Name</th>
                  <th className="p-3">Number</th>
                  <th className="p-3">Subject</th>
                  <th className="p-3">Credits</th>
                  <th className="p-3">Description</th>
                  <th className="p-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((c, idx) => {
                  const inSched = isInSchedule(c._id);
                  return (
                    <tr key={c._id} className={idx % 2 ? "bg-slate-900" : "bg-slate-950"}>
                      <td className="p-3">{c.name}</td>
                      <td className="p-3">{c.number}</td>
                      <td className="p-3">{c.subject}</td>
                      <td className="p-3">{c.credits}</td>
                      <td className="p-3 text-slate-300">{c.description}</td>
                      <td className="p-3">
                        <button
                          onClick={() => toggle(c._id)}
                          className={
                            "inline-flex items-center rounded-md cursor-pointer border px-3 py-1 text-xs font-medium " +
                            "transition-colors duration-200 outline-none " +
                            "focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-slate-300/40 focus-visible:ring-offset-slate-900 " +
                            (inSched
                              // REMOVE
                              ? " text-rose-300 border-rose-400/40 hover:bg-rose-900/50 hover:border-rose-300 active:bg-rose-900/60"
                              // ADD
                              : " text-emerald-300 border-emerald-400/40 hover:bg-emerald-900/50 hover:border-emerald-300 active:bg-emerald-900/60")
                          }
                        >
                          {inSched ? "Remove" : "Add"}
                        </button>
                      </td>
                    </tr>
                  );
                })}
                {!filtered.length && (
                  <tr>
                    <td className="p-3 text-slate-400" colSpan={6}>
                      No courses found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
};

export default StudentCourses;