const { PrismaClient } = require("../generated/prisma");

const prisma = new PrismaClient();

async function main() {
	const item = await prisma.todo.createMany({
		data: [
            { name: "Another thing todo" },
            { name: "More thing todo" },
            { name: "Completed todo", done: true },
        ],
	});

	console.log(item);
}

main();
