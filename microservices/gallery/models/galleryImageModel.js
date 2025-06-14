import { prisma } from '../../server/prisma/client.js';

export function getAllGalleryImages() {
  return prisma.galleryImages.findMany();
}
