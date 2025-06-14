import { prisma } from '../prisma/client.js';

export function getBookingsForUser(userId) {
  return prisma.bookings.findMany({
    where: { userId },
    include: { service: true, designer: true }
  });
}

export function createBooking(data) {
  return prisma.bookings.create({ data });
}

export function findAvailable(designerId, startTime, endTime) {
  return prisma.availableAppointments.findFirst({
    where: { designerId, startTime, endTime, booked: false }
  });
}

export function bookSlot(id) {
  return prisma.availableAppointments.update({
    where: { id },
    data: { booked: true }
  });
}
