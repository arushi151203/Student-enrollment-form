const express = require("express");
const cors    = require("cors");
const pool    = require("./db");

const app  = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Enroll a student
app.post("/api/enroll", async (req, res) => {
  const { name, age, email, course, department } = req.body;

  if (!name || !age || !email || !course || !department)
    return res.status(400).json({ error: "All fields are required." });

  try {
    const result = await pool.query(
      `INSERT INTO students (name, age, email, course, department)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [name, age, email, course, department]
    );
    res.status(201).json({ message: "Enrolled!", student: result.rows[0] });
  } catch (err) {
    if (err.code === "23505")
      return res.status(409).json({ error: "Email already registered." });
    res.status(500).json({ error: "Server error." });
  }
});

// Get all students
app.get("/api/students", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM students ORDER BY enrolled_at DESC"
    );
    res.json(result.rows);
  } catch {
    res.status(500).json({ error: "Server error." });
  }
});

app.listen(PORT, () => console.log(`Backend running on http://localhost:${PORT}`));


// pool.connect((err, client, release) => {
//   if (err) {
//     console.error("Database connection error:", err.message);
//   } else {
//     console.log("Connected to PostgreSQL successfully!");
//     release();
//   }
// });