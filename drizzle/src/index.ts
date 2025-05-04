import express from "express";
import userRouter from "./routes/user";
import errorMiddleware from "./utils/errorMiddleware";

const app = express();
const PORT = 8000;

app.use(express.json());

app.use("/api/user", userRouter);

app.use(errorMiddleware);

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
