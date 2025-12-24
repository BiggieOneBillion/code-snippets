const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  try {
    const count = await prisma.user.count();
    console.log('Connected to DB. User count:', count);

    const users = await prisma.user.findMany({ take: 5 });
    console.log('Sample users:', users.map(u => ({ id: u.id, email: u.email, name: u.name })));
  } catch (e) {
    console.error('Error querying DB:', e);
    process.exitCode = 1;
  } finally {
    await prisma.$disconnect();
  }
}

main();
