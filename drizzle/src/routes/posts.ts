import express from "express";
import { postDelete, postInsert } from "../controllers/post";

const app = express.Router();

app.post("/insert", postInsert);

app.delete("/delete/:id", postDelete);

export default app;
