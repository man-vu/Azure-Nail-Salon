import { prisma } from '../../server/prisma/client.js';

export function getTransactionsForUser(userId) {
  return prisma.$transaction.findMany({
    where: { userId },
    include: { booking: true }
  });
}

export function createTransaction(data) {
  return prisma.$transaction.create({ data });
}
