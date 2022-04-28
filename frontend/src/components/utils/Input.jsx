import React from 'react';

export default function Input({ id = 'id', type = 'text', labelName = 'label', textPlaceHolder = 'placeholder' }) {
  return (
    <div>
      <label htmlFor={id} className="font-semibold">
        {labelName}
      </label>
      <input
        type={type}
        className="mt-2 mb-4 p-2 block w-full rounded-md bg-gray-50"
        id={id}
        required
        placeholder={textPlaceHolder}
        // value={grade.name}
        // onChange={handleInputChange}
      />
    </div>
  );
}
