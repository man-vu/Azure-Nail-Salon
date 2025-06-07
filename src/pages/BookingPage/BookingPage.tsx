import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './BookingPage.css';
import ServiceCategorySelector from '@/components/ServiceCategorySelector/ServiceCategorySelector';
import ServiceSelector from '@/components/ServiceSelector/ServiceSelector';
import DesignerSelector from '@/components/DesignerSelector/DesignerSelector';
import Scheduler from '@/components/Scheduler/Scheduler';
import StepProgressBar from '@/components/StepProgressBar/StepProgressBar';
import ReviewModal from '@/components/ReviewModal/ReviewModal';
import SidebarMask from '@/components/SidebarMask/SidebarMask';
import { type BookingEvent } from '@/data/availableSlots';
import { type CategoryServiceItem } from '@/data/pricing';
import { type Designer } from '@/data/designers';
import { motion, AnimatePresence } from "framer-motion";
import { useIsMobile } from '@/lib/useIsMobile'; // import the custom hook
import { API_BASE_URL } from '@/config';
import { apiFetch } from '@/lib/api';

const steps = [
  'Select a service category',
  'Select a service',
  'Select an artist',
  'Select date & time',
  'Review & Confirmation',
];

const BookingPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const navState = location.state || {};

  const [categories, setCategories] = useState<CategoryServiceItem[]>([]);
  const [designerData, setDesignerData] = useState<Designer[]>([]);
  const [designerServices, setDesignerServices] = useState<any[]>([]);

  const [formData, setFormData] = useState({
    category: null as number | null,
    service: '',
    designer: '',
    start: null as Date | null,
    end: null as Date | null,
  });
  const [events, setEvents] = useState<BookingEvent[]>([]);
  const [step, setStep] = useState(0);
  const [showReview, setShowReview] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState<
    | { type: 'success' | 'error'; message: string }
    | null
  >(null);
  const isMobile = useIsMobile(); // <-- use the custom hook

