const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

const port = 3030;
app.listen(port, () => {
  console.log(`The server is running on port ${port}`);
});
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "password",
  database: "crudSvelte",
});

// employees

// POST /employees
app.post("/create", (req, res) => {
  const name = req.body.name;
  const status = req.body.status;
  db.query(
    "INSERT INTO todos ( name, status) VALUES (?, ?)",
    [name, status],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values inserted");
      }
    }
  );
});

// GET /employees
app.get("/todos", (req, res) => {
  db.query("SELECT * FROM crudSvelte.todos", (err, result) => {
    if (err) {
      res.status(500).send();
    } else {
      res.send(result);
    }
  });
});

// DELETE /employees/:id
app.delete("/delete/:id", (req, res) => {
  const { id } = req.params;
  let sql = `DELETE FROM todos WHERE id = ${id}`;

  db.query(sql, (err, results) => {
    if (err) {
      res.status(500).send();
    }
    res.status(204).send();
  });
});

// PUT /employees/:id
app.put("/todos/:id", (req, res) => {
  const { params, body } = req;
  const sqlQuery = `UPDATE todos SET status='${body.status}' WHERE id=${params.id}`;
  console.log(body.status);
  db.query(sqlQuery, (err, results) => {
    if (err) {
      console.log(err);
    }

    res.json({ status: "ok" });
  });
});
