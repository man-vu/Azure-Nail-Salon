import './PreparationTips.css';

const tips = [
  'Arrive 10 minutes early to unwind and check in.',
  'Remove any existing nail polish before your appointment.',
  "Avoid heavy hand lotions on the day for better polish adhesion.",
  "If you're feeling unwell, please reschedule for everyone's safety."
];

const PreparationTips = () => (
  <section className="prep-tips">
    <h3 className="prep-tips-title">Preparation Tips</h3>
    <ul className="prep-tips-list">
      {tips.map((tip, idx) => (
        <li key={idx}>{tip}</li>
      ))}
    </ul>
  </section>
);

export default PreparationTips;
