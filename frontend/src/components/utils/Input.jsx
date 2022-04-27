import React from 'react';

export default function Input({ id = 'id', type = 'text', labelName = 'label' }) {
  return (
    <div>
      <label htmlFor={id}>{labelName}</label>
      <input
        type={type}
        className="mt-2 mb-4 p-2 block w-full rounded-md bg-gray-50"
        id={id}
        required
        // value={grade.name}
        // onChange={handleInputChange}
        id={id}
      />
    </div>
  );
}
