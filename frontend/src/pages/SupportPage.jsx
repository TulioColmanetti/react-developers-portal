import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Input from '../components/utils/Input';
import Select from '../components/utils/Select';
import Loading from '../components/utils/Loading';
import { apiGetAllProducts, apiGetAllServices, apiPostSupportRequest } from '../services/apiService';

export default function SupportPage() {
  const [formData, setFormData] = useState({
    title: '',
    category_id: '',
    category_name: '',
    sel_product_service_id: '',
    sel_product_service_name: '',
    description: '',
  });
  const [products, setProducts] = useState([]);
  const [services, setServices] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getProductAndServiceList() {
      const apiProducts = await apiGetAllProducts();
      const apiServices = await apiGetAllServices();

      const productsList = apiProducts
        .map((prd) => ({
          id: prd.id,
          description: prd.name,
        }))
        .sort((a, b) => a.description.localeCompare(b.description, 'en', { numeric: true }));
      setProducts(productsList);

      const servicesList = apiServices
        .map((srv) => ({
          id: srv.id,
          description: srv.name,
        }))
        .sort((a, b) => a.description.localeCompare(b.description, 'en', { numeric: true }));
      setServices(servicesList);

      setSelectedCategory('op1');

      setLoading(false);
    }

    getProductAndServiceList();
  }, []);

  useEffect(() => {
    if (products.length > 0 && services.length > 0) {
      setFormData({
        ...formData,
        category_id: selectedCategory,
        category_name: selectedCategory === 'op1' ? 'Produtos' : 'Serviços',
        sel_product_service_id: selectedCategory === 'op1' ? products[0].id : services[0].id,
        sel_product_service_name: selectedCategory === 'op1' ? products[0].description : services[0].description,
      });
    }
  }, [selectedCategory]);

  const handleSelectedCategoryChange = (newSelectedCategory) => {
    setSelectedCategory(newSelectedCategory);
  };

  const handleFormSelectedProductServiceChange = (newFormSelectedProductService) => {
    setFormData({
      ...formData,
      sel_product_service_id: newFormSelectedProductService,
      sel_product_service_name:
        selectedCategory === 'op1'
          ? products.filter((prd) => prd.id === newFormSelectedProductService)[0].description
          : services.filter((srv) => srv.id === newFormSelectedProductService)[0].description,
    });
  };

  const handleFormTitleChange = (event) => {
    setFormData({ ...formData, title: event.currentTarget.value });
  };

  const handleFormDescriptionChange = (event) => {
    setFormData({ ...formData, description: event.currentTarget.value });
  };

  const handleButtonSubmitClick = async (event) => {
    if (formData.title !== '' && formData.description !== '') {
      event.preventDefault();

      const toastOptions = {
        position: 'top-center',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      };

      try {
        const status = await apiPostSupportRequest(formData);

        if (status === 201) {
          toast.success('Solicitação de suporte enviada com sucesso!', toastOptions);
        } else throw new Error('Falha ao enviar solicitação de suporte! Erro status: ' + status);
      } catch (error) {
        toast.error('Falha ao enviar solicitação de suporte!', toastOptions);
      }

      handleButtonClearClick();
    }
  };

  const handleButtonClearClick = () => {
    setFormData({
      ...formData,
      title: '',
      description: '',
    });
  };

  let mainJsx = (
    <div className="flex justify-center my-4">
      <Loading />
    </div>
  );

  if (!loading) {
    mainJsx = (
      <form className="flex flex-col w-full py-4 px-8 mt-8 max-w-2xl lg:max-w-4xl bg-gray-200 rounded-lg shadow-md">
        <h4 className="text-xl text-center font-semibold pb-2 mb-8 border-b-2 border-gray-300">
          Formulário de Solicitação de Suporte
        </h4>
        <Input
          id="title"
          type="text"
          labelName="Título"
          textPlaceHolder="Insira o título da solicitação"
          onChangeValue={handleFormTitleChange}
          inputValue={formData.title}
        />
        <div className="flex flex-col lg:flex-row items-start lg:items-center space-y-8 lg:space-y-0 lg:justify-between mt-4 mb-8">
          <Select
            labelDescription="Categoria de Suporte"
            onChangeValue={handleSelectedCategoryChange}
            selectedValue={selectedCategory}
          >
            {[
              { id: 'op1', description: 'Produtos' },
              { id: 'op2', description: 'Serviços' },
            ]}
          </Select>
          <Select
            labelDescription="Nome do Produto / Serviço"
            onChangeValue={handleFormSelectedProductServiceChange}
            selectedValue={formData.sel_product_service_id}
          >
            {selectedCategory === 'op1' ? products : services}
          </Select>
        </div>
        <label htmlFor="description" className="font-semibold">
          Descrição
        </label>
        <textarea
          id="description"
          name="description"
          rows="5"
          required
          placeholder="Insira a descrição da solicitação"
          className="mt-2 mb-4 p-2 block w-full rounded-md bg-gray-50"
          onChange={handleFormDescriptionChange}
          value={formData.description}
        />
        <div className="flex flex-row justify-end space-x-4 mt-4">
          <input
            type="button"
            onClick={handleButtonClearClick}
            className="font-semibold py-2 px-4 w-min rounded-md bg-red-100 shadow-md hover:cursor-pointer hover:text-red-500 hover:scale-105"
            value="Limpar"
          />
          <input
            type="submit"
            onClick={handleButtonSubmitClick}
            className="font-semibold py-2 px-4 w-min rounded-md bg-yellow-100 shadow-md hover:cursor-pointer hover:text-yellow-500 hover:scale-105"
            value="Enviar"
          />
        </div>
      </form>
    );
  }

  return (
    <div className="flex flex-col space-y-2 p-4 mx-auto items-center">
      <h3 className="text-center font-semibold mb-6">Suporte do Portal para Desenvolvedores</h3>
      {mainJsx}
      <ToastContainer />
    </div>
  );
}
