import { redis } from ".";

export const listCommands = async () => {
  // LPUSH: Adds element "Hello" to the left of the list "messages"
  const lpush = await redis.lpush("messages", "Hello"); // Output: 1

  // RPUSH: Adds element "World" to the right of the list "messages"
  const rpush = await redis.rpush("messages", "World"); // Output: 2

  // LPOP: Removes and returns the first element of the list "messages"
  const lpop = await redis.lpop("messages"); // Output: "Hello"

  // RPOP: Removes and returns the last element of the list "messages"
  const rpop = await redis.rpop("messages"); // Output: "World"

  // RPUSH: Adds multiple elements to the right of the list "messages"
  await redis.rpush("messages", "One", "Two", "Three", "Four", "Five"); // Output: Number of elements in list after push

  // LRANGE: Retrieves all elements in the list "messages"
  const lrange = await redis.lrange("messages", 0, -1); // Output: ["One", "Two", "Three", "Four", "Five"]

  // LRANGE: Retrieves elements from index 2 to 4 in the list "messages"
  const lrange2 = await redis.lrange("messages", 2, 4); // Output: ["Three", "Four"]

  // LLEN: Retrieves the length of the list "messages"
  const llen = await redis.llen("messages"); // Output: 5

  // LTRIM: Trims the list "messages" to only elements from index 1 to 3
  const ltrim = await redis.ltrim("messages", 1, 3); // Output: "OK"

  // BLPOP: Removes and returns the first element (blocking up to 30 seconds) from "messages"
  const blpop = await redis.blpop("messages", 30); // Output: ["messages", "Two"]

  // BRPOP: Removes and returns the last element (blocking up to 30 seconds) from "messages"
  const brpop = await redis.brpop("messages", 30); // Output: ["messages", "Four"]

  // Logging the results of each operation with descriptive messages
  console.log("LPUSH - Add 'Hello' to the left of the list:", lpush); // Should be 1
  console.log("RPUSH - Add 'World' to the right of the list:", rpush); // Should be 2
  console.log("LPOP - Remove and return the first element of the list:", lpop); // Should be "Hello"
  console.log("RPOP - Remove and return the last element of the list:", rpop); // Should be "World"
  console.log("LRANGE (all) - Get all items in the list:", lrange); // Should be ["One", "Two", "Three", "Four", "Five"]
  console.log(
    "LRANGE (2-4) - Get items from index 2 to 4 in the list:",
    lrange2
  ); // Should be ["Three", "Four"]
  console.log("LLEN - Get the length of the list:", llen); // Should be 5
  console.log("LTRIM - Trim the list to keep items from index 1 to 3:", ltrim); // Should be "OK"
  console.log("BLPOP - Blocking pop (left):", blpop); // Should be ["messages", "Two"]
  console.log("BRPOP - Blocking pop (right):", brpop); // Should be ["messages", "Four"]
};
