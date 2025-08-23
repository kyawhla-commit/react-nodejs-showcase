const express = require("express");
const app = express();

const cors = require("cors");
app.use(cors());

app.use(express.json());
app.use(express.urlencoded());

const { PrismaClient } = require("./generated/prisma");
const prisma = new PrismaClient();

app.get('/posts', async (req, res) => {
    //
});

app.listen(8800, () => {
    console.log("Spcial API running at 8800...");
});