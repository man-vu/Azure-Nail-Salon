import { prisma } from '../prisma/client.js';

export function getAllServiceCategories() {
  return prisma.serviceCategories.findMany({ include: { Services: true } });
}
