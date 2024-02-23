"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.disconnect = exports.connectMongo = void 0;
const console_1 = require("console");
const mongodb_1 = require("mongodb");
const user = "root";
const password = "example";
const host = "mongo";
// const host = "172.18.0.2";
const port = "27017"; // default port for MongoDB is 27017
const uri = `mongodb://${user}:${password}@${host}:${port}`;
const client = new mongodb_1.MongoClient(uri);
const connectMongo = async () => {
    try {
        await client.connect();
        (0, console_1.log)("Connected to MongoDB");
    }
    catch (e) {
        (0, console_1.log)("Error connecting to MongoDB\n", e);
    }
    finally {
        await client.close();
    }
    return client;
};
exports.connectMongo = connectMongo;
const disconnect = async () => {
    await client.close();
};
exports.disconnect = disconnect;
