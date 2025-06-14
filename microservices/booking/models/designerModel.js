import { prisma } from '../../server/prisma/client.js';

export async function resolveDesignerId(idOrName) {
  if (typeof idOrName === 'number') return idOrName;
  const designer = await prisma.designers.findFirst({ where: { name: idOrName } });
  return designer ? designer.id : null;
}

export function getAllDesigners() {
  return prisma.designers.findMany();
}

export async function getServicesForDesigner(idOrName) {
  const designerId = await resolveDesignerId(idOrName);
  if (!designerId) return null;
  return prisma.designerServices.findMany({
    where: { designerId },
    include: { Services: true }
  });
}

export async function getAvailableAppointmentsForDesigner(idOrName) {
  const designerId = await resolveDesignerId(idOrName);
  if (!designerId) return null;
  return prisma.availableAppointments.findMany({
    where: { designerId, booked: false }
  });
}

export async function designerCanPerformService(designerId, serviceId) {
  const id = await resolveDesignerId(designerId);
  if (!id) return false;
  const svcId = typeof serviceId === 'string' ? parseInt(serviceId, 10) : serviceId;
  if (Number.isNaN(svcId)) return false;
  const count = await prisma.designerServices.count({
    where: { designerId: id, serviceId: svcId }
  });
  return count > 0;
}
