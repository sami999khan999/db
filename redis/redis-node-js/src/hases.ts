import { redis } from ".";

export const hashesCommands = async () => {
  // Set multiple fields in a hash
  const hset = await redis.hset("profile:1", {
    name: "sami",
    age: 22,
    email: "sami@gmail.com",
  }); // Output: "OK"

  // Get the value of a single field from the hash
  const hget = await redis.hget("profile:1", "name"); // Output: "sami"

  // Get all fields and values from the hash
  const hgetall = await redis.hgetall("profile:1"); // Output: { name: "sami", age: 22, email: "sami@gmail.com" }

  // Delete a specific field from the hash
  const hdel = await redis.hdel("profile:1", "name"); // Output: 1 (field deleted)

  // Check if a specific field exists in the hash
  const hexists = await redis.hexists("profile:1", "age"); // Output: 1 (field exists)

  // Get all field names (keys) in the hash
  const hkeys = await redis.hkeys("profile:1"); // Output: ["age", "email"]

  // Get all field values in the hash
  const hvals = await redis.hvals("profile:1"); // Output: ["22", "sami@gmail.com"]

  // Get the number of fields in the hash
  const hlen = await redis.hlen("profile:1"); // Output: 2 (after deletion of 'name')

  // Increment an integer field by 10
  const hincrby = await redis.hincrby("profile:1", "age", 10); // Output: 32 (age becomes 32)

  // Decrement the same field by 10 (using negative increment)
  const hincrby2 = await redis.hincrby("profile:1", "age", -10); // Output: 22 (age goes back to 22)

  // Increment a numeric field by 10.5 (float)
  const hincrbyfloat = await redis.hincrbyfloat("profile:1", "age", 10.5); // Output: 32.5 (age becomes 32.5)

  // Decrement a numeric field by 10.5 (float)
  const hincrbyfloat2 = await redis.hincrbyfloat("profile:1", "age", -10.5); // Output: 22 (age goes back to 22)

  // Logging the results of each operation with descriptive messages
  console.log("HSET - Set multiple fields in the hash:", hset); // Should be "OK"
  console.log("HGET - Get the 'name' field from the hash:", hget); // Should be "sami"
  console.log("HGETALL - Get all fields and values from the hash:", hgetall); // Should be { name: "sami", age: 22, email: "sami@gmail.com" }
  console.log("HDEL - Delete the 'name' field from the hash:", hdel); // Should be 1 (field deleted)
  console.log("HEXISTS - Check if 'age' field exists in the hash:", hexists); // Should be 1 (field exists)
  console.log("HKEYS - Get all field names (keys) in the hash:", hkeys); // Should be ["age", "email"]
  console.log("HVALS - Get all field values in the hash:", hvals); // Should be ["22", "sami@gmail.com"]
  console.log("HLEN - Get the number of fields in the hash:", hlen); // Should be 2 (after deletion of 'name')
  console.log("HINCRBY - Increment 'age' by 10:", hincrby); // Should be 32 (age becomes 32)
  console.log("HINCRBY (decrement) - Decrement 'age' by 10:", hincrby2); // Should be 22 (age goes back to 22)
  console.log("HINCRBYFLOAT - Increment 'age' by 10.5 (float):", hincrbyfloat); // Should be 32.5 (age becomes 32.5)
  console.log(
    "HINCRBYFLOAT (decrement) - Decrement 'age' by 10.5 (float):",
    hincrbyfloat2
  ); // Should be 22 (age goes back to 22)
};
