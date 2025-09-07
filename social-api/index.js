const express = require("express");
const app = express();

const cors = require("cors");
app.use(cors());

app.use(express.json());
app.use(express.urlencoded());

const { auth } = require("./middlewares/auth");

const { usersRouter } = require("./routes/users");
app.use("/users", usersRouter);

const { PrismaClient } = require("./generated/prisma");
const prisma = new PrismaClient();

app.get("/posts", async (req, res) => {
	const posts = await prisma.post.findMany({
		include: {
			user: true,
			comments: true,
			postLikes: true,
		},
		take: 20,
	});
	res.json(posts);
});

app.get("/posts/:id", async (req, res) => {
	const id = req.params.id;

	const post = await prisma.post.findFirst({
		include: {
			comments: {
				include: { user: true },
			},
			user: true,
			postLikes: true,
		},
		where: { id: Number(id) },
	});

	if (post) {
		res.json(post);
	} else {
		res.status(404).json({ msg: "post not found" });
	}
});

app.post("/posts", auth, async (req, res) => {
	const body = req.body?.body;

	if (!body) {
		return res.status(400).json({ msg: "body required" });
	}

	const post = await prisma.post.create({
		data: {
			body,
			userId: req.user.id,
		},
	});

	res.json(post);
});

app.delete("/posts/:id", auth, async (req, res) => {
	const id = req.params.id;

	const post = await prisma.post.delete({
		where: {
			id: Number(id),
		},
	});

	res.json(post);
});

app.put("/posts/:id/like", auth, async (req, res) => {
	const postId = req.params.id;
	const userId = req.user.id;

	const like = await prisma.postLike.create({
		data: { postId: Number(postId), userId: Number(userId) },
	});

	res.json(like);
});

app.put("/posts/:id/unlike", auth, async (req, res) => {
	const postId = req.params.id;
	const userId = req.user.id;

	const unlike = await prisma.postLike.deleteMany({
		where: { postId: Number(postId), userId: Number(userId) }
	});

	res.json(unlike);
});

app.listen(8800, () => {
	console.log("Social API running at 8800...");
});
