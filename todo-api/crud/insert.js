const { PrismaClient } = require("../generated/prisma");

const prisma = new PrismaClient();

async function main() {
    const role = await prisma.role.create({
        data: {
            name: "Admin",
            users: {
                create: [
                    { name: "Alice", email: "alice@gmail.com" },
                    { name: "Bob", email: "bob@gmail.com" },
                ]
            }
        }
    });

    console.log(role);
}

main();
