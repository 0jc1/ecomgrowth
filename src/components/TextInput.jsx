import React from 'react';

const TextInput = ({ label, name, id, value, onChange }) => {
  return (
    <div className="mb-5.5">
      <label
        className="mb-3 block text-sm font-medium text-black dark:text-white"
        htmlFor={id}
      >
        {label}
      </label>
      <input
        className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
        type="text"
        name={name}
        id={id}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default TextInput;