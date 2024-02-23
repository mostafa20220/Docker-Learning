"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.disconnect = exports.connect = void 0;
const console_1 = require("console");
const mongodb_1 = require("mongodb");
const client = new mongodb_1.MongoClient("mongodb://localhost:27017");
const connect = async () => {
    try {
        await client.connect();
        (0, console_1.log)("Connected to MongoDB");
    }
    catch (e) {
        (0, console_1.log)("Error connecting to MongoDB");
    }
    finally {
        await client.close();
    }
    return client;
};
exports.connect = connect;
const disconnect = async () => {
    await client.close();
};
exports.disconnect = disconnect;
(0, exports.connect)();
