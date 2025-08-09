const { PrismaClient } = require("../generated/prisma");

const prisma = new PrismaClient();

async function main() {
    const items = await prisma.role.findMany({
        include: { users: true }
    });

    console.log(items);
}

main();
