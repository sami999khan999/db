import express, { Request, Response } from "express";
import { UserTable } from "./drizzle/schema";
import { db } from "./drizzle/db";
import userRouter from "./routes/user";

const app = express();
const PORT = 8000;

app.use(express.json());

app.use("/user", userRouter);

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
