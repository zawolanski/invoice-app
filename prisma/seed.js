/* eslint-disable @typescript-eslint/no-var-requires */
const { PrismaClient } = require('@prisma/client');
const { example } = require('./data');
const prisma = new PrismaClient();

const load = async () => {
  try {
    await prisma.example.createMany({
      data: example,
    });
    console.log('Example created');
  } catch (e) {
    console.log(e);
  } finally {
    await prisma.$disconnect();
  }
};

load();
