import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Courses from "./pages/Courses";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";
import RequireAuth from "./components/RequireAuth";
import RequireRole from "./components/RequireRole";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen w-full overflow-x-hidden bg-slate-950 text-slate-100">
        <Navbar />
        <Routes>
        
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/"
            element={
              <RequireAuth>
                <Home />
              </RequireAuth>
            }
          />
         <Route
            path="/courses"
            element={
              <RequireAuth>
                <Courses />
              </RequireAuth>
            }
          />
          <Route
            path="/about"
            element={
              <RequireAuth>
                <About />
              </RequireAuth>
            }
          />
          <Route
            path="/contact"
            element={
              <RequireAuth>
                <Contact />
              </RequireAuth>
            }
          />
         {/* example of teacher-only page (if you later add a course-admin page) */}
          {/* <Route
            path="/courses/admin"
            element={
              <RequireAuth>
                <RequireRole role="teacher">
                  <CourseAdmin />
                </RequireRole>
              </RequireAuth>
            }
          /> */}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
