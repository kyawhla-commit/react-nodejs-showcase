const express = require("express");
const jwt = require("jsonwebtoken");

const { PrismaClient } = require("../generated/prisma");
const prisma = new PrismaClient();

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
async function auth(req, res, next) {
	const auth = req.headers.authorization;

	if (!auth) {
		return res.status(401).json({ msg: "Token required" });
	}

	const token = auth.split(" ")[1];

	try {
		const token_user = jwt.verify(token, process.env.JWT_SECRET);
		const user = await prisma.user.findUnique({
			where: {
				id: token_user.id,
			},
		});

        req.user = user;
        next();

	} catch (e) {
		return res.status(401).json({ msg: "Invalid Token" });
	}
}

module.exports = { auth };
