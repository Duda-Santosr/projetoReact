const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "crudgame",
});

app.use(express.json());
app.use(cors());

// enviar as requisições
app.post("/register", (req, res) => {
  const { name, cost, category } = req.body;

  let sql = "INSERT INTO games (name, cost, category) VALUES (?, ?, ?)";
  db.query(sql, [name, cost, category], (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send({ id: result.insertId, name, cost, category });
    }
  });
});

app.post("/search", (req, res) => {
  const { name, cost, category } = req.body;

  let sql = "SELECT * FROM games WHERE name = ? AND cost = ? AND category = ?";
  db.query(sql, [name, cost, category], (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send(result);
    }
  });
});

// fazer requisição de valores, (puxar valores)
app.get("/getCards", (req, res) => {
  let sql = "SELECT * FROM games";
  db.query(sql, (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send(result);
    }
  });
});

// editar os arquivos
app.put("/edit", (req, res) => {
  const { id, name, cost, category } = req.body;
  let sql = "UPDATE games SET name = ?, cost = ?, category = ? WHERE id = ?";
  db.query(sql, [name, cost, category, id], (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send(result);
    }
  });
});

// deletar os arquivos
app.delete("/delete/:id", (req, res) => {
  const { id } = req.params;
  let sql = "DELETE FROM games WHERE id = ?";
  db.query(sql, id, (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send(result);
    }
  });
});

app.listen(3001, () => {
  console.log("rodando na porta 3001");
});



