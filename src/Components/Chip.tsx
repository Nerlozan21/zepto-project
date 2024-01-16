import React from "react";
import "../Styles/ChipStyles.css"; 

interface ChipProps {
  name: string;
  onRemove: () => void;
  className?: string;
}

const Chip: React.FC<ChipProps> = ({ name, onRemove }) => {
  return (
    <div className="chip">
      {name}
      <span className="remove-icon" onClick={onRemove}>
        X
      </span>
    </div>
  );
};

export default Chip;
