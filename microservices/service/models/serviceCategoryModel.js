import { prisma } from '../../server/prisma/client.js';

export function getAllServiceCategories() {
  return prisma.serviceCategories.findMany({ include: { Services: true } });
}
