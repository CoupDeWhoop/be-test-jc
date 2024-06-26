const express = require("express");
const {
  postStudent,
  getStudents,
  getStudentById,
  patchStudent,
  deleteStudent,
} = require("./controllers/students.controller.js");

const app = express();

app.use(express.json());

app.post("/api/students", postStudent);
app.get("/api/students", getStudents);
app.get("/api/students/:id", getStudentById);
app.patch("/api/students/:id", patchStudent);
app.delete("/api/students/:id", deleteStudent);

app.all("/*", (req, res, next) => {
  res.status(404).send({ msg: "Path not found." });
});

app.use((err, req, res, next) => {
  if (
    err.code === "22P02" ||
    err.code === "23502" ||
    err.code === "22007" ||
    err.code === "42703"
  ) {
    res.status(400).send({ error: "Invalid request" });
  }
  if (err.code === "23505") {
    res.status(409).send({ error: "Email already exists." });
  }
  if (err.status) {
    res.status(err.status).send(err);
  }
  res.status(500).send({ error: "Internal Server Error" });
});

module.exports = app;
