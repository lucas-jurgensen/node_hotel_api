import { prisma } from "./utils/prisma.js";

async function main() {
    const quartos = await prisma.quarto.findMany();
    console.log(quartos);
    await prisma.$disconnect();
}

main();
