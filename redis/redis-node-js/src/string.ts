import { redis } from ".";

// Define an asynchronous function to interact with Redis
export const getUser = async () => {
  // Set a string value for "user:1" using the default redis set method
  // Stores the key "user:1" with the value "sami" in Redis
  const setString1 = await redis.set("user:1", "sami");

  // Set a string value for "user:2" using the redis.call method (alternative way to interact with Redis)
  // Stores the key "user:2" with the value "khan" in Redis
  const setString2 = await redis.call("set", "user:2", "khan");

  // Get the value stored at "user:1"
  // Retrieves the value associated with the key "user:1", which will be "sami"
  const getString1 = await redis.get("user:1");

  // Get the value stored at "user:2"
  // Retrieves the value associated with the key "user:2", which will be "khan"
  const getString2 = await redis.call("get", "user:2");

  // Set an expiration time of 10 seconds for the key "user:1"
  // After 10 seconds, "user:1" will automatically expire and be deleted from Redis
  await redis.expire("user:1", 10);

  // Log the result of setting the values for "user:1" and "user:2"
  console.log(setString1);
  console.log(setString2);

  // Log the retrieved values for "user:1" and "user:2"
  console.log(getString1);
  console.log(getString2);
};
