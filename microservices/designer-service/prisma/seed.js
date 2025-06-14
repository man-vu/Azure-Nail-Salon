import { PrismaClient } from '@prisma/client';
import { designers } from '../src/data/designers.js';
import { categoryServices } from '../src/data/pricing.js';
import { testimonials, galleryImages } from '../src/data/content.js';

const prisma = new PrismaClient();

async function main() {
  for (const d of designers) {
    await prisma.designer.upsert({
      where: { name: d.name },
      update: {},
      create: {
        name: d.name,
        title: d.title,
        avatar: d.avatar,
        bio: d.bio,
      },
    });
  }

  for (const cat of categoryServices) {
    const category = await prisma.serviceCategory.upsert({
      where: { name: cat.title },
      update: {},
      create: {
        name: cat.title,
        image: cat.image,
        description: cat.description,
        shortDescription: cat.shortDescription,
        cost: cat.cost,
        currency: cat.currency,
        estimatedMin: cat.estimatedTimeMinutesRange[0],
        estimatedMax: cat.estimatedTimeMinutesRange[1],
      },
    });
    if (cat.services) {
      for (const svc of cat.services) {
        await prisma.service.upsert({
          where: { name: svc.title },
          update: {},
          create: {
            name: svc.title,
            description: svc.description,
            price: svc.cost,
            duration: svc.estimatedTimeMinutesRange[1],
            image: svc.image,
            categoryId: category.id,
          },
        });
      }
    }
  }

  for (const review of testimonials) {
    await prisma.customerReview.upsert({
      where: { id: review.id },
      update: {},
      create: {
        id: review.id,
        name: review.name,
        role: review.role,
        image: review.image,
        quote: review.quote,
        rating: review.rating,
      },
    });
  }

  for (const img of galleryImages) {
    await prisma.galleryImage.upsert({
      where: { id: img.id },
      update: {},
      create: {
        id: img.id,
        url: img.url,
        caption: img.caption,
      },
    });
  }
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
