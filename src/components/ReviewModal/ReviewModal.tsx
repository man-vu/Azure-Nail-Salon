import React from 'react';
import { Button } from '../ui/button';
import { CategoryServiceItem } from '@/data/pricing';
import './ReviewModal.css';

interface ReviewModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: (e: React.FormEvent) => void;
  formData: {
    category?: CategoryServiceItem | null;
    service: string;
    designer: string;
    start: Date | null;
    end: Date | null;
  };
}

const ReviewModal: React.FC<ReviewModalProps> = ({ open, onClose, onConfirm, formData }) => {
  if (!open) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <h3>Review & Confirm</h3>
        <ul>
          <li><strong>Category:</strong> {formData.category?.title || formData.category?.name || 'N/A'}</li>
          <li><strong>Service:</strong> {formData.service}</li>
          <li><strong>Artist:</strong> {formData.designer}</li>
          <li>
            <strong>Date & Time:</strong>{' '}
            {formData.start?.toLocaleString()} – {formData.end?.toLocaleTimeString()}
          </li>
        </ul>
        <div style={{ display: 'flex', gap: 12, marginTop: 20, justifyContent: 'flex-end' }}>
          <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
          <Button type="button" className="booking-submit" onClick={onConfirm}>Confirm Booking</Button>
        </div>
      </div>
    </div>
  );
};

export default ReviewModal;
