import React from 'react';
import { AiOutlineFilePdf as FilePdfIcon } from 'react-icons/ai';
import { AiOutlineFileZip as FileZipIcon } from 'react-icons/ai';
import { AiOutlineFileUnknown as FileUnknownIcon } from 'react-icons/ai';
import Collapsible from 'react-collapsible';
import { BsChevronDown } from 'react-icons/bs';

export default function FilesCollapsible({ triggerTitleName = 'Arquivos', filesFolder = '/', children: files = [] }) {
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
      <div className="grid grid-cols-5 gap-4 mx-auto">
        {files.map(({ id, name_with_version, archive_name, extension }) => {
          return (
            <a
              key={id}
              href={filesFolder + archive_name}
              target="_blank"
              rel="noreferrer"
              className="flex flex-col items-center space-y-1 hover:text-yellow-500 hover:scale-105"
            >
              {extension.toLowerCase() === 'zip' && <FileZipIcon size="2rem" />}
              {extension.toLowerCase() === 'pdf' && <FilePdfIcon size="2rem" />}
              {!['zip', 'pdf'].includes(extension.toLowerCase()) && <FileUnknownIcon size="2rem" />}
              <span className="text-center ">{name_with_version}</span>
            </a>
          );
        })}
      </div>
    </Collapsible>
  );
}
