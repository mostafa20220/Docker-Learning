import { createClient } from "redis";

const REDIS_PORT = process.env.REDIS_PORT || 6379;
const REDIS_HOST = process.env.REDIS_HOST || "redis";

const url = `redis://${REDIS_HOST}:${REDIS_PORT}`;


export const redisClient = createClient({ url });

redisClient.connect();

redisClient.on("connect", () => {
  console.log("Redis client connected");
});

redisClient.on("error", (err) => {
  console.log("Something went wrong " + err);
});

