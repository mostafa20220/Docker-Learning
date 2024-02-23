import { Client } from "pg";

const host = "postgres";
const port = "5432";
const user = "postgres";
const password = "example";

const uri = `postgresql://${user}:${password}@${host}:${port}`;

export const client = new Client({ connectionString: uri });

export const connectPostgres = async () => {
  try {
    await client.connect();
    console.log("Connected to PostgreSQL");
    // create products table if not exists
    const query = `CREATE TABLE IF NOT EXISTS products (id SERIAL PRIMARY KEY, name VARCHAR(255), price FLOAT )`;
    await client.query(query); 

  } catch (e) {
    console.log("Error connecting to PostgreSQL\n", e);
    // } finally {
    // await client.end();
    // }
  }
  return client;
};

export const disconnect = async () => {
  await client.end();
};
