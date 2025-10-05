import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],       
  loading: false,
  error: null,
  editId: null,    
};

const coursesSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    setLoading(state, { payload }) { state.loading = payload; },
    setError(state,   { payload }) { state.error   = payload; },

    setCourses(state, { payload }) { state.items = payload; state.error = null; },
    addCourse(state,  { payload }) { state.items.unshift(payload); },
    updateCourseLocal(state, { payload }) {
      const i = state.items.findIndex(c => c._id === payload._id);
      if (i !== -1) state.items[i] = payload;
    },
    removeCourseLocal(state, { payload:id }) {
      state.items = state.items.filter(c => c._id !== id);
    },

    startEdit(state, { payload:id }) { state.editId = id; },
    clearEdit(state) { state.editId = null; },
  },
});

export const {
  setLoading, setError, setCourses,
  addCourse, updateCourseLocal, removeCourseLocal,
  startEdit, clearEdit,
} = coursesSlice.actions;

export default coursesSlice.reducer;
