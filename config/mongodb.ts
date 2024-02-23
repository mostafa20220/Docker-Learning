import { log } from "console";
import { MongoClient } from "mongodb";

const user = "root";
const password = "example";
const host = "mongo";
// const host = "172.18.0.2";

const port = "27017"; // default port for MongoDB is 27017

const uri = `mongodb://${user}:${password}@${host}:${port}`;

const client = new MongoClient(uri);

export const connectMongo = async () => {
  try {
    await client.connect();
    log("Connected to MongoDB");
  } catch (e) {
    log("Error connecting to MongoDB\n", e);
  } finally {
    await client.close();
  }
  return client;
};

export const disconnect = async () => {
  await client.close();
};
