import React from 'react';

import Input from '../components/utils/Input';
import Select from '../components/utils/Select';

export default function SupportPage() {
  return (
    <div className="flex flex-col space-y-2 p-4 mx-auto items-center">
      <h3 className="text-center font-semibold mb-6">Suporte do Portal para Desenvolvedores</h3>
      <form className="flex flex-col w-full py-4 px-8 mt-8 max-w-2xl lg:max-w-4xl bg-gray-200 rounded-lg shadow-md">
        <h4 className="text-xl text-center font-semibold pb-2 mb-8 border-b-2 border-gray-300">
          Formulário de Solicitação de Suporte
        </h4>
        <Input id="title" type="text" labelName="Título" textPlaceHolder="Insira o título da solicitação" />
        <div className="flex flex-row space-x-12 mt-4 mb-8">
          <Select
            labelDescription="Categoria de Suporte: "
            // onChangeValue={handleFirmwareVersionChange}
            // selectedValue={selectedFirmwareVersion}
          >
            {[
              { id: 'op1', description: 'Produtos' },
              { id: 'op2', description: 'Serviços' },
            ]}
          </Select>
          <Select
            labelDescription="Nome do Produto / Serviço: "
            // onChangeValue={handleFirmwareVersionChange}
            // selectedValue={selectedFirmwareVersion}
          >
            {/* {filteredProduct.firmare_versions.map((firm) => {
            return { id: firm, description: firm };
          })} */}
          </Select>
        </div>
        <label htmlFor="description" className="font-semibold">
          Descrição
        </label>
        <textarea
          id="description"
          name="description"
          rows="6"
          required
          placeHolder="Insira a descrição da solicitação"
          className="mt-2 mb-4 p-2 block w-full rounded-md bg-gray-50"
        />
        {/* <Input id="email" type="email" labelName="E-mail" textPlaceHolder="Insira o e-mail de contato" /> */}
        <div className="flex flex-row justify-end space-x-4 mt-4">
          <input
            type="button"
            className="font-semibold py-2 px-4 w-min rounded-md bg-red-100 shadow-md hover:cursor-pointer hover:text-red-500 hover:scale-105"
            value="Limpar"
          />
          {/* <button onClick={saveGrade} className="btn btn-success">Submit</button> */}
          <input
            type="submit"
            className="font-semibold py-2 px-4 w-min rounded-md bg-yellow-100 shadow-md hover:cursor-pointer hover:text-yellow-500 hover:scale-105"
            value="Enviar"
          />
        </div>
      </form>
    </div>
  );
}
