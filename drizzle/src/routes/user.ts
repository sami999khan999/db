import express from "express";
import { newUser } from "../controllers/user";

const app = express.Router();

app.post("/create", newUser);

export default app;
