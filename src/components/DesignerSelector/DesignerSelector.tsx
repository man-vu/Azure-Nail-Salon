import { type Designer } from '@/data/designers';
import './DesignerSelector.css';

interface Props {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement> | string) => void;
  designers?: Designer[];
}

const DesignerSelector = ({ value, onChange, designers }: Props) => {
  const handleSelect = (name: string) => {
    onChange({ target: { name: 'designer', value: name } } as any);
  };

  const list = Array.isArray(designers) ? designers : [];

  return (
    <div className="designer-selector">
      <h3 className="designer-heading">Choose your artist</h3>
      <div className="designer-grid">
        {list.map((designer) => (
          <div
            key={designer.name}
            className={`designer-card${value === designer.name ? ' selected' : ''}`}
            onClick={() => handleSelect(designer.name)}
          >
            <img
              src={designer.avatar}
              alt={designer.name}
              className="designer-avatar"
              loading="lazy"
            />
            <div>
              <h4 className="designer-name">{designer.name}</h4>
              <div className="designer-title">{designer.title}</div>
              <p className="designer-bio">{designer.bio}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DesignerSelector;
