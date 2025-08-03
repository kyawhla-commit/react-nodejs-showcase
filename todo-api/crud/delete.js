const { PrismaClient } = require("../generated/prisma");

const prisma = new PrismaClient();

async function main() {
    const item = await prisma.todo.delete({
        where: { id: 2 },
    });

    console.log(item);
}

main();
