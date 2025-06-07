// src/components/ServiceSelector/ServiceSelector.tsx
import { type CategoryServiceItem } from '@/data/pricing';
import './ServiceSelector.css';
import ClockIcon from "../icons/ClockIcon";

interface Props {
  value: string;
  category: number;
  onChange: (e: React.ChangeEvent<HTMLSelectElement> | string) => void;
  categories?: CategoryServiceItem[];
}

const ServiceSelector = ({ value, category, onChange, categories }: Props) => {
  const handleSelect = (title: string) => {
    onChange({ target: { name: 'service', value: title } } as any);
  };

  const data = categories;

  const selectedCategory = data.find(cat => cat.id === category);

  return (
    <div className="service-selector">
      <h3 className="service-selector-heading">Select a service</h3>

      {!selectedCategory || !selectedCategory.Services || selectedCategory.Services.length === 0 ? (
        <p className="service-selector-subtext">Please select a service category with available services.</p>
      ) : (
        <div className="service-selector-grid">
          {selectedCategory.Services.map((service) => (
            <div
              key={service.id}
              className={`service-selector-card ${value === (service.title || service.name) ? 'selected' : ''}`}
              onClick={() => handleSelect(service.title || service.name)}
            >
              <h4 className="service-selector-title">{(service.title || service.name)} - ${service.cost ?? service.price}</h4>
              <p className="service-selector-description">{service.description}</p>
              <div className="service-selector-meta">
                <p style={{ display: "flex", alignItems: "center", gap: 4 }}>
                  <ClockIcon size={16} color="#bbb" style={{ marginRight: 4, flexShrink: 0 }} />
                  {service.estimatedTimeMinutesRange ? (
                    `${service.estimatedTimeMinutesRange[0]}–${service.estimatedTimeMinutesRange[1]} mins`
                  ) : (
                    `${service.duration} mins`
                  )}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ServiceSelector;
