import { redis } from ".";

// Define an asynchronous function to demonstrate Redis sorted set commands
export const sortedsetsCommands = async () => {
  // ZADD: Adds members with scores to the sorted set "sortedset:1"
  const zadd = await redis.zadd(
    "sortedset:1",
    1,
    "apple",
    2,
    "banana",
    3,
    "cherry"
  ); // Output: Number of elements added

  // ZREM: Removes the member "banana" from the sorted set
  const zrem = await redis.zrem("sortedset:1", "banana"); // Output: 1 if removed

  // ZRANGE: Retrieves all elements from "sortedset:1" in ascending score order
  const zrange = await redis.zrange("sortedset:1", 0, -1); // Output: Array of members

  // ZREVRANGE: Retrieves all elements from "sortedset:1" in descending score order
  const zrevrange = await redis.zrevrange("sortedset:1", 0, -1); // Output: Array of members

  // ZSCORE: Gets the score of the member "apple" in "sortedset:1"
  const zscore = await redis.zscore("sortedset:1", "apple"); // Output: Score value

  // ZRANGEBYSCORE: Retrieves members with scores between 1 and 2 (inclusive) in ascending order
  const zrengebyscore = await redis.zrangebyscore("sortedset:1", 1, 2); // Output: Matching members

  // ZREVRANGEBYSCORE: Retrieves members with scores between 1 and 2 (inclusive) in descending order
  const zrevrangebyscore = await redis.zrevrangebyscore("sortedset:1", 1, 2); // Output: Matching members

  // Logging the results of each operation with descriptive messages
  console.log(
    "ZADD - Add 'apple'(1), 'banana'(2), 'cherry'(3) to 'sortedset:1':",
    zadd
  ); // Should be number of items added
  console.log("ZREM - Remove 'banana' from 'sortedset:1':", zrem); // Should be 1 if removed successfully
  console.log("ZRANGE - Get all members in ascending score order:", zrange); // Should list all members from low to high score
  console.log(
    "ZREVRANGE - Get all members in descending score order:",
    zrevrange
  ); // Should list all members from high to low score
  console.log("ZSCORE - Get score of 'apple' in 'sortedset:1':", zscore); // Should be 1
  console.log(
    "ZRANGEBYSCORE - Get members with scores between 1 and 2 (asc):",
    zrengebyscore
  ); // Should include members with scores in range 1 to 2
  console.log(
    "ZREVRANGEBYSCORE - Get members with scores between 1 and 2 (desc):",
    zrevrangebyscore
  ); // Should include members with scores in range 1 to 2 in reverse
};
