import React from "react";

interface ChipProps {
  name: string;
  onRemove: () => void;
  className?: string; // Allow the className to be optional
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
