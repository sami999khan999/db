import express, { Request, Response, NextFunction } from "express";
import { Redis } from "ioredis";

const app = express();
const port = 3001;

// Initialize Redis client
const redis = new Redis({
  host: "localhost",
  port: 6379,
});

app.use(express.json());

// Helper to wrap async route handlers and forward errors
const asyncHandler = (
  fn: (req: Request, res: Response, next: NextFunction) => Promise<void>
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

// Health check route
app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

// Comments route with Redis caching and error handling
app.get(
  "/comments",
  asyncHandler(async (req: Request, res: Response) => {
    // Try to read from cache
    const cached = await redis.get("comments");
    if (cached) {
      res.status(200).json(JSON.parse(cached));
      return;
    }

    // Fetch fresh data
    const response = await fetch("https://jsonplaceholder.typicode.com/todos");
    if (!response.ok) {
      res.status(response.status).json({
        error: `Failed to fetch comments: ${response.status} ${response.statusText}`,
      });
      return;
    }

    const data = await response.json();

    // Cache the data with expiration (30 seconds)
    await redis.set("comments", JSON.stringify(data), "EX", 30);

    res.status(200).json(data);
  })
);

// Global error handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ error: "Internal Server Error" });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
