const app = require("./app");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

const redis = require("redis");

const client = redis.createClient();

client.on("error", (err) => {
  console.error("Redis error:", err);
});

client.on("connect", () => {
  console.log("✅ Redis connection established");
});

(async () => {
  try {
    await client.connect(); // ✅ Required in Redis v4+
  } catch (err) {
    console.error("❌ Redis connection failed:", err);
  }

  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`🚀 Server running on port ${port}`);
  });
})();
