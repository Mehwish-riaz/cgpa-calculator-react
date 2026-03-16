import React, { useState } from "react";
import './index.css';


export default function App() {
  const [courses, setCourses] = useState([
    { name: "", credit: "", grade: "", semester: "1" }
  ]);
  const [result, setResult] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  const gradePoints = {
    "A+": 4.0,
    A: 3.7,
    "B+": 3.3,
    B: 3.0,
    "C+": 2.7,
    C: 2.3,
    D: 2.0,
    F: 0.0
  };

  const addCourse = () => {
    setCourses([
      ...courses,
      { name: "", credit: "", grade: "", semester: "1" }
    ]);
  };

  const removeCourse = (index) => {
    const newCourses = courses.filter((_, i) => i !== index);
    setCourses(newCourses);
  };

  const calculateCGPA = () => {
    let totalCredits = 0;
    let totalPoints = 0;

    for (let course of courses) {
      const { name, credit, grade } = course;
      if (!name || !credit || !grade) {
        alert("Please fill all fields!");
        return;
      }
      const creditNum = parseFloat(credit);
      if (isNaN(creditNum) || creditNum <= 0) {
        alert("Credit hours must be positive numbers!");
        return;
      }
      if (!gradePoints[grade]) {
        alert(`Invalid grade entered: ${grade}`);
        return;
      }
      totalCredits += creditNum;
      totalPoints += creditNum * gradePoints[grade];
    }

    const cgpa = totalPoints / totalCredits;
    setResult({ totalCredits, totalPoints, cgpa: cgpa.toFixed(2) });
  };

  const resetForm = () => {
    setCourses([{ name: "", credit: "", grade: "", semester: "1" }]);
    setResult(null);
  };

  const printResult = () => {
    if (!result) {
      alert("Please calculate CGPA first!");
      return;
    }
    const printContent = `CGPA Result
Total Credit Hours: ${result.totalCredits}
Total Grade Points: ${result.totalPoints}
Final CGPA: ${result.cgpa}`;
    const newWindow = window.open();
    newWindow.document.write(`<pre>${printContent}</pre>`);
    newWindow.print();
  };

  return (
    <div className={`App ${darkMode ? "dark-mode" : ""}`}>
      <div className="calculator-container">
        <header>
          <h1>CGPA Calculator</h1>
          <button
            className="dark-toggle"
            onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode ? "🌙" : "☀️"}
          </button>
        </header>

        <table>
          <thead>
            <tr>
              <th>Semester</th>
              <th>Course Name</th>
              <th>Credit Hours</th>
              <th>Grade</th>
            </tr>
          </thead>

          <tbody>
            {courses.map((course, index) => (
              <tr key={index}>
                <td>
                  <select
                    value={course.semester}
                    onChange={(e) => {
                      const updated = [...courses];
                      updated[index].semester = e.target.value;
                      setCourses(updated);
                    }}
                  >
                    {[...Array(8)].map((_, i) => (
                      <option key={i + 1} value={i + 1}>
                        {i + 1}
                      </option>
                    ))}
                  </select>
                </td>

                <td>
                  <input
                    type="text"
                    value={course.name}
                    placeholder="Course Name"
                    onChange={(e) => {
                      const updated = [...courses];
                      updated[index].name = e.target.value;
                      setCourses(updated);
                    }}
                  />
                </td>

                <td>
                  <input
                    type="number"
                    value={course.credit}
                    placeholder="Credit Hours"
                    onChange={(e) => {
                      const updated = [...courses];
                      updated[index].credit = e.target.value;
                      setCourses(updated);
                    }}
                  />
                </td>

                <td>
                  <input
                    type="text"
                    value={course.grade}
                    placeholder="Grade (A, B+, etc.)"
                    onChange={(e) => {
                      const updated = [...courses];
                      updated[index].grade = e.target.value.toUpperCase();
                      setCourses(updated);
                    }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="buttons">
          <button onClick={addCourse}>Add Course</button>
          <button
            onClick={() =>
              courses.length > 1 && removeCourse(courses.length - 1)
            }
          >
            Remove Course
          </button>
          <button onClick={calculateCGPA}>Calculate CGPA</button>
          <button onClick={resetForm}>Reset</button>
          <button onClick={printResult}>Export / Print</button>
        </div>

        {result && (
          <div className="result">
            <h2>Result</h2>
            <p>
              Total Credit Hours: <strong>{result.totalCredits}</strong>
            </p>
            <p>
              Total Grade Points: <strong>{result.totalPoints}</strong>
            </p>
            <p>
              Final CGPA: <strong>{result.cgpa}</strong>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
