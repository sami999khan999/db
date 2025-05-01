import { redis } from ".";

export const jsonCommands = async () => {
  // JSON.SET: Sets the JSON value for key "user:1"
  const set = await redis.call(
    "json.set",
    "user:1",
    "$",
    JSON.stringify({ name: "John", age: 30 })
  ); // Output: "OK" if successful

  // JSON.GET: Retrieves the "name" field from the JSON at key "user:1"
  const get = await redis.call("json.get", "user:1", "$.name"); // Output: "John"

  // JSON.DEL: Deletes the "name" field from the JSON at key "user:1"
  const del = await redis.call("json.del", "user:1", "$.name"); // Output: 1 if deleted

  // JSON.MGET: Retrieves the "age" field from "user:1" and "user:2"
  const mget = await redis.call("json.mget", "user:1", "user:2", "$.age"); // Output: Array of ages

  // JSON.NUMINCRBY: Increments the "age" field by 10 for "user:1"
  const numincreby = await redis.call("json.numincrby", "user:1", "$.age", 10); // Output: New incremented age

  // Logging the results of each operation with descriptive messages
  console.log("JSON.SET - Set 'user:1' with name and age:", set); // Should be "OK"
  console.log("JSON.GET - Get 'name' from 'user:1':", get); // Should be "John"
  console.log("JSON.DEL - Delete 'name' from 'user:1':", del); // Should be 1
  console.log("JSON.MGET - Get 'age' from 'user:1' and 'user:2':", mget); // Should list ages
  console.log(
    "JSON.NUMINCRBY - Increment 'age' by 10 in 'user:1':",
    numincreby
  ); // Should show updated age
};
