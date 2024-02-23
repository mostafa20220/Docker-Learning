"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.redisClient = void 0;
const redis_1 = require("redis");
const REDIS_PORT = process.env.REDIS_PORT || 6379;
const REDIS_HOST = process.env.REDIS_HOST || "redis";
const url = `redis://${REDIS_HOST}:${REDIS_PORT}`;
exports.redisClient = (0, redis_1.createClient)({ url });
exports.redisClient.connect();
exports.redisClient.on("connect", () => {
    console.log("Redis client connected");
});
exports.redisClient.on("error", (err) => {
    console.log("Something went wrong " + err);
});
