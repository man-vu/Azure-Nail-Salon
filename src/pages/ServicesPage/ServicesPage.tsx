import React, { useRef, useLayoutEffect, useState, useEffect } from 'react';
import './ServicesPage.css';
import OurServiceCard from '@/components/OurServiceCard/OurServiceCard';
import { Button } from '@/components/ui/button';
import { type CategoryServiceItem } from '@/data/pricing';
import { API_BASE_URL } from '@/config';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from "framer-motion";

function ServicesTabs({ categories, value, onChange }) {
  const listRef = useRef(null);
  const [indicator, setIndicator] = useState({ left: 0, width: 0 });

  useLayoutEffect(() => {
    const tabs = Array.from(listRef.current.querySelectorAll('.services-tab')) as HTMLElement[];
    const idx = categories.findIndex(cat => cat.value === value);
    if (tabs[idx]) {
      setIndicator({
        left: tabs[idx].offsetLeft,
        width: tabs[idx].offsetWidth,
      });
    }
  }, [value, categories]);

  return (
    <div className="services-tabs-list-wrap" style={{ position: 'relative' }}>
      <div
        ref={listRef}
        className="services-tabs-list"
        style={{ position: 'relative', zIndex: 2 }}
      >
        {categories.map(cat => (
          <button
            key={cat.value}
            className={`services-tab${value === cat.value ? ' active' : ''}`}
            onClick={() => onChange(cat.value)}
            type="button"
          >
            {cat.label}
          </button>
        ))}
      </div>
      <div
        className="services-tabs-underline"
        style={{
          position: 'absolute',
          left: indicator.left,
          width: indicator.width,
          height: '2.5px',
          background: '#232323',
          bottom: 0,
          borderRadius: '1px',
          zIndex: 1,
          transition:
            'left 0.3s cubic-bezier(0.25,0.46,0.45,0.94), width 0.3s cubic-bezier(0.25,0.46,0.45,0.94)',
        }}
      />
    </div>
  );
}

const ServicesPage = () => {
  const [data, setData] = useState<CategoryServiceItem[]>([]);
  const [tab, setTab] = useState('');

  useEffect(() => {
    fetch(`${API_BASE_URL}/categories`)
      .then(res => res.json())
      .then(setData)
      .catch(() => setData([]));
  }, []);

  const categoriesList = data.map(cat => ({
    label: (cat.title || cat.name).toUpperCase(),
    value: (cat.title || cat.name).toLowerCase(),
  }));

  useEffect(() => {
    if (!tab && categoriesList.length) {
      setTab(categoriesList[0].value);
    }
  }, [categoriesList, tab]);

  return (
    <main className="services-bg">
      {/* Page Header */}
      <header className="gallery-header">
        <h2>Services</h2>
        <div className="divider"></div>
        <p>Discover our range of premium nail services designed to pamper and perfect your nails.
          Each service is performed by our expert technicians using high-quality products.</p>
      </header>

      {/* Services Tabs */}
      <section className="services-tabs-container">
        <ServicesTabs categories={categoriesList} value={tab} onChange={setTab} />
        <AnimatePresence mode="wait">
          {(() => {
            const source = data;
            const activeCategory = source.find(
              (cat) => (cat.title || cat.name)?.toLowerCase() === tab
            );
            if (!activeCategory) return null;
            return (
              <motion.div
                key={activeCategory.id} // must use key for AnimatePresence
                className="services-tabs-content"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.32, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <div className="services-cards-grid">
                  {activeCategory.Services?.map((svc, i) => (
                    <motion.div
                      key={svc.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.32,
                        delay: i * 0.07
                      }}
                    >
                      <OurServiceCard
                        image={svc.image}
                        title={svc.title || svc.name}
                        category={activeCategory.title || activeCategory.name}
                        description={svc.description}
                        cost={svc.cost ?? svc.price}
                        currency={svc.currency ?? activeCategory.currency}
                        estimatedTimeMinutesRange={svc.estimatedTimeMinutesRange ? svc.estimatedTimeMinutesRange : [svc.duration, svc.duration]}
                        shortDescription={svc.shortDescription}
                      />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            );
          })()}
        </AnimatePresence>
      </section>



      {/* Booking Information */}
      <section className="services-booking-info">
        <div className="services-booking-inner">
          <h2 className="services-booking-title">Ready to Book Your Service?</h2>
          <p className="services-booking-desc">
            Our skilled technicians are ready to provide you with the perfect nail experience.
            Book your appointment today and treat yourself to some well-deserved pampering.
          </p>
          <Link to="/booking">
            <Button className="services-booking-btn">
              BOOK NOW
            </Button>
          </Link>
        </div>
      </section>
    </main>
  );
};

export default ServicesPage;
