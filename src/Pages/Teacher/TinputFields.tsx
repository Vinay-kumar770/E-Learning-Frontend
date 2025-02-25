import React from "react";
import "./CSS/TeacherInput.css";

interface TinputProps {
  rows?: number;
  cols?: number;
  placeholder?: string;
  value: string;
  changed: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  label?: string;
}

const Tinput: React.FC<TinputProps> = (props) => {
  const {
    rows = 5,
    cols = 30,
    placeholder = "",
    value,
    changed,
    label,
  } = props;

  return (
    <div>
      {label && (
        <div>
          <label className="Teacher-Label">{label}</label>
        </div>
      )}
      <div>
        <textarea
          className="Textarea"
          rows={rows}
          cols={cols}
          placeholder={placeholder}
          value={value}
          onChange={changed}
        />
      </div>
    </div>
  );
};

export default Tinput;

// Let me know if you want any adjustments or explanations! 🚀
