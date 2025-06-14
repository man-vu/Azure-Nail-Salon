import { prisma } from '../../server/prisma/client.js';

export function createUser(data) {
  return prisma.users.create({ data });
}

export function findByIdentifier(identifier) {
  return prisma.users.findFirst({
    where: {
      OR: [
        { username: identifier },
        { email: identifier },
        { phone: identifier }
      ]
    }
  });
}

export function findById(id) {
  return prisma.users.findUnique({ where: { id } });
}

export function findByUsername(username) {
  return prisma.users.findUnique({ where: { username } });
}

export function findByEmail(email) {
  return prisma.users.findUnique({ where: { email } });
}
