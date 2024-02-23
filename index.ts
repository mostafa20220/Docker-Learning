import express, { Request, Response } from "express";
import { createServer } from "http";
import cors from "cors";
import { connectPostgres, client } from "./config/postgres";
import { connectMongo } from "./config/mongodb";
import { redisClient } from "./config/redis";
import morgan from "morgan";
import { log } from "console";

connectPostgres();
connectMongo();

const app = express();
const httpServer = createServer(app);

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.get("/", (req: Request, res: Response) => {
  res.send("Hello MOM with redis, postgresDB, mongoDB, mongo-express!");
});

let count = 0;

app.get("/add-product", async (req: Request, res: Response) => {
  const { name, price } = req.query;
  const product = { name, price };
  await redisClient.set("product", JSON.stringify(product));
  res.send(product);
});

app.get("/products", (req: Request, res: Response) => {
  redisClient
    .get("product")
    .then((product) => {
      console.log("product", product);
      res.send(product);
    })
    .catch((err) => {
      log("err", err);
      res.send(err);
    });
});

// add product to postgres
app.post("/add-product-postgres", async (req: Request, res: Response) => {
  const { name, price } = req.body;
  const query = `INSERT INTO products (name, price) VALUES ('${name}', ${price})`;
  try {
    const result = await client.query(query);
    res.send(result);
  } catch (err) {
    log("err", err);
    res.send(err);
  }
});

// get products from postgres
app.get("/products-postgres", async (req: Request, res: Response) => {
  client
    .query("SELECT * FROM products")
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      log("err", err);
      res.send(err);
    });
});

const port = process.env.PORT || 3000;

httpServer.listen(port, () => {
  console.log("listening on *:" + port);
});
