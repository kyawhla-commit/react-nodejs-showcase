const { PrismaClient } = require("../generated/prisma");

const prisma = new PrismaClient();

async function main() {
    const item = await prisma.todo.update({
        data: { name: "Updated item" },
        where: { id: 1 },
    });

    console.log(item);
}

main();
