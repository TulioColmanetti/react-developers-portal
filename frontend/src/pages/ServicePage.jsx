import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Collapsible from 'react-collapsible';
import { BsChevronDown } from 'react-icons/bs';

import { apiGetServiceFrom } from '../services/apiService';
import Loading from '../components/utils/Loading';
import Error from '../components/utils/Error';

export default function ServicePage() {
  const { id: serviceId } = useParams();
  // const [product, setProduct] = useState(null);
  // const [filteredProduct, setFilteredProduct] = useState(null);
  // const [selectedFirmwareVersion, setSelectedFirmwareVersion] = useState('');
  // const [selectedFilesVersion, setSelectedFilesVersion] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function getService() {
      try {
        const apiService = await apiGetServiceFrom(serviceId);
        // .sort((a, b) => a.name.localeCompare(b.name));

        if (apiService && apiService.length > 0) {
          // const currentProduct = apiService[0];
          // setProduct(currentProduct);
          // setFilteredProduct(Object.assign({}, currentProduct));
          // setSelectedFirmwareVersion(currentProduct.firmare_versions[0]);
          // // op1 = "Todas"
          // setSelectedFilesVersion('op1');
        } else setError('Serviço não encontrado!');
      } catch (error) {
        setError(error.message);
      }

      setLoading(false);
    }

    getService();
  }, [serviceId]);

  let mainJsx = (
    <div className="flex justify-center my-4">
      <Loading />
    </div>
  );

  if (error) {
    mainJsx = (
      <div className="flex justify-center my-4">
        <Error>{error}</Error>
      </div>
    );
  }

  if (!loading && !error) {
    mainJsx = (
      <div className="w-full lg:w-3/5 mx-auto">
        <Collapsible
          trigger={
            <>
              <p className="font-semibold">Swagger Collapsible</p>
              <BsChevronDown size="1.1rem" />
            </>
          }
          transitionTime="200"
          triggerClassName="flex flex-row p-2 items-center justify-between bg-yellow-100 rounded-lg shadow-md"
          triggerOpenedClassName="flex flex-row p-2 items-center justify-between bg-yellow-100 rounded-t-lg"
          contentInnerClassName="p-2 rounded-b-lg bg-gray-100"
          contentOuterClassName="shadow-md"
        >
          <iframe
            src="https://petstore.swagger.io/"
            name="iframe_a"
            className="h-screen w-full"
            // style={{ border: 'none', height: '480px', width: '640px' }}
            title="Iframe Example"
          ></iframe>
        </Collapsible>
      </div>
    );
  }

  return <>{mainJsx}</>;

  /* <p>
    <a href="https://petstore.swagger.io/" target="iframe_a">
      Swagger
    </a>
  </p> */
  /* <iframe
    src="demo.htm"
    name="iframe_a"
    className="h-screen rounded-lg shadow-lg"
    // style={{ border: 'none', height: '480px', width: '640px' }}
    title="Iframe Example"
  ></iframe> */
  /* <iframe src="https://www.youtube.com/embed/cWDJoK8zw58" sandbox="" /> */
  /* <iframe src="https://www.youtube.com/embed/cWDJoK8zw58" /> */
}
