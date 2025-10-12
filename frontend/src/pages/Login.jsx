import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../services/authApi";

export default function Login() {
  const nav = useNavigate();
  const [form, setForm] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    setLoading(true);
    try {
      const { token, role, username } = await loginUser(form.username, form.password);
      // persist
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);      // "teacher" | "user"
      localStorage.setItem("username", username);
      // simple flag for your existing checks if you want:
      localStorage.setItem("auth", "1");
      nav("/"); // go home
    } catch (ex) {
      setErr(ex.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-slate-950 px-4">
      <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900/60 p-8 shadow-xl">
        <h1 className="mb-6 text-center text-2xl font-semibold">Sign in</h1>

        {err && (
          <div className="mb-4 rounded-lg bg-red-500/10 px-3 py-2 text-sm text-red-300">
            {err}
          </div>
        )}

        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label htmlFor="username" className="mb-1 block text-sm text-slate-300">
              Username
            </label>
            <input
              id="username"
              name="username"
              required
              value={form.username}
              onChange={onChange}
              className="w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-600"
              placeholder="e.g. timscott"
              autoComplete="username"
            />
          </div>

          <div>
            <label htmlFor="password" className="mb-1 block text-sm text-slate-300">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              value={form.password}
              onChange={onChange}
              className="w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-600"
              placeholder="••••••••"
              autoComplete="current-password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-2 w-full cursor-pointer rounded-lg bg-indigo-600 px-4 py-2 font-medium transition hover:bg-indigo-500 disabled:opacity-60"
          >
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-slate-400">
          New here?{" "}
          <Link to="/register" className="text-indigo-400 hover:underline">
            Create an account
          </Link>
        </div>
      </div>
    </div>
  );
}
