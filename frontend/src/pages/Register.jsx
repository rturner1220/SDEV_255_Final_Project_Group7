import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser, loginUser } from "../services/authApi";

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: "",
    password: "",
    role: "user", // default role
  });
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    try {
      // Create the account
      await registerUser({
        username: form.username,
        password: form.password,
        role: form.role,
      });

      // Optional: auto-login after registration
      const data = await loginUser(form.username, form.password);
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);
      localStorage.setItem("username", data.username);

      navigate("/"); // go home (or /courses)
    } catch (err) {
      setError(err.message || "Registration failed");
    }
  }

  return (
    <div className="mx-auto max-w-md px-4 py-12">
      <h1 className="mb-6 text-2xl font-semibold">Create Account</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="mb-1 block text-sm text-slate-300">Username</label>
          <input
            className="w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-slate-100 outline-none focus:border-indigo-600"
            value={form.username}
            onChange={(e) => setForm((s) => ({ ...s, username: e.target.value }))}
            autoComplete="username"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm text-slate-300">Password</label>
          <input
            type="password"
            className="w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-slate-100 outline-none focus:border-indigo-600"
            value={form.password}
            onChange={(e) => setForm((s) => ({ ...s, password: e.target.value }))}
            autoComplete="new-password"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm text-slate-300">Role</label>
          <select
            className="w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-slate-100 outline-none focus:border-indigo-600"
            value={form.role}
            onChange={(e) => setForm((s) => ({ ...s, role: e.target.value }))}
          >
            <option value="user">Student</option>
            <option value="teacher">Teacher</option>
          </select>
        </div>

        {error && (
          <p className="rounded-md border border-red-900 bg-red-950/50 p-2 text-sm text-red-300">
            {error}
          </p>
        )}

        <button
          type="submit"
          className="w-full rounded-md cursor-pointer bg-indigo-700 px-4 py-2 font-medium text-white hover:bg-indigo-600"
        >
          Create account
        </button>
      </form>

      <p className="mt-4 text-sm text-slate-400">
        Already have an account?{" "}
        <Link to="/login" className="text-indigo-400 hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  );
}
