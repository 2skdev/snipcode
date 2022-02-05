import { prisma } from "../src/lib/prisma";

const main = async () => {};

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
