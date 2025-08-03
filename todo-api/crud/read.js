const { PrismaClient } = require("../generated/prisma");

const prisma = new PrismaClient();

async function main() {
    const items = await prisma.todo.findMany();

    console.log(items);
}

main();
