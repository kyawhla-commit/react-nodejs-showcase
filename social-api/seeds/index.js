const { PrismaClient } = require("../generated/prisma");
const prisma = new PrismaClient();

const bcrypt = require("bcrypt");
const { faker } = require("@faker-js/faker");

async function main() {
	console.log("Clearing existing data...");

	await prisma.comment.deleteMany();
	await prisma.$executeRawUnsafe(
		"DELETE FROM sqlite_sequence WHERE name='Comment'"
	);
	await prisma.post.deleteMany();
	await prisma.$executeRawUnsafe(
		"DELETE FROM sqlite_sequence WHERE name='Post'"
	);
	await prisma.user.deleteMany();
	await prisma.$executeRawUnsafe(
		"DELETE FROM sqlite_sequence WHERE name='User'"
	);

	console.log("Clearing existing data completed.");

	console.log("Data seeding starting...");

	const hash = await bcrypt.hash("password", 10);

	await prisma.user.createMany({
		data: [
			{ name: "Alice", username: "alice", password: hash },
			{ name: "Bob", username: "bob", password: hash },
		],
	});

	for (let i = 0; i < 20; i++) {
		const random_user = Math.floor(Math.random() * 2) + 1;

		await prisma.post.create({
			data: { body: faker.lorem.lines(3), userId: random_user },
		});
	}

	for (let i = 0; i < 40; i++) {
		const random_user = Math.floor(Math.random() * 2) + 1;
		const random_post = Math.floor(Math.random() * 20) + 1;

		await prisma.comment.create({
			data: {
				content: faker.lorem.lines(3),
				postId: random_post,
				userId: random_user,
			},
		});
	}

	console.log("Data seeding done.");
}

main();
