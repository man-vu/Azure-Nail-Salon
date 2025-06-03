import React from 'react';

interface StepProgressBarProps {
  steps: string[];
  currentStep: number;
  onStepClick: (targetStep: number) => void;
}

const StepProgressBar: React.FC<StepProgressBarProps> = ({ steps, currentStep, onStepClick }) => {
  return (
    <div className="booking-steps">
      {steps.map((s, i) => {
        const isCompleted = i < currentStep;
        const isActive = i === currentStep;
        const isClickable = isCompleted;

        return (
          <div
            className={`step-item${isActive ? ' active' : ''}${isCompleted ? ' completed' : ''}`}
            key={i}
          >
            <div
              className={`step-circle${isClickable ? ' clickable' : ''}`}
              onClick={() => {
                if (isClickable) onStepClick(i);
              }}
              tabIndex={isClickable ? 0 : -1}
              style={{
                cursor: isClickable ? 'pointer' : 'default',
                backgroundColor: isActive
                  ? 'var(--color-primary)'
                  : isCompleted
                  ? '#e0e0e0'
                  : '#f3f3f3',
                color: isActive
                  ? 'white'
                  : isCompleted
                  ? 'var(--color-primary)'
                  : '#bbb',
                border: isActive
                  ? '2px solid var(--color-primary)'
                  : isCompleted
                  ? '2px solid var(--color-primary)'
                  : '2px solid #eee',
                boxShadow: isActive ? '0 0 0 2px #fff' : 'none',
                transition: 'background 0.2s,color 0.2s,border 0.2s',
              }}
            >
              {i + 1}
            </div>
            <div
              className="step-label"
              style={{
                color: isActive ? 'var(--color-primary)' : isCompleted ? '#888' : '#bbb',
                fontWeight: isActive ? 600 : 400,
              }}
            >
              {s}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default StepProgressBar;
