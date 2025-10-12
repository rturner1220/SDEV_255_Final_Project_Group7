import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "../components/Card";
import Toast from "../components/Toast";
import ConfirmDialog from "../components/ConfirmDialog";
import {
  setLoading,
  setError,
  setCourses,
  addCourse,
  updateCourseLocal,
  removeCourseLocal,
  startEdit,
  clearEdit,
} from "../redux/courseSlice";
import * as api from "../services/coursesApi";

const initialForm = {
  name: "",
  number: "",
  subject: "",
  credits: "",
  description: "",
};

const Courses = () => {
  const dispatch = useDispatch();
  const { items, loading, editId } = useSelector((s) => s.courses);

  const [form, setForm] = useState(initialForm);
  const [toast, setToast] = useState({
    show: false,
    type: "success",
    message: "",
  });
  const [confirm, setConfirm] = useState({ open: false, id: null });

  useEffect(() => {
    (async () => {
      dispatch(setLoading(true));
      try {
        const data = await api.fetchCourses();
        dispatch(setCourses(data));
      } catch (e) {
        dispatch(setError(e.message));
        setToast({
          show: true,
          type: "error",
          message: "Failed to load courses.",
        });
      } finally {
        dispatch(setLoading(false));
      }
    })();
  }, [dispatch]);

  useEffect(() => {
    if (!editId) return;
    const course = items.find((c) => c._id === editId);
    if (!course) return;
    setForm({
      name: course.name ?? "",
      number: course.number ?? "",
      subject: course.subject ?? "",
      credits: String(course.credits ?? ""),
      description: course.description ?? "",
    });
  }, [editId, items]);

  const isEdit = useMemo(() => Boolean(editId), [editId]);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const clean = (f) => ({
    name: f.name.trim(),
    number: f.number.trim(),
    subject: f.subject.trim(),
    credits: Number(f.credits || 0),
    description: f.description.trim(),
  });

  const onSave = async () => {
    const body = clean(form);
    try {
      if (isEdit) {
        const updated = await api.updateCourse(editId, body);
        dispatch(updateCourseLocal(updated));
        setToast({ show: true, type: "success", message: "Course updated." });
      } else {
        const created = await api.createCourse(body);
        dispatch(addCourse(created));
        setToast({ show: true, type: "success", message: "Course added." });
      }
      setForm(initialForm);
      dispatch(clearEdit());
    } catch (e) {
      setToast({
        show: true,
        type: "error",
        message:
          e?.response?.data?.message || e?.response?.data || "Save failed.",
      });
    }
  };

  const onEditClick = (course) => dispatch(startEdit(course._id));

  const askDelete = (id) => setConfirm({ open: true, id });

  const onConfirmDelete = async () => {
    try {
      await api.deleteCourse(confirm.id);
      dispatch(removeCourseLocal(confirm.id));
      setToast({ show: true, type: "success", message: "Course deleted." });
    } catch {
      setToast({ show: true, type: "error", message: "Delete failed." });
    } finally {
      setConfirm({ open: false, id: null });
    }
  };

  const onReset = () => {
    setForm(initialForm);
    dispatch(clearEdit());
  };

  return (
    <div className="mx-auto max-w-6xl space-y-6 px-4 py-10">
      <Card
        title={isEdit ? "Edit Course" : "Add Course"}
        action={
          <span className="rounded-md border border-slate-700 px-2 py-1 text-xs text-slate-300">
            {loading ? "Loading..." : isEdit ? "Editing" : "Create"}
          </span>
        }
      >
        <div className="grid grid-cols-1 gap-3 md:grid-cols-4">
          <input
            name="name"
            value={form.name}
            onChange={onChange}
            className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm"
            placeholder="Course Name (e.g., Algebra and Analysis)"
          />
          <input
            name="number"
            value={form.number}
            onChange={onChange}
            className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm"
            placeholder="Course Number (e.g., MATH136)"
          />
          <input
            name="subject"
            value={form.subject}
            onChange={onChange}
            className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm"
            placeholder="Subject Area"
          />
          <input
            name="credits"
            value={form.credits}
            onChange={onChange}
            className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm"
            placeholder="Credits 1 to 4"
          />
        </div>
        <textarea
          name="description"
          value={form.description}
          onChange={onChange}
          className="mt-3 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm"
          rows="3"
          placeholder="Description"
        />

        <div className="mt-4 flex gap-3">
          <button
            onClick={onSave}
            className="rounded-lg bg-[#1c48a5] px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 cursor-pointer"
          >
            {isEdit ? "Update Course" : "Add Course"}
          </button>
          <button
            onClick={onReset}
            className="rounded-lg border border-slate-700 px-4 py-2 text-sm text-slate-200 hover:bg-slate-800 cursor-pointer"
          >
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
                <th className="p-3">Number</th>
                <th className="p-3">Subject</th>
                <th className="p-3">Credits</th>
                <th className="p-3">Description</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((r, idx) => (
                <tr
                  key={r._id}
                  className={idx % 2 ? "bg-slate-900" : "bg-slate-950"}
                >
                  <td className="p-3">{r.name}</td>
                  <td className="p-3">{r.number}</td>
                  <td className="p-3">{r.subject}</td>
                  <td className="p-3">{r.credits}</td>
                  <td className="p-3 text-slate-300">{r.description}</td>
                  <td className="p-3">
                    <div className="flex gap-2">
                      <button
                        onClick={() => onEditClick(r)}
                        className="rounded-md border border-slate-700 px-3 py-1 text-xs hover:bg-slate-800 cursor-pointer"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => askDelete(r._id)}
                        className="rounded-md border border-red-700 px-3 py-1 text-xs text-red-300 hover:bg-red-950/40 cursor-pointer"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {!items.length && (
                <tr>
                  <td className="p-3 text-slate-400" colSpan={6}>
                    No courses yet
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>

      <Toast
        show={toast.show}
        type={toast.type}
        onClose={() => setToast((s) => ({ ...s, show: false }))}
      >
        {toast.message}
      </Toast>

      <ConfirmDialog
        open={confirm.open}
        title="Delete course"
        message="Are you sure? This cannot be undone."
        onCancel={() => setConfirm({ open: false, id: null })}
        onConfirm={onConfirmDelete}
      />
    </div>
  );
};

export default Courses;
