"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = require("http");
const cors_1 = __importDefault(require("cors"));
const postgres_1 = require("./config/postgres");
const mongodb_1 = require("./config/mongodb");
const redis_1 = require("./config/redis");
const morgan_1 = __importDefault(require("morgan"));
const console_1 = require("console");
(0, postgres_1.connectPostgres)();
(0, mongodb_1.connectMongo)();
const app = (0, express_1.default)();
const httpServer = (0, http_1.createServer)(app);
if (process.env.NODE_ENV === "development") {
    app.use((0, morgan_1.default)("dev"));
}
else {
    app.use((0, morgan_1.default)("common"));
}
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.get("/", (req, res) => {
    res.send("Hello MOM with redis, postgresDB, mongoDB, mongo-express!");
});
let count = 0;
app.get("/add-product", async (req, res) => {
    const { name, price } = req.query;
    const product = { name, price };
    await redis_1.redisClient.set("product", JSON.stringify(product));
    res.send(product);
});
app.get("/products", (req, res) => {
    redis_1.redisClient
        .get("product")
        .then((product) => {
        console.log("product", product);
        res.send(product);
    })
        .catch((err) => {
        (0, console_1.log)("err", err);
        res.send(err);
    });
});
// add product to postgres
app.post("/add-product-postgres", async (req, res) => {
    const { name, price } = req.body;
    const query = `INSERT INTO products (name, price) VALUES ('${name}', ${price})`;
    try {
        const result = await postgres_1.client.query(query);
        res.send(result);
    }
    catch (err) {
        (0, console_1.log)("err", err);
        res.send(err);
    }
});
// get products from postgres
app.get("/products-postgres", async (req, res) => {
    postgres_1.client
        .query("SELECT * FROM products")
        .then((result) => {
        res.send(result.rows);
    })
        .catch((err) => {
        (0, console_1.log)("err", err);
        res.send(err);
    });
});
const port = process.env.PORT || 3000;
httpServer.listen(port, () => {
    console.log("listening on *:" + port);
});
