import React from 'react';

export default function Input({
  id = 'id',
  type = 'text',
  labelName = 'label',
  textPlaceHolder = 'placeholder',
  onChangeValue = null,
  inputValue = '',
}) {
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
        onChange={onChangeValue}
        value={inputValue}
      />
    </div>
  );
}
