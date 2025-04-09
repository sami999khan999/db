import { Redis } from "ioredis";
import { getUser } from "./string";

// Create a new Redis client instance
// Connects to Redis running on localhost at port 6379
export const redis = new Redis({
  host: "localhost",
  port: 6379,
  // db: 1, // Optional: uncomment to select a specific Redis database
});

/* export const redis = new Redis(
  "rediss://default:AT8GAAIjcDFlYWNiMjFlMDhlY2I0ZWJiYjllNmFmMDk0YzE2OWExY3AxMA@sunny-seahorse-16134.upstash.io:6379"
);*/

// Event listener for successful connection to Redis
redis.on("connect", () => {
  console.log("Connected to Redis");
});

// Event listener for any Redis client errors
redis.on("error", (err) => {
  console.log(err);
});

// Call the getUser function which performs Redis operations
getUser();
