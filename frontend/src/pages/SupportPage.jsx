import React from 'react';
import Input from '../components/utils/Input';

export default function SupportPage() {
  return (
    <div className="flex flex-col space-y-2 p-4 mx-auto items-center">
      <h3 className="text-center font-semibold mb-6">Suporte do Portal para Desenvolvedores</h3>
      <form className="flex flex-col w-full py-4 px-8 mt-8 max-w-2xl lg:max-w-4xl bg-gray-200 rounded-lg shadow-md">
        <h4 className="text-xl text-center font-semibold pb-2 mb-8 border-b-2 border-gray-300">
          Formulário de Solicitação de Suporte
        </h4>
        <Input id="title" type="text" labelName="Título" />
        {/* <button onClick={saveGrade} className="btn btn-success">Submit</button> */}
        <div className="flex flex-row justify-end mt-4">
          <input
            type="submit"
            className="py-2 px-4 w-min rounded-md bg-yellow-100 shadow-md hover:cursor-pointer hover:text-yellow-500 hover:scale-105"
            value="Enviar"
          />
        </div>
      </form>
    </div>
  );
}
