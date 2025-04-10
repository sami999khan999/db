import { redis } from ".";

// Define an asynchronous function to demonstrate Redis string commands
export const stringCommands = async () => {
  // SET: Stores the key "user:1" with the value "sami"
  const set = await redis.set("user:1", "sami"); // Output: "OK"

  // CALL SET: Alternative method to store the key "user:2" with value "khan"
  const call_set = await redis.call("set", "user:2", "khan"); // Output: "OK"

  // GET: Retrieves the value of "user:1" (should be "sami")
  const get = await redis.get("user:1"); // Output: "sami"

  // CALL GET: Retrieves the value of "user:2" using redis.call (should be "khan")
  const call_get = await redis.call("get", "user:2"); // Output: "khan"

  // EXPIRE: Sets an expiration of 10 seconds for "user:1"
  const expire = await redis.expire("user:1", 10); // Output: 1 (success)

  // Logging the results of each operation with descriptive messages
  console.log("SET - Store 'user:1' with value 'sami':", set); // Should be "OK"
  console.log(
    "CALL SET - Alternative method to store 'user:2' with value 'khan':",
    call_set
  ); // Should be "OK"
  console.log("GET - Retrieve the value of 'user:1':", get); // Should be "sami"
  console.log(
    "CALL GET - Retrieve the value of 'user:2' using redis.call:",
    call_get
  ); // Should be "khan"
  console.log("EXPIRE - Set expiration for 'user:1' to 10 seconds:", expire); // Should return 1 (success)
};
