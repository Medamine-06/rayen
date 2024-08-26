
import React from 'react';

const Textarea  = ({ value, onChange, onClick, placeholder }) => {
  return (
    <textarea
      value={value}
      onChange={onChange}
      onClick={onClick}
      placeholder={placeholder}
      className="textarea" 
    />
  );
};

export default Textarea;
