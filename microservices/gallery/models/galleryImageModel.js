import { prisma } from '../prisma/client.js';

export function getAllGalleryImages() {
  return prisma.galleryImages.findMany();
}
