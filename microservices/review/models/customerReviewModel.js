import { prisma } from '../../server/prisma/client.js';

export function getAllCustomerReviews() {
  return prisma.customerReviews.findMany();
}
