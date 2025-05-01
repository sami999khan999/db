import { redis } from ".";

//note - subscriber and publisher must be in diffent

// Define an asynchronous function to demonstrate Redis Pub/Sub commands
export const pubsubCommands = async () => {
  // SUBSCRIBE: Subscribes to the "news" channel to receive published messages
  const subscribe = await redis.subscribe("news"); // Output: Number of channels subscribed to

  // PUBLISH: Publishes the message "Hello world!" to the "news" channel
  /* const publish = await redis.publish("news", "Hello world!"); */ // Output: Number of subscribers the message was delivered to

  // UNSUBSCRIBE: Unsubscribes from the "news" channel
  /* const unsubscribe = await redis.unsubscribe("news"); */ // Output: Number of channels remaining subscribed to

  redis.on("message", (channel, message) => {
    console.log(`Received message from ${channel}: ${message}`);
  });

  // Logging the results of each operation with descriptive messages
  console.log("SUBSCRIBE - Subscribe to 'news' channel:", subscribe); // Should be 1 if successful
  console.log("PUBLISH - Send 'Hello world!' to 'news' channel:" /* publish */); // Should show number of subscribers the message was delivered to
  console.log(
    "UNSUBSCRIBE - Unsubscribe from 'news' channel:" /* unsubscribe */
  ); // Should be 0 if fully unsubscribed
};
