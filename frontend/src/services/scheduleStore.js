// Simple schedule store in localStorage for Stage 2 (no backend change required)
const KEY = "student_schedule"; // stores array of course IDs

export const getSchedule = () => {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

export const setSchedule = (ids) => {
  localStorage.setItem(KEY, JSON.stringify(ids));
};

export const addToSchedule = (id) => {
  const ids = new Set(getSchedule());
  ids.add(String(id));
  setSchedule([...ids]);
  return [...ids];
};

export const removeFromSchedule = (id) => {
  const ids = new Set(getSchedule());
  ids.delete(String(id));
  setSchedule([...ids]);
  return [...ids];
};

export const isInSchedule = (id) => {
  return getSchedule().includes(String(id));
};