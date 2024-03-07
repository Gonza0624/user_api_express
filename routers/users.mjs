import express from "express";
import mysql from "mysql";

// router
export const routerUser = express.Router();

// credenciales de la bd
const credentials = {
  host: "mysqldb",
  user: "root",
  password: "gonza123",
  database: "gonzalodb",
  port: 3306,
};

// conexion a la base de datos
let connection = mysql.createConnection(credentials);

// mostrar todos los usuarios
routerUser.get("/", (req, res) => {
  connection.query("SELECT * FROM users", (error, result) => {
    if (error) {
      res.status(500).send(error);
    } else {
      res.status(200).send(result);
    }
  });
});

// crear usuarios
routerUser.post("/", (request, response) => {
  const { first_name, email, password } = request.body;
  connection.query(
    "INSERT INTO users(first_name, email, password) VALUES (?, ?, ?) ",
    [first_name, email, password],
    (error, results) => {
      if (error) throw error;
      response
        .status(201)
        .json({ "Item añadido correctamente": results.affectedRows });
    }
  );
});

// mostrar usuario individualmente
routerUser.get("/:id", (request, response) => {
  const id = request.params.id;
  connection.query("SELECT * FROM users WHERE id = ?", id, (error, result) => {
    if (error) throw error;
    response.send(result);
  });
});

// actualizar usuario por id
routerUser.put("/:id", (request, response) => {
  const id = request.params.id;
  const { first_name, email, password } = request.body;
  connection.query(
    "UPDATE users SET first_name = ?, email = ?, password = ? WHERE id = ?",
    [first_name, email, password, id],
    (error, result) => {
      if (error) throw error;
      response.send(`Usuario con ID ${id} actualizado exitosamente`);
    }
  );
});

// eliminar usuarios
routerUser.delete("/:id", (request, response) => {
  const id = request.params.id;
  connection.query("Delete from users where id = ?", [id], (error, results) => {
    if (error) throw error;
    response.status(201).json({ "Item eliminado": results.affectedRows });
  });
});
