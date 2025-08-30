const express = require("express");
const router = express.Router();

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { auth } = require("../middlewares/auth");

const { PrismaClient } = require("../generated/prisma");
const prisma = new PrismaClient();

router.get("/verify", auth, async (req, res) => {
    res.json(req.user);
});

router.post("/register", async (req, res) => {
	const name = req.body?.name;
	const username = req.body?.username;
	const bio = req.body?.bio;
	const password = req.body?.password;

	if (!name || !username || !password) {
		return res
			.status(400)
			.json({ msg: "name, username and password required" });
	}

	try {
		const hash = await bcrypt.hash(password, 10);

		const user = await prisma.user.create({
			data: {
				name,
				username,
				bio,
				password: hash,
			},
		});

		res.json(user);
	} catch (e) {
		res.status(500).json({ msg: e.message });
	}
});

router.post("/login", async (req, res) => {
	const username = req.body?.username;
	const password = req.body?.password;

	if (!username || !password) {
		return res.status(400).json({ msg: "username and password required" });
	}

	try {
		const user = await prisma.user.findUnique({
			where: { username },
		});

		if (user) {
			if (await bcrypt.compare(password, user.password)) {
				const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);

				return res.json({ token, user });
			}
		}

		res.status(401).json("Incorrect username or password");
	} catch (e) {
		res.status(500).json({ msg: e.message });
	}
});

module.exports = { usersRouter: router };
