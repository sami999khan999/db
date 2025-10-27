import express from "express";
import { userPreferencesInsert } from "../controllers/preference";

const app = express.Router();

app.post("/insert", userPreferencesInsert);

export default app;
