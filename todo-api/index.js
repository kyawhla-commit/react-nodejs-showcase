const express = require("express");
const app = express();

const cors = require("cors");
app.use(cors());

app.use(express.json());
app.use(express.urlencoded());

const { PrismaClient } = require("./generated/prisma");
const prisma = new PrismaClient();

app.post("/tasks", async (req, res) => {
	const name = req.body?.name;
	if (!name) {
		return res.status(400).json({ msg: "name required" });
	}

	const item = await prisma.todo.create({
		data: { name },
	});

	res.status(201).json(item);
});

app.get('/tasks', async (req, res) => {
    const items = await prisma.todo.findMany();
    
    res.json(items);
});

app.get('/tasks/:id', async (req, res) => {
    const id = req.params.id;

    const item = await prisma.todo.findFirst({
        where: { id: Number(id) },
    });

    res.json(item);
});

app.put('/tasks/:id/toggle', async (req, res) => {
    const id = req.params.id;

	const item = await prisma.todo.findFirst({
		where: { id: Number(id) },
	});

    const update = await prisma.todo.update({
        where: { id: Number(id) },
        data: { done: !item.done },
    });

    res.json(update);
});

app.delete('/tasks/:id', async (req, res) => {
    const id = req.params.id;

    const item = await prisma.todo.delete({
        where: {
            id: Number(id),
        },
    });

    res.json(item);
});

app.delete('/tasks', async (req, res) => {
    const result = await prisma.todo.deleteMany({
        where: { done: true }
    });

    res.json(result);
});

app.listen(8800, () => {
    console.log("Todo API running at 8800...");
});
