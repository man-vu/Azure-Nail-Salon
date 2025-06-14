// Services.tsx
import ServiceCard from '../../components/ServiceCard/ServiceCard';
import { Button } from '@/components/ui/button';
import './Services.css';
import { servicesContent } from '@/data/content';
import { type CategoryServiceItem } from '@/data/pricing';
import { apiFetch } from '@/lib/api';
import { useEffect, useState } from 'react';

const ServicesSection = () => {
  const [categories, setCategories] = useState<CategoryServiceItem[]>([]);

  useEffect(() => {
    apiFetch('/categories')
      .then(res => res.json())
      .then(setCategories)
      .catch(() => {});
  }, []);

  const items = categories.map(cat => ({
    title: cat.name || cat.title,
    image: cat.image,
    description: cat.shortDescription ?? cat.description,
  }));

  return (
    <section className="services-section">
      <div className="services-container">
        <div className="services-heading">
          <h2>{servicesContent.heading}</h2>
          <p>{servicesContent.subtext}</p>
        </div>

        <div className="services-grid">
          {items.map((service, index) => (
            <ServiceCard key={index} {...service} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
