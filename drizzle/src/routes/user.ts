import express from "express";
import {
  userInsert,
  userQuery,
  userSelect,
  usersSelect,
} from "../controllers/user";

const app = express.Router();

app.post("/insert", userInsert);

app.get("/query", userQuery);

app.get("/select/:id", userSelect);

app.get("/select", usersSelect);

export default app;
