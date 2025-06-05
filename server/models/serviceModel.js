import { prisma } from '../prisma/client.js';

export function getAllServices() {
  return prisma.services.findMany({ include: { category: true } });
}
