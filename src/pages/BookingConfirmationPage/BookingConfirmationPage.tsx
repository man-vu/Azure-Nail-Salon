import { useLocation } from 'react-router-dom';
import PreparationTips from '@/containers/preparation-tips/PreparationTips';
import './BookingConfirmationPage.css';

interface BookingDetails {
  category?: string;
  service?: string;
  designer?: string;
  start?: string;
  end?: string;
}

const BookingConfirmationPage = () => {
  const location = useLocation();
  const details = (location.state || {}) as BookingDetails;

  return (
    <div className="booking-confirmation-page">
      <main className="booking-confirmation-main">
        <div className="booking-success-card">
          <h2 className="booking-success-title">Your Booking is Confirmed!</h2>
          <p>Thank you for choosing Dreamy Nail &amp; Beauty. We look forward to seeing you.</p>
          <ul className="booking-details-list">
            <li><strong>Category:</strong> {details.category || 'N/A'}</li>
            <li><strong>Service:</strong> {details.service || 'N/A'}</li>
            <li><strong>Artist:</strong> {details.designer || 'N/A'}</li>
            <li>
              <strong>Date &amp; Time:</strong>{' '}
              {details.start
                ? `${new Date(details.start).toLocaleString()} – ${new Date(details.end || '').toLocaleTimeString()}`
                : 'N/A'}
            </li>
          </ul>
        </div>
        <PreparationTips />
      </main>
    </div>
  );
};

export default BookingConfirmationPage;
