
import React from 'react';

const Textarea  = ({ value, onChange, onClick, placeholder, readOnly, }) => {
  return (
    <textarea
      value={value}
      onChange={onChange}
      onClick={onClick}
      placeholder={placeholder}
      readOnly={readOnly}
      className="textarea" 
    />
  );
};

export default Textarea;
