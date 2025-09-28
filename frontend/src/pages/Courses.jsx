import Card from "../components/Card"

const Courses = () => {

    const rows = [
    { id: 1, name: "Intro to Web Dev", subject: "CS", credits: 3, desc: "HTML/CSS/JS fundamentals." },
    { id: 2, name: "Data Structures", subject: "CS", credits: 4, desc: "Lists, stacks, queues, trees." },
  ];

  return (
    <div className="mx-auto max-w-6xl space-y-6 px-4 py-10">
      <Card
        title="Add Course"
        action={
          <span className="rounded-md border border-slate-700 px-2 py-1 text-xs text-slate-300">
            UI only (no logic yet)
          </span>
        }
      >
        <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
          <input className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm"
                 placeholder="Course Name" />
          <input className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm"
                 placeholder="Subject Area" />
          <input className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm"
                 placeholder="Credits" />
        </div>
        <textarea className="mt-3 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm"
                  rows="3" placeholder="Description" />
        <div className="mt-4 flex gap-3">
          <button className="rounded-lg bg-[#1c48a5] px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700">
            Add Course
          </button>
          <button className="rounded-lg border border-slate-700 px-4 py-2 text-sm text-slate-200 hover:bg-slate-800">
            Reset
          </button>
        </div>
      </Card>

      <Card title="Courses">
        <div className="overflow-x-auto rounded-xl border border-slate-800">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-800/60 text-slate-300">
              <tr>
                <th className="p-3">Name</th>
                <th className="p-3">Subject</th>
                <th className="p-3">Credits</th>
                <th className="p-3">Description</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r, idx) => (
                <tr key={r.id} className={idx % 2 ? "bg-slate-900" : "bg-slate-950"}>
                  <td className="p-3">{r.name}</td>
                  <td className="p-3">{r.subject}</td>
                  <td className="p-3">{r.credits}</td>
                  <td className="p-3 text-slate-300">{r.desc}</td>
                  <td className="p-3">
                    <div className="flex gap-2">
                      <button className="rounded-md border border-slate-700 px-3 py-1 text-xs hover:bg-slate-800">View</button>
                      <button className="rounded-md border border-slate-700 px-3 py-1 text-xs hover:bg-slate-800">Edit</button>
                      <button className="rounded-md border border-red-700 px-3 py-1 text-xs text-red-300 hover:bg-red-950/40">Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}

export default Courses