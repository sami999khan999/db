import { redis } from ".";

// Define an asynchronous function to demonstrate Redis set commands
export const setsCommands = async () => {
  // SADD: Adds members "apple", "mango", and "banana" to the set "set:1"
  const sadd = await redis.sadd("set:1", "apple", "mango", "banana"); // Output: Number of elements added

  // SREM: Removes "banana" from the set "set:1"
  const srem = await redis.srem("set:1", "banana"); // Output: 1 if removed, 0 if not present

  // SISMEMBER: Checks if "mango" is a member of "set:1"
  const sismember = await redis.sismember("set:1", "mango"); // Output: 1 if true, 0 if false

  // SMEMBERS: Retrieves all members of "set:1"
  const smembers = await redis.smembers("set:1"); // Output: Array of set members

  // SCARD: Returns the number of elements in "set:1"
  const scard = await redis.scard("set:1"); // Output: Count of members

  // SPOP: Removes and returns a random element from "set:1"
  const spop = await redis.spop("set:1"); // Output: Removed member (random)

  // SRANDMEMBER: Returns 2 random members from "set:1" without removing them
  const srandmember = await redis.srandmember("set:1", 2); // Output: Array of random members

  // SUNION: Returns the union of "set:1" and "set:2"
  const sunion = await redis.sunion("set:1", "set:2"); // Output: Array of unique members from both sets

  // SINTER: Returns the intersection of "set:1" and "set:2"
  const sinter = await redis.sinter("set:1", "set:2"); // Output: Array of common members

  // SDIFF: Returns the difference between "set:1" and "set:2"
  const sdiff = await redis.sdiff("set:1", "set:2"); // Output: Members in "set:1" not in "set:2"

  // Logging the results of each operation with descriptive messages
  console.log("SADD - Add 'apple', 'mango', 'banana' to 'set:1':", sadd); // Should be number of items added
  console.log("SREM - Remove 'banana' from 'set:1':", srem); // Should be 1 if removed successfully
  console.log("SISMEMBER - Check if 'mango' exists in 'set:1':", sismember); // Should be 1 (true) or 0 (false)
  console.log("SMEMBERS - List all members of 'set:1':", smembers); // Should be an array of current members
  console.log("SCARD - Count members in 'set:1':", scard); // Should be the number of elements in the set
  console.log("SPOP - Remove and return a random member from 'set:1':", spop); // Should be a random member
  console.log("SRANDMEMBER - Get 2 random members from 'set:1':", srandmember); // Should be array of 2 random members
  console.log("SUNION - Union of 'set:1' and 'set:2':", sunion); // Should be array of all unique members
  console.log("SINTER - Intersection of 'set:1' and 'set:2':", sinter); // Should be array of common members
  console.log("SDIFF - Difference between 'set:1' and 'set:2':", sdiff); // Should be array of members only in 'set:1'
};
