import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

const Navbar = () => {
  const nav = useNavigate();
  const location = useLocation();
  const [auth, setAuth] = useState({
    isAuthed: !!localStorage.getItem("token"),
    role: localStorage.getItem("role") || null,
    username: localStorage.getItem("username") || null,
  });

  // keep it in sync if localStorage changes in other tabs
  useEffect(() => {
    const onStore = () =>
      setAuth({
        isAuthed: !!localStorage.getItem("token"),
        role: localStorage.getItem("role"),
        username: localStorage.getItem("username"),
      });
    window.addEventListener("storage", onStore);
    return () => window.removeEventListener("storage", onStore);
  }, []);

  // also sync when route changes (same-tab login triggers a navigation)
  useEffect(() => {
    setAuth({
      isAuthed: !!localStorage.getItem("token"),
      role: localStorage.getItem("role"),
      username: localStorage.getItem("username"),
    });
  }, [location]);

  const links = [
    { to: "/", label: "Home", end: true },
    { to: "/courses", label: "Courses" },
    { to: "/about", label: "About" },
    { to: "/contact", label: "Contact" },
  ];

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("username");
    localStorage.removeItem("auth"); // legacy key if used
    setAuth({ isAuthed: false, role: null, username: null });
    nav("/login");
  };

  const showTeacherLinks = auth.isAuthed && auth.role === "teacher";

  return (
    <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-900/80 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <div className="text-lg font-semibold tracking-wide">
          SDEV 255 — Final Project
        </div>
        <ul className="flex items-center gap-6 text-sm">
          {showTeacherLinks &&
            links.map((l) => (
              <li key={l.to}>
                <NavLink
                  to={l.to}
                  end={l.end}
                  className={({ isActive }) =>
                    [
                      "rounded-md px-2 py-1 transition",
                      isActive
                        ? "bg-[#1c48a5] text-white px-3 py-2 rounded-md"
                        : "text-gray-300 hover:bg-indigo-700 hover:text-white px-3 py-2 rounded-md",
                    ].join(" ")
                  }
                >
                  {l.label}
                </NavLink>
              </li>
            ))}

          {!auth.isAuthed ? (
            <li>
              <NavLink
                to="/login"
                className="text-gray-300 cursor-pointer hover:bg-indigo-700 hover:text-white px-3 py-2 rounded-md"
              >
                Login
              </NavLink>
            </li>
          ) : (
            <>
              {auth.role === "user" && (
                <>
                  <li>
                    <NavLink
                      to="/student"
                      end
                      className={({ isActive }) =>
                        [
                          "rounded-md px-3 py-2",
                          isActive
                            ? "bg-[#1c48a5] text-white"
                            : "text-gray-300 hover:bg-indigo-700 hover:text-white",
                        ].join(" ")
                      }
                    >
                      Student
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/student/courses"
                      className={({ isActive }) =>
                        [
                          "rounded-md px-3 py-2",
                          isActive
                            ? "bg-[#1c48a5] text-white"
                            : "text-gray-300 hover:bg-indigo-700 hover:text-white",
                        ].join(" ")
                      }
                    >
                      View Courses
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/student/schedule"
                      className={({ isActive }) =>
                        [
                          "rounded-md px-3 py-2",
                          isActive
                            ? "bg-[#1c48a5] text-white"
                            : "text-gray-300 hover:bg-indigo-700 hover:text-white",
                        ].join(" ")
                      }
                    >
                      My Schedule
                    </NavLink>
                  </li>
                </>
              )}
              <li className="text-xs text-slate-400">
                {auth.username}{" "}
                <span className="rounded bg-slate-800 px-2 py-0.5">
                  {auth.role}
                </span>
              </li>
              <li>
                <button
                  onClick={logout}
                  className="rounded-md cursor-pointer bg-indigo-600 px-3 py-2 text-white hover:bg-indigo-500"
                >
                  Logout
                </button>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};
export default Navbar;
