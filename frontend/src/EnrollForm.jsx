import { useState, useEffect } from "react";
import axios from "axios";

const COURSES = ["BCA", "B.Tech", "MCA", "M.Tech", "BBA", "MBA"];
const DEPARTMENTS = [
  "Computer Science",
  "Information Technology",
  "Electronics",
  "Mechanical",
  "Management",
];

export default function EnrollForm() {
  const [form, setForm] = useState({
    name: "", age: "", email: "", course: "", department: "",
  });
  const [students, setStudents] = useState([]);
  const [message, setMessage] = useState({ text: "", type: "" });

  useEffect(() => { fetchStudents(); }, []);

  const fetchStudents = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/api/students");
      setStudents(data);
    } catch {
      console.error("Could not fetch students.");
    }
  };

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/enroll", form);
      setMessage({ text: "Student enrolled successfully!", type: "success" });
      setForm({ name: "", age: "", email: "", course: "", department: "" });
      fetchStudents();
    } catch (err) {
      const msg = err.response?.data?.error || "Something went wrong.";
      setMessage({ text: msg, type: "error" });
    }
    setTimeout(() => setMessage({ text: "", type: "" }), 4000);
  };

  return (
    <>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }

        body {
          min-height: 100vh;
          background: #f0f2f5;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Segoe UI', sans-serif;
        }

        .page-wrapper {
          min-height: 100vh;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #f0f2f5;
          padding: 2rem;
        }

        .card {
          background: #ffffff;
          border-radius: 16px;
          padding: 2.5rem 2rem;
          width: 100%;
          max-width: 460px;
          box-shadow: 0 4px 24px rgba(0,0,0,0.08);
        }

        .card-title {
          font-size: 22px;
          font-weight: 600;
          color: #111;
          text-align: center;
          margin-bottom: 6px;
        }

        .card-sub {
          font-size: 13px;
          color: #888;
          text-align: center;
          margin-bottom: 28px;
        }

        .field {
          margin-bottom: 16px;
        }

        .field label {
          display: block;
          font-size: 13px;
          font-weight: 500;
          color: #444;
          margin-bottom: 6px;
        }

        .field input,
        .field select {
          width: 100%;
          padding: 10px 14px;
          border: 1px solid #ddd;
          border-radius: 8px;
          font-size: 14px;
          color: #111;
          background: #fff;
          outline: none;
          transition: border-color 0.2s;
        }

        .field input::placeholder {
          color: #fff;
          opacity: 1;
        }

        .field input:focus,
        .field select:focus {
          border-color: #a78bfa;
          box-shadow: 0 0 0 3px rgba(167,139,250,0.15);
        }

        .submit-btn {
          width: 100%;
          padding: 11px;
          margin-top: 8px;
          border: none;
          border-radius: 8px;
          background: #7c3aed;
          color: #fff;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.2s;
          letter-spacing: 0.3px;
        }

        .submit-btn:hover { background: #6d28d9; }

        .msg {
          margin-top: 14px;
          padding: 10px 14px;
          border-radius: 8px;
          font-size: 13px;
          text-align: center;
        }

        .msg.success { background: #dcfce7; color: #166534; }
        .msg.error   { background: #fee2e2; color: #991b1b; }

        .divider {
          border: none;
          border-top: 1px solid #eee;
          margin: 24px 0 18px;
        }

        .table-label {
          font-size: 13px;
          font-weight: 500;
          color: #888;
          margin-bottom: 10px;
        }

        table {
          width: 100%;
          border-collapse: collapse;
          font-size: 13px;
        }

        th {
          text-align: left;
          padding: 6px 8px;
          color: #888;
          font-weight: 500;
          border-bottom: 1px solid #eee;
        }

        td {
          padding: 8px 8px;
          color: #222;
          border-bottom: 1px solid #f5f5f5;
        }
      `}</style>

      <div className="page-wrapper">
        <div className="card">
          <div className="card-title">Student Enrollment</div>
          <div className="card-sub">Fill in the form below to enroll a student.</div>

          <form onSubmit={handleSubmit}>
            <div className="field">
              <label>Full Name</label>
              <input
                name="name" value={form.name} onChange={handleChange}
                placeholder="e.g. Arushi Lath" required
              />
            </div>

            <div className="field">
              <label>Age</label>
              <input
                name="age" type="number" value={form.age} onChange={handleChange}
                placeholder="e.g. 21" min="1" max="100" required
              />
            </div>

            <div className="field">
              <label>Email Address</label>
              <input
                name="email" type="email" value={form.email} onChange={handleChange}
                placeholder="e.g. arushi@example.com" required
              />
            </div>

            <div className="field">
              <label>Course</label>
              <select name="course" value={form.course} onChange={handleChange} required>
                <option value="">Select course</option>
                {COURSES.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>

            <div className="field">
              <label>Department</label>
              <select name="department" value={form.department} onChange={handleChange} required>
                <option value="">Select department</option>
                {DEPARTMENTS.map(d => <option key={d}>{d}</option>)}
              </select>
            </div>

            {message.text && (
              <div className={`msg ${message.type}`}>{message.text}</div>
            )}

            <button type="submit" className="submit-btn">Submit Enrollment</button>
          </form>

          {students.length > 0 && (
            <>
              <hr className="divider" />
              <div className="table-label">Enrolled Students</div>
              <table>
                <thead>
                  <tr>
                    <th>Name</th><th>Course</th><th>Dept</th><th>Email</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map(s => (
                    <tr key={s.id}>
                      <td>{s.name}</td>
                      <td>{s.course}</td>
                      <td>{s.department}</td>
                      <td>{s.email}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}
        </div>
      </div>
    </>
  );
}