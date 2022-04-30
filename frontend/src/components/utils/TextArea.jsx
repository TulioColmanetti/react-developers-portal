import React from 'react';

export default function TextArea({
  id = 'id',
  labelName = 'label',
  textPlaceHolder = 'placeholder',
  onChangeValue = null,
  inputValue = '',
}) {
  return (
    <>
      <label htmlFor={id} className="font-semibold">
        {labelName}
      </label>
      <textarea
        id={id}
        name={id}
        rows="5"
        required
        placeholder={textPlaceHolder}
        className="mt-2 mb-4 p-2 block w-full rounded-md bg-gray-50"
        onChange={onChangeValue}
        value={inputValue}
      />
    </>
  );
}
