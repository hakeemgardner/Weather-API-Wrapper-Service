const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const api_key = process.env.API_KEY;
const Redis = require("redis");

// Create Redis client
const redisClient = Redis.createClient();
redisClient.on("error", (err) => console.error("Redis Error:", err));
redisClient.connect(); // ✅ required in Redis v4+

const DEFAULT_EXPIRATION = 3600; // seconds

exports.getAllWeather = async (req, res) => {
  try {
    const location = req.query.location;

    // Use location as cache key
    const cacheKey = `weatherData:${location.toLowerCase()}`;

    // Try to get from Redis cache
    const cachedData = await redisClient.get(cacheKey);
    if (cachedData) {
      console.log("✅ Returning cached weather data");
      return res.status(200).json(JSON.parse(cachedData));
    }

    // If not in cache, fetch from API
    const response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=${api_key}`
    );
    const data = await response.json();

    // Save to Redis cache
    await redisClient.set(cacheKey, JSON.stringify(data), {
      EX: DEFAULT_EXPIRATION,
    });

    console.log("🌤️ Fetched new data and cached it");
    res.status(200).json(data);
  } catch (err) {
    console.error("❌ Error fetching weather data:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};
