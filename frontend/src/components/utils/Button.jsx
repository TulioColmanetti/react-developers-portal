import React from 'react';

export default function Button({ buttonType = 'button', onButtonClick = null, color = 'yellow', textValue = 'Click' }) {
  return (
    <input
      type={buttonType}
      onClick={onButtonClick}
      className={`font-semibold py-2 px-4 w-min rounded-md bg-${color}-100 shadow-md hover:cursor-pointer hover:text-${color}-500 hover:scale-105`}
      value={textValue}
    />
  );
}
