import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GalleryCard from '../../components/GalleryCard/GalleryCard';
import { galleryContent } from '@/data/content';
import './Gallery.css';
import GalleryModal from '@/components/GalleryModal/GalleryModal';
import { apiFetch } from '@/lib/api';


const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.08,
      duration: 0.35,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  }),
  exit: { opacity: 0, y: -32, transition: { duration: 0.2 } },
};

const Gallery = () => {
  const [modalIndex, setModalIndex] = useState<number | null>(null);
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    apiFetch('/gallery')
      .then(res => res.json())
      .then((data: { url: string }[]) => setImages(data.map(d => d.url)))
      .catch(() => {});
  }, []);

  return (
    <section id='gallery' className="gallery-section">
      <div className="gallery-container">
        <header className="gallery-header">
          <h2>{galleryContent.heading}</h2>
          <div className="divider"></div>
          <p>{galleryContent.description}</p>
        </header>

        <div className="gallery-grid">
          <AnimatePresence>
            {images.map((src, index) => (
              <motion.div
                key={src}
                custom={index}
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={cardVariants}
              >
                <GalleryCard
                  src={src}
                  alt={`Nail design ${index + 1}`}
                  onClick={() => setModalIndex(index)}   
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
      <AnimatePresence>
        {modalIndex !== null && (
          <GalleryModal
            images={images}
            index={modalIndex}
            setIndex={setModalIndex}
            onClose={() => setModalIndex(null)}
            onPrev={() => setModalIndex(i => (i !== null && i > 0 ? i - 1 : i))}
            onNext={() => setModalIndex(i => (i !== null && i < images.length - 1 ? i + 1 : i))}
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default Gallery;
