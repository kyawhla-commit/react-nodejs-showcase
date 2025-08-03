const express = require("express");
const app = express();

const cors = require("cors");
app.use(cors());

const { PrismaClient } = require("./generated/prisma");
const prisma = new PrismaClient();

app.get('/', async (req, res) => {
    const items = await prisma.todo.findMany();
    res.json(items);
});

app.get('/view/:id', async (req, res) => {
    const id = req.params.id;
    const item = await prisma.todo.findFirst({
        where: { id: Number(id) },
    });

    res.json(item);
});

app.listen(8800, () => {
    console.log("Todo API running at 8800...");
});
