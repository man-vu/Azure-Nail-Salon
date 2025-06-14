// TestimonialsSwiper.tsx
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import './Testimonials.css';

import TestimonialCard from '@/components/TestimonialCard/TestimonialCard';
import { testimonialsContent } from '@/data/content';
import { apiFetch } from '@/lib/api';
import { useEffect, useState } from 'react';

export interface Review {
  id: number;
  name: string;
  role: string;
  image: string;
  quote: string;
  rating: number;
}

const TestimonialsSwiper = () => {
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    apiFetch('/reviews')
      .then(res => res.json())
      .then(setReviews)
      .catch(() => setReviews([]));
  }, []);

  const data = reviews;

  return (
    <section id='testimonials' className="testimonials-section">
      <div className="testimonials-container">
        <div className="section-header">
          <h2>{testimonialsContent.heading}</h2>
          <div className="section-divider"></div>
        </div>

        <Swiper
          effect="coverflow"
          grabCursor={true}
          centeredSlides={true}
          slidesPerView="auto"
          loop={true}
          autoplay={{ delay: 2500, disableOnInteraction: false }}
          coverflowEffect={{
            rotate: 30,
            stretch: 0,
            depth: 200,
            modifier: 1,
            slideShadows: true,
          }}
          modules={[EffectCoverflow, Autoplay]}
          className="testimonial-swiper"
        >
          {data.map((t) => (
            <SwiperSlide key={t.id} className="swiper-slide-custom">
              <TestimonialCard {...t} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default TestimonialsSwiper;
