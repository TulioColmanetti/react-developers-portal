import React from 'react';

export default function Button({
  buttonType = 'button',
  onButtonClick = null,
  buttonColor = 'yellow',
  textValue = 'Click',
}) {
  const cssClasses = `font-semibold py-2 px-4 w-min rounded-md bg-${buttonColor}-100 shadow-md hover:cursor-pointer hover:text-${buttonColor}-500 hover:scale-105`;
  return <input type={buttonType} onClick={onButtonClick} className={cssClasses} value={textValue} />;
}
