import { prisma } from '../../server/prisma/client.js';

export async function resolveServiceId(idOrName) {
  if (typeof idOrName === 'number') return idOrName;
  const parsed = parseInt(idOrName, 10);
  if (!Number.isNaN(parsed)) return parsed;
  const service = await prisma.services.findFirst({ where: { name: idOrName } });
  return service ? service.id : null;
}

export function getAllServices() {
  return prisma.services.findMany({ include: { category: true } });
}

export async function getDesignersForService(idOrName) {
  const serviceId = await resolveServiceId(idOrName);
  if (!serviceId) return null;
  const rows = await prisma.designerServices.findMany({
    where: { serviceId },
    include: { Designers: true }
  });
  return rows.map(r => r.Designers);
}
