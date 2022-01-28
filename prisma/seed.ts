import { prisma } from "../src/lib/prisma";

const main = async () => {
  await prisma.post.create({
    data: {
      id: "aaa",
      title: "hoge",
      userId: "tmp",
    },
  });
};

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
