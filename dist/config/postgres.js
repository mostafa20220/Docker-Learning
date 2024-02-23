"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.disconnect = exports.connectPostgres = exports.client = void 0;
const pg_1 = require("pg");
const host = "postgres";
const port = "5432";
const user = "postgres";
const password = "example";
const uri = `postgresql://${user}:${password}@${host}:${port}`;
exports.client = new pg_1.Client({ connectionString: uri });
const connectPostgres = async () => {
    try {
        await exports.client.connect();
        console.log("Connected to PostgreSQL");
        // create products table if not exists
        const query = `CREATE TABLE IF NOT EXISTS products (id SERIAL PRIMARY KEY, name VARCHAR(255), price FLOAT )`;
        await exports.client.query(query);
    }
    catch (e) {
        console.log("Error connecting to PostgreSQL\n", e);
        // } finally {
        // await client.end();
        // }
    }
    return exports.client;
};
exports.connectPostgres = connectPostgres;
const disconnect = async () => {
    await exports.client.end();
};
exports.disconnect = disconnect;
