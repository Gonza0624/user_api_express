import express from "express";
const app = express();

import cors from "cors";
app.use(cors());

//nos ayuda a analizar el cuerpo de la solicitud POST
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// ruta inicial
app.get("/", (req, res) => {
  res.send("servidor con express");
});

// router para usuarios
import { routerUser } from "./routers/users.mjs";
app.use("/api/users", routerUser);

// Puerto
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`El servidor esta corriendo en el puerto ${PORT}`);
});
