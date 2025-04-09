const express = require("express");
const app = express();
const mysql = require("mysql2");
const cors = require("cors"); // cost origin resource sharing


app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "mysql", // use service in docker-compose
  // host: "localhost", // use localhost if not using docker
  user: "user",
  password: "password",
  database: "employee_db",
});

app.get("/", (req, res) => {
  res.send("Hello from the server");
});

app.get("/employees", (req, res) => {
  db.query("SELECT * FROM employees", (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error retrieving employeess");
    } else {
      res.send(result);
    }
  });
});

app.post("/create", (req, res) => {
  const name = req.body.name;
  const age = req.body.age;
  const country = req.body.country;
  const position = req.body.position;
  const wage = req.body.wage;

  db.query(
    "INSERT INTO employees (name, age, country, position, wage) VALUES (?,?,?,?,?)",
    [name, age, country, position, wage],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Value inserted");
      }
    }
  );
});

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
