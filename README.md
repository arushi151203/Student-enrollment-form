# 📋 Student Enrollment Form

A full-stack Student Enrollment Form application built during my internship at **UptoSkills**. It allows users to submit and manage student enrollment data with a clean and responsive UI.

## 📌 Features

- 📝 Submit student enrollment details
- 📊 View enrolled students
- 🗑️ Delete student records
- 💾 Data stored in PostgreSQL database
- 🎨 Responsive UI built with React

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React.js, Vite |
| Backend | Node.js, Express.js |
| Database | PostgreSQL |

## 📁 Project Structure

\`\`\`
student-enroll/
├── frontend/         # React frontend
│   ├── src/
│   └── index.html
├── backend/          # Express backend
│   ├── db.js
│   └── server.js
\`\`\`

## ⚙️ Getting Started

### Installation

1. Clone the repository
   \`\`\`bash
   git clone https://github.com/arushi151203/Student-enrollment-form.git
   cd Student-enrollment-form
   \`\`\`

2. Install frontend dependencies
   \`\`\`bash
   cd frontend
   npm install
   \`\`\`

3. Install backend dependencies
   \`\`\`bash
   cd backend
   npm install
   \`\`\`

4. Create \`backend/.env\` with your DB credentials:
   \`\`\`env
   DB_HOST=localhost
   DB_PORT=5432
   DB_USER=your_db_user
   DB_PASSWORD=your_db_password
   DB_NAME=your_db_name
   \`\`\`

5. Run backend
   \`\`\`bash
   node server.js
   \`\`\`

6. Run frontend
   \`\`\`bash
   npm run dev
   \`\`\`

## 🙋‍♀️ Author
**Arushi** — Intern at UptoSkills
