import express from "express";
import { userInsert, userQuery } from "../controllers/user";

const app = express.Router();

app.post("/insert", userInsert);

app.get("/query", userQuery);

export default app;
