import React from 'react';
import Collapsible from 'react-collapsible';
import { BsChevronDown } from 'react-icons/bs';

export default function IframeCollapsible({ triggerTitleName = 'Iframe', iframeSrcUrl = 'demo.htm' }) {
  return (
    <Collapsible
      trigger={
        <>
          <p className="font-semibold">{triggerTitleName}</p>
          <BsChevronDown size="1.1rem" />
        </>
      }
      transitionTime="200"
      triggerClassName="flex flex-row p-2 items-center justify-between bg-yellow-100 rounded-lg shadow-md"
      triggerOpenedClassName="flex flex-row p-2 items-center justify-between bg-yellow-100 rounded-t-lg"
      contentInnerClassName="p-2 rounded-b-lg bg-gray-100"
      contentOuterClassName="shadow-md"
    >
      <iframe src={iframeSrcUrl} name="iframe_a" className="h-screen w-full" title="Iframe Collapsible" />
    </Collapsible>
  );
}
