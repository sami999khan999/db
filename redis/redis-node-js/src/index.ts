import { Redis } from "ioredis";
import { stringCommands } from "./string";
import { listCommands } from "./lists";
import { hashesCommands } from "./hases";
import { setsCommands } from "./sets";
import { streamsCommands } from "./streams";
import { geospatialCommands } from "./geospatial";
import { pubsubCommands } from "./pubsub";
import { jsonCommands } from "./json";

// Create a new Redis client instance
// Connects to Redis running on localhost at port 6379
export const redis = new Redis({
  host: "localhost", // Redis host (localhost in this case)
  port: 6379, // Redis port (default 6379)
  // db: 1, // Optional: Uncomment to select a specific Redis database (default is db 0)
});

/* 
// Uncomment below if connecting to a remote Redis instance (Upstash in this case)
export const redis = new Redis(
  "rediss://default:AT8GAAIjcDFlYWNiMjFlMDhlY2I0ZWJiYjllNmFmMDk0YzE2OWExY3AxMA@sunny-seahorse-16134.upstash.io:6379"
); 
*/

// Event listener for successful connection to Redis
redis.on("connect", () => {
  console.log("Connected to Redis"); // Logs when Redis connection is successfully established
});

// Event listener for any Redis client errors
redis.on("error", (err) => {
  console.log(err); // Logs any error that occurs during Redis operations
});

// Call the stringCommands function to perform Redis operations on strings
// stringCommands();

// Call the listCommands function to perform Redis operations on lists
// listCommands();

// Call the hashesCommands function to perform Redis operations on hashes
// hashesCommands();

// Call the setsCommands function to perform Redis operations on sets
// setsCommands();

// Call the streamsCommands function to perform Redis operations on streams
// streamsCommands();

// Call the geospatialCommands function to perform Redis operations on geospatial data
// geospatialCommands();

// Call the pubsubCommands function to perform Redis operations on pub/sub
// pubsubCommands();

// Call the jsonCommands function to perform Redis operations on JSON data
jsonCommands(); // This line will invoke the JSON-related Redis commands
