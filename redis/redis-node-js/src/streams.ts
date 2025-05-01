import { redis } from ".";

// Define an asynchronous function to demonstrate Redis stream commands
export const streamsCommands = async () => {
  // XADD: Adds an entry to the stream "stream:1" with fields "name" and "action"
  const xadd = await redis.xadd(
    "stream:1",
    "*",
    "name",
    "sami",
    "action",
    "login"
  ); // Output: ID of the added entry

  // XRANGE: Reads all entries in the stream from beginning ("-") to end ("+")
  const xrange = await redis.xrange("stream:1", "-", "+"); // Output: List of entries in order

  // XREAD: Reads new entries from the stream starting from ID 0
  const xread = await redis.xread("STREAMS", "stream:1", 0); // Output: Stream entries

  // XGROUP CREATE: Creates a consumer group named "group1" for stream "stream:1"
  const xgroup = await redis.xgroup("CREATE", "stream:1", "group1", 0); // Output: "OK" or error if group exists

  // XREADGROUP: Reads entries from "stream:1" using the consumer group "group1" and consumer "consumer1"
  const xreadgroup = await redis.xreadgroup(
    "GROUP",
    "group1",
    "consumer1",
    "STREAMS",
    "stream:1",
    ">"
  ); // Output: Entries delivered to the consumer

  // Logging the results of each operation with descriptive messages
  console.log("XADD - Add entry to 'stream:1':", xadd); // Should return new entry ID
  console.log("XRANGE - Read all entries in 'stream:1':", xrange); // Should list all entries
  console.log("XREAD - Read entries from 'stream:1' starting at ID 0:", xread); // Should show stream entries
  console.log(
    "XGROUP - Create consumer group 'group1' for 'stream:1':",
    xgroup
  ); // Should be "OK"
  console.log(
    "XREADGROUP - Read using group 'group1' and consumer 'consumer1':",
    xreadgroup
  ); // Should return entries delivered to consumer
};
