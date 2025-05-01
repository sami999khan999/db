import { redis } from ".";

// Define an asynchronous function to demonstrate Redis geospatial commands
export const geospatialCommands = async () => {
  // GEOADD: Adds geographical coordinates for "New York" and "Chicago" to the "cities" set
  const geoadd = await redis.geoadd(
    "cities",
    -74.006, // Longitude of New York
    40.7128, // Latitude of New York
    "New York",
    -87.6298, // Longitude of Chicago
    41.8781, // Latitude of Chicago
    "Chicago"
  ); // Output: Number of elements added

  // GEOPOS: Retrieves the positions (latitude and longitude) of "New York" and "Chicago"
  const geopos = await redis.geopos("cities", "New York", "Chicago"); // Output: List of positions

  // GEODIST: Calculates the distance between "New York" and "Chicago" in miles ("MI")
  const geodist = await redis.geodist("cities", "New York", "Chicago", "MI"); // Output: Distance in miles

  // GEOSEARCH: Searches for cities within a 1200-mile radius of the coordinates (-90, 40)
  const geosearch = await redis.geosearch(
    "cities",
    "FROMLONLAT", // Search by longitude and latitude
    -90, // Longitude
    40, // Latitude
    "BYRADIUS", // Search by radius
    "1200", // Radius in miles
    "MI", // Unit (miles)
    "WITHDIST" // Include distance
  ); // Output: Cities found within the radius

  // GEOSEARCHSTORE: Stores cities within a 1200-mile radius of the coordinates (-90, 40) into "nearby"
  const geosearchstore = await redis.geosearchstore(
    "nearby", // New key to store results
    "cities", // Source key
    "FROMLONLAT", // Search by longitude and latitude
    -90, // Longitude
    40, // Latitude
    "BYRADIUS", // Search by radius
    "1200", // Radius in miles
    "MI" // Unit (miles)
  ); // Output: Number of elements added to "nearby"

  // Logging the results of each operation with descriptive messages
  console.log("GEOADD - Add 'New York' and 'Chicago' to 'cities':", geoadd); // Should be number of elements added
  console.log("GEOPOS - Get positions of 'New York' and 'Chicago':", geopos); // Should show coordinates
  console.log(
    "GEODIST - Distance between 'New York' and 'Chicago' (MI):",
    geodist
  ); // Should show the distance in miles
  console.log(
    "GEOSEARCH - Search cities within 1200 miles of coordinates (-90, 40):",
    geosearch
  ); // Should list cities found within the radius
  console.log(
    "GEOSEARCHSTORE - Store cities within 1200 miles into 'nearby':",
    geosearchstore
  ); // Should be number of elements added to "nearby"
};
