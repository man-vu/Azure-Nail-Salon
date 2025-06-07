import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Header from './components/Header/Header';
import Footer from './containers/footer/Footer';
import Hero from './containers/hero/Hero';
import Services from './containers/services/Services';
import About from './containers/about/About';
import Testimonials from './containers/testimonials/Testimonials';
import Gallery from './containers/gallery/Gallery';
import GiftCards from './containers/gift-cards/GiftCards';
import { lazy, Suspense, useEffect } from 'react';
import Loader from './components/Loader/Loader';

const BookingPage = lazy(() => import('./pages/BookingPage/BookingPage'));
const BookingConfirmationPage = lazy(() => import('./pages/BookingConfirmationPage/BookingConfirmationPage'));
const ServicesPage = lazy(() => import('./pages/ServicesPage/ServicesPage'));
const TeamPage = lazy(() => import('./pages/TeamPage/TeamPage'));
const ContactUsPage = lazy(() => import('./pages/ContactUsPage/ContactUsPage'));
const GiftCardPage = lazy(() => import('./pages/GiftCardPage/GiftCardPage'));
const AuthPage = lazy(() => import('./pages/Auth/AuthPage'));

const pageTransition = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -30 },
  transition: { duration: 0.4 },
};

// ScrollToTop component
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <motion.div {...pageTransition}>
              <Hero />
              <Services />
              <About />
              <Testimonials />
              <Gallery />
              <GiftCards />
            </motion.div>
          }
        />
        <Route
          path="/booking"
          element={
            <motion.div {...pageTransition}>
              <BookingPage />
            </motion.div>
          }
        />
        <Route
          path="/booking/confirmation"
          element={
            <motion.div {...pageTransition}>
              <BookingConfirmationPage />
            </motion.div>
          }
        />
        <Route
          path="/gallery"
          element={
            <motion.div {...pageTransition}>
              <Gallery />
            </motion.div>
          }
        />
        <Route
          path="/services"
          element={
            <motion.div {...pageTransition}>
              <ServicesPage />
            </motion.div>
          }
        />
        <Route
          path="/team"
          element={
            <motion.div {...pageTransition}>
              <TeamPage />
            </motion.div>
          }
        />
        <Route
          path="/contactus"
          element={
            <motion.div {...pageTransition}>
              <ContactUsPage />
            </motion.div>
          }
        />
        <Route
          path="/gift-cards"
          element={
            <motion.div {...pageTransition}>
              <GiftCardPage />
            </motion.div>
          }
        />
        <Route
          path="/login"
          element={
            <motion.div {...pageTransition}>
              <AuthPage />
            </motion.div>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Suspense fallback={<Loader />}>
            <AnimatedRoutes />
          </Suspense>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
