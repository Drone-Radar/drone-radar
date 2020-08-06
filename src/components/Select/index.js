import React from 'react'

import './style.css'

const Select = ({ label, name, options, ...rest }) => {
  return(
    <div className="select-block">
      <label htmlFor={name}>{label}</label>
      <select value="" id={name} {...rest}>
        <option value="" disabled hidden>Select one</option>

        {options.map(option => {
            return <option key={option.value} value={option.value}>{option.label}</option>
        })}
      </select>
    </div>
  );
}

export default Select;