useEffect(() => {
  console.log('Fetching categories...');
  fetch(`${API_BASE_URL}/categories`)
    .then(async res => {
      console.log('Categories response status:', res.status);
      if (!res.ok) return [];
      return res.json();
    })
    .then(data => {
      console.log('Categories data:', data);
      setCategories(Array.isArray(data) ? data : []);
    })
    .catch(error => {
      console.error('Error fetching categories:', error);
      setCategories([]);
    });

  console.log('Fetching designers...');
  fetch(`${API_BASE_URL}/designers`)
    .then(async res => {
      console.log('Designers response status:', res.status);
      if (!res.ok) return [];
      return res.json();
    })
    .then(data => {
      console.log('Designers data:', data);
      setDesignerData(Array.isArray(data) ? data : []);
    })
    .catch(error => {
      console.error('Error fetching designers:', error);
      setDesignerData([]);
    });
}, []);

  useEffect(() => {
    if (!formData.service) return;
    const serviceObj = categories
      .flatMap(c => c.Services || [])
      .find(s => (s.title || s.name) === formData.service);
    if (!serviceObj) {
      setDesignerData([]);
      return;
    }
    fetch(`${API_BASE_URL}/services/${serviceObj.id}/designers`)
      .then(async res => {
        if (!res.ok) return [];
        return res.json();
      })
      .then(data => setDesignerData(Array.isArray(data) ? data : []))
      .catch(() => setDesignerData([]));
  }, [formData.service, categories]);

  useEffect(() => {
    if (navState.category) {
      setFormData(prev => ({
        ...prev,
        category: typeof navState.category === 'number' ? navState.category : parseInt(navState.category, 10),
        service: navState.service || '',
        designer: '',
        start: null,
        end: null,
      }));
      if (navState.service) setStep(2);
      else setStep(1);
    }
    // eslint-disable-next-line
  }, [navState.category, navState.service]);

  useEffect(() => {
    if (!formData.designer) return;
    fetch(`${API_BASE_URL}/designers/${formData.designer}/services`)
      .then(async res => {
        if (!res.ok) return [];
        return res.json();
      })
      .then(data => setDesignerServices(Array.isArray(data) ? data : []))
      .catch(() => setDesignerServices([]));

    fetch(`${API_BASE_URL}/designers/${formData.designer}/slots`)
      .then(async res => {
        if (!res.ok) return [];
        return res.json();
      })
      .then(data => {
        const safeData = Array.isArray(data) ? data : [];
        setEvents(
          safeData.map((s: any) => ({
            title: '',
            start: new Date(s.startTime),
            end: new Date(s.endTime),
          }))
        );
      })
      .catch(() => setEvents([]));
  }, [formData.designer]);


  const categorySource = formData.designer
    ? categories.map(cat => ({
        ...cat,
        Services: (cat.Services || []).filter(s =>
          designerServices.some(ds => ds.id === s.id)
        ),
      })).filter(cat => cat.Services && cat.Services.length > 0)
    : categories;
  const designerSource = designerData;

  const goToStep = (targetStep: number) => {
    setStep(targetStep);
    setFormData(prev => {
      if (targetStep === 0) return { ...prev, category: null, service: '', designer: '', start: null, end: null };
      if (targetStep === 1) return { ...prev, service: '', designer: '', start: null, end: null };
      if (targetStep === 2) return { ...prev, designer: '', start: null, end: null };
      if (targetStep === 3) return { ...prev, start: null, end: null };
      return prev;
    });
  };

  const canProceed =
    (step === 0 && !!formData.category) ||
    (step === 1 && !!formData.service) ||
    (step === 2 && !!formData.designer) ||
    (step === 3 && !!formData.start && !!formData.end);

  const handleNext = () => {
    if (canProceed) {
      if (step === 3) setShowReview(true);
      else setStep(s => s + 1);
    }
  };
  const handleBack = () => { if (step > 0) goToStep(step - 1); };

  const handleCategoryChange = (catId: number) => {
    setFormData(prev => ({ ...prev, category: catId, service: '', designer: '', start: null, end: null }));
    setStep(1);
  };
  const handleServiceChange = (e: React.ChangeEvent<HTMLSelectElement> | string) => {
    const value = typeof e === 'string' ? e : e.target.value;
    setFormData(prev => ({ ...prev, service: value, designer: '', start: null, end: null }));
    setStep(2);
  };
  const handleDesignerChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, designer: e.target.value, start: null, end: null }));
    setStep(3);
  };
  const handleSelectSlot = (slotInfo: any) => {
    setFormData(prev => ({ ...prev, start: slotInfo.start, end: slotInfo.end }));
    setStep(4);
    setShowReview(true);
  };

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setSubmissionStatus(null);

    // basic validation
    if (!formData.category || !formData.service || !formData.designer || !formData.start || !formData.end) {
      setSubmissionStatus({ type: 'error', message: 'Please complete all booking steps.' });
      return;
    }

    const serviceObj = categories
      .flatMap(c => c.Services || [])
      .find(s => (s.title || s.name) === formData.service);

    if (!serviceObj) {
      setSubmissionStatus({ type: 'error', message: 'Selected service is invalid.' });
      return;
    }

    // sanitize ids to avoid injection
    const sanitize = (val: string | number) => String(val).replace(/["'`;]/g, '');

    const payload = {
      serviceId: sanitize(serviceObj.id),
      designerId: sanitize(formData.designer),
      startTime: formData.start?.toISOString(),
      endTime: formData.end?.toISOString(),
    };

    apiFetch('/bookings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then(async res => {
        if (res.ok) {
          setSubmissionStatus({ type: 'success', message: 'Booking saved successfully.' });
          const categoryObj = categories.find(c => c.id === formData.category);
          setShowReview(false);
          setStep(0);
          setFormData({ category: null, service: '', designer: '', start: null, end: null });
          navigate('/booking/confirmation', {
            state: {
              category: categoryObj?.title || categoryObj?.name || '',
              service: formData.service,
              designer: formData.designer,
              start: formData.start?.toISOString(),
              end: formData.end?.toISOString(),
            },
          });
        } else {
          const data = await res.json().catch(() => ({}));
          let message = data.error || 'Failed to save booking.';
          if (res.status === 401) {
            message = 'You must be logged in to create a booking.';
          }
          setSubmissionStatus({ type: 'error', message });
        }
      })
      .catch(() => setSubmissionStatus({ type: 'error', message: 'Network error. Please try again.' }));
  };

  const handleReviewClose = () => {
    setShowReview(false);
    setStep(3);
  };

  // ----------- Core logic for hiding selectors on mobile at date/time step -----------
  // Show selectors if not mobile, or if not on step 3+
  const shouldShowSelectors =
    !isMobile || (step < 3);

  return (
    <section className="booking-page">
      <div className="booking-container">
        <div className="booking-header">
          <h1>Book an Appointment</h1>
          <StepProgressBar
            steps={steps}
            currentStep={step}
            onStepClick={goToStep}
          />
        </div>
        <div className="booking-body">
          <aside className="booking-sidebar" style={{ position: "relative" }}>
            <AnimatePresence mode="wait">
              {shouldShowSelectors && (
                <>
                  {step === 0 && (
                    <motion.div
                      key="category"
                      initial={{ opacity: 0, x: -32 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 32 }}
                      transition={{ duration: 0.24 }}
                    >
                      <ServiceCategorySelector categories={categorySource} value={formData.category} onChange={handleCategoryChange} />
                    </motion.div>
                  )}
                  {step === 1 && (
                    <motion.div
                      key="service"
                      initial={{ opacity: 0, x: -32 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 32 }}
                      transition={{ duration: 0.24 }}
                    >
                      <ServiceSelector categories={categorySource} value={formData.service} category={formData.category} onChange={handleServiceChange} />
                    </motion.div>
                  )}
                  {step === 2 && (
                    <motion.div
                      key="designer"
                      initial={{ opacity: 0, x: -32 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 32 }}
                      transition={{ duration: 0.24 }}
                    >
                      <DesignerSelector designers={designerSource} value={formData.designer} onChange={handleDesignerChange} />
                    </motion.div>
                  )}
                  {step >= 3 && (
                    <motion.div
                      key="locked"
                      initial={{ opacity: 0, x: -32 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 32 }}
                      transition={{ duration: 0.24 }}
                    >
                      <ServiceCategorySelector categories={categorySource} value={formData.category} onChange={() => { }} />
                      <ServiceSelector categories={categorySource} value={formData.service} category={formData.category} onChange={() => { }} />
                      <DesignerSelector designers={designerSource} value={formData.designer} onChange={() => { }} />
                      <SidebarMask text="Your selections are locked in. To change, go back." />
                    </motion.div>
                  )}
                </>
              )}
            </AnimatePresence>
          </aside>

          <div className="booking-main">
            <AnimatePresence mode="wait">
              <motion.div
                key="scheduler"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.24 }}
                className="calendar-wrapper"
              >
                <h3 className="designer-heading">Select date & time</h3>
                <Scheduler
                  events={events}
                  onSelectSlot={handleSelectSlot}
                  selectable={step === 3}
                />
                {step < 3 && (
                  <SidebarMask text="Select category, service, and artist to choose a time" />
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
        {submissionStatus && (
          <p className={`submission-message ${submissionStatus.type}`}>
            {submissionStatus.message}
          </p>
        )}
      </div>
      <ReviewModal
        open={showReview}
        onClose={handleReviewClose}
        onConfirm={handleSubmit}
        formData={{
          ...formData,
          category: categories.find(c => c.id === formData.category) as any,
        }}
      />
    </section>
  );
};

export default BookingPage;
