import axios from "axios";

const BASE = import.meta.env.VITE_API_BASE || "http://localhost:3000";

const http = axios.create({
  baseURL: `${BASE}/api`,
  headers: { "Content-Type": "application/json" },
});

// CRUD
export const fetchCourses = async () => {
  const res = await http.get("/courses");
  return res.data; // array
};

export const createCourse = async (course) => {
  const res = await http.post("/courses", course);
  return res.data; 
};

export const updateCourse = async (id, course) => {
  await http.put(`/courses/${id}`, course); // 204
  return { ...course, _id: id };            
};

export const deleteCourse = async (id) => {
  await http.delete(`/courses/${id}`);      // 204
  return id;
};

export const getCoursesCount = async () => {
  const { data } = await http.get("/courses/count");
  return data.count;                         // number
};
