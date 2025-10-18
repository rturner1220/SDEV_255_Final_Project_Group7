import { Link } from "react-router-dom";
import Card from "../components/Card";

const StudentHome = () => {
  const username = localStorage.getItem("username") || "student";

  return (
    <div className="mx-auto max-w-6xl space-y-6 px-4 py-10">
      <Card title={`Welcome, ${username}`}>
        <p className="text-slate-300">
          Browse available courses, add them to your schedule, and manage your
          enrolled classes.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link
            className="rounded-md cursor-pointer border border-slate-700 bg-[#1c48a5] px-4 py-2 text-white hover:bg-indigo-700"
            to="/student/courses"
          >
            View Courses
          </Link>
          <Link
            className="rounded-md cursor-pointer border border-slate-700 px-4 py-2 hover:bg-slate-800"
            to="/student/schedule"
          >
            My Schedule
          </Link>
        </div>
      </Card>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Card
          title="Find classes"
          action={
            <Link
              to="/student/courses"
              className="rounded-md cursor-pointer border border-slate-700 px-3 py-1 text-sm hover:bg-slate-800"
            >
              Browse
            </Link>
          }
        >
          <p className="text-slate-400">
            Search by name or course number and add classes to your schedule.
          </p>
        </Card>
        <Card
          title="Manage schedule"
          action={
            <Link
              to="/student/schedule"
              className="rounded-md cursor-pointer border border-slate-700 px-3 py-1 text-sm hover:bg-slate-800"
            >
              View
            </Link>
          }
        >
          <p className="text-slate-400">
            Review your selected classes and drop any you no longer need.
          </p>
        </Card>
      </div>
    </div>
  );
};

export default StudentHome;
