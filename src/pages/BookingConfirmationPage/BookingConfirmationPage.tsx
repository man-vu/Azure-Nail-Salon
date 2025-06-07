import PreparationTips from '@/containers/preparation-tips/PreparationTips';
import './BookingConfirmationPage.css';

const BookingConfirmationPage = () => (
  <div className="booking-confirmation-page">
    <header className="booking-confirmation-header">
      <h2>Your Booking is Confirmed!</h2>
      <p>Thank you for choosing Dreamy Nail & Beauty. We look forward to seeing you.</p>
    </header>
    <main className="booking-confirmation-main">
      <PreparationTips />
    </main>
  </div>
);

export default BookingConfirmationPage;
