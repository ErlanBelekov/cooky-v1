import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function seed() {
  const email = "erlan@remix.run";

  await prisma.recipe.deleteMany({
    where: {
      user: {
        email,
      },
    },
  });

  // cleanup the existing database
  await prisma.user.delete({ where: { email } }).catch(() => {
    // no worries if it doesn't exist yet
  });

  const user = await prisma.user.create({
    data: {
      email,
    },
  });

  const veganTag = await prisma.tag.upsert({
    where: {
      id: 1,
    },
    create: {
      title: "Vegan",
    },
    update: {},
  });

  const bakingTag = await prisma.tag.upsert({
    where: {
      id: 2,
    },
    create: {
      title: "Baking",
    },
    update: {},
  });

  const irritableBowelSyndromeTag = await prisma.tag.upsert({
    where: {
      id: 3,
    },
    create: {
      title: "Irritable bowel syndrome",
    },
    update: {},
  });

  await prisma.recipe.create({
    data: {
      title: "Roast beef",
      userId: user.id,
      images: {
        set: [
          "https://images.immediate.co.uk/production/volatile/sites/30/2020/08/roast-beef-recipes-536cd86.jpg?quality=90&resize=440,400",
        ],
      },
      tags: {
        connect: [{ id: irritableBowelSyndromeTag.id }, { id: bakingTag.id }],
      },
    },
  });

  await prisma.recipe.create({
    data: {
      title: "Shaverma",
      userId: user.id,
      images: {
        set: [
          "https://eda.ru/img/eda/c620x415/s1.eda.ru/StaticContent/Photos/170215184917/200722222523/p_O.jpg",
        ],
      },
      tags: {
        connect: [
          {
            id: veganTag.id,
          },
          {
            id: irritableBowelSyndromeTag.id,
          },
        ],
      },
    },
  });

  await prisma.recipe.create({
    data: {
      title: "Pancakes",
      userId: user.id,
      images: {
        set: [
          "https://static.onecms.io/wp-content/uploads/sites/43/2022/02/16/21014-Good-old-Fashioned-Pancakes-mfs_001.jpg",
        ],
      },
      tags: {
        connect: {
          id: bakingTag.id,
        },
      },
    },
  });

  console.log(`Database has been seeded. 🌱`);
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
