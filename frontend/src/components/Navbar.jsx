import { NavLink } from "react-router-dom";

const Navbar = () => {
  const links = [
    { to: "/", label: "Home", end: true },
    { to: "/courses", label: "Courses" },
    { to: "/about", label: "About" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-900/80 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <div className="text-lg font-semibold tracking-wide">
          SDEV 255 — Group 7
        </div>
        <ul className="flex items-center gap-6 text-sm">
          {links.map((l) => (
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
        </ul>
      </nav>
    </header>
  );
};
export default Navbar;
