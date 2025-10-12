import axios from "axios";

const BASE = import.meta.env.VITE_API_BASE || "http://localhost:3000";

const http = axios.create({
  baseURL: `${BASE}/api`,
  headers: { "Content-Type": "application/json" },
});

// Called by Login page
export async function loginUser(username, password) {
  try {
    const { data } = await http.post("/auth/login", { username, password });
    // expected from backend: { token, role, username }
    return data;
  } catch (e) {
    const msg = e?.response?.data?.error || e.message || "Login failed";
    throw new Error(msg);
  }
}

// Optionally used in a Register page (link is on the login)
export async function registerUser({ username, password, role }) {
  const { data } = await http.post("/auth/register", { username, password, role });
  return data;
}

// Helper: inject token on protected requests (e.g., create/update/delete courses)
export function authHeader() {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export const createCourse = async (course) => {
  const res = await http.post("/courses", course, { headers: authHeader() });
  return res.data;
};

export const updateCourse = async (id, course) => {
  await http.put(`/courses/${id}`, course, { headers: authHeader() });
  return { ...course, _id: id };
};

export const deleteCourse = async (id) => {
  await http.delete(`/courses/${id}`, { headers: authHeader() });
  return id;
};