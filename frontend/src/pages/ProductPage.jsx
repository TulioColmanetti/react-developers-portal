import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AiOutlineFilePdf as FilePdfIcon } from 'react-icons/ai';
import { AiOutlineFileZip as FileZipIcon } from 'react-icons/ai';
import { AiOutlineFileUnknown as FileUnknownIcon } from 'react-icons/ai';
import Collapsible from 'react-collapsible';
import { BsChevronDown } from 'react-icons/bs';

import Loading from '../components/Loading';
import Error from '../components/Error';
import { apiGetProductFrom } from '../services/apiService';
import Select from '../components/Select';

const PRODUCT_FILES_FOLDER = '/files/products/';
const PRODUCT_IMAGES_FOLDER = '/img/products/';

export default function ProductPage() {
  const { id: productId } = useParams();
  const [product, setProduct] = useState(null);
  const [filteredProduct, setFilteredProduct] = useState(null);
  const [selectedFirmwareVersion, setSelectedFirmwareVersion] = useState('');
  const [selectedFilesVersion, setSelectedFilesVersion] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function getProduct() {
      try {
        const apiProduct = await apiGetProductFrom(productId);
        // .sort((a, b) => a.name.localeCompare(b.name));

        if (apiProduct && apiProduct.length > 0) {
          const currentProduct = apiProduct[0];
          setProduct(currentProduct);
          setFilteredProduct(Object.assign({}, currentProduct));
          setSelectedFirmwareVersion(currentProduct.firmare_versions[0]);
          // op1 = "Todas"
          setSelectedFilesVersion('op1');
        } else setError('Produto não encontrado!');

        setTimeout(() => {
          setLoading(false);
        }, 500);
      } catch (error) {
        setLoading(false);
        setError(error.message);
      }
    }

    getProduct();
  }, [productId]);

  useEffect(() => {
    async function getProductWithFilteredFiles() {
      if (selectedFirmwareVersion) {
        const productWithFilteredFiles = Object.assign({}, product);
        const arrayOfProductFiles = Object.assign([], product.files);

        // Filter files by firmware version
        const arrayOfFilteredFilesByFirmwareVersion = arrayOfProductFiles.filter((file) =>
          file.firmare_effectivity.includes(selectedFirmwareVersion)
        );

        // Filter files by file version (op2 = "Mais recente")
        if (selectedFilesVersion === 'op2') {
          const groupBy = function (xs, key) {
            return xs.reduce(function (rv, x) {
              (rv[x[key]] = rv[x[key]] || []).push(x);
              return rv;
            }, {});
          };

          const arrayOfGroupedFilesByName = groupBy(arrayOfFilteredFilesByFirmwareVersion, 'name');
          const arrayOfFilteredFilesByFileVersion = [];

          for (const [, value] of Object.entries(arrayOfGroupedFilesByName)) {
            const max = value.reduce(function (prev, current) {
              return prev.version_code > current.version_code ? prev : current;
            });
            arrayOfFilteredFilesByFileVersion.push(max);
          }

          productWithFilteredFiles.files = arrayOfFilteredFilesByFileVersion;
        } else {
          productWithFilteredFiles.files = arrayOfFilteredFilesByFirmwareVersion;
        }

        setFilteredProduct(productWithFilteredFiles);
      }
    }

    getProductWithFilteredFiles();
  }, [selectedFirmwareVersion, selectedFilesVersion, product]);

  const handleFirmwareVersionChange = (newSelectedFirmwareVersion) => {
    setSelectedFirmwareVersion(newSelectedFirmwareVersion);
  };

  const handleFilesVersionChange = (newSelectedFilesVersion) => {
    setSelectedFilesVersion(newSelectedFilesVersion);
  };

  let mainJsx = (
    <div className="flex justify-center my-4">
      <Loading />
    </div>
  );

  if (error) {
    mainJsx = <Error>{error}</Error>;
  }

  if (!loading && !error) {
    mainJsx = (
      <>
        <h3 className="text-center font-semibold mb-6">{filteredProduct.name}</h3>
        <div className="max-w-2xl mx-auto p-4 bg-gray-200 rounded-lg shadow-md">
          <div className="flex flex-row mx-auto items-center space-x-2 mb-2">
            <img src={PRODUCT_IMAGES_FOLDER + filteredProduct.image} alt="" className="h-48 m-2" />
            <div className="flex flex-col space-y-4 p-2">
              <p>{filteredProduct.description}</p>
              <p>
                <span className="font-semibold">Categoria: </span>
                {filteredProduct.category}
              </p>
              <p>
                <span className="font-semibold">Modelo: </span>
                {filteredProduct.model}
              </p>
              <Select
                labelDescription="Versão de Firmware: "
                onChangeValue={handleFirmwareVersionChange}
                selectedValue={selectedFirmwareVersion}
              >
                {filteredProduct.firmare_versions.map((firm) => {
                  return { id: firm, description: firm };
                })}
              </Select>
              <Select
                labelDescription="Versão dos Arquivos: "
                onChangeValue={handleFilesVersionChange}
                selectedValue={selectedFilesVersion}
              >
                {[
                  { id: 'op1', description: 'Todas' },
                  { id: 'op2', description: 'Mais recente' },
                ]}
              </Select>
            </div>
          </div>
          <div className="flex flex-col space-y-2">
            <Collapsible
              trigger={
                <>
                  <p className="font-semibold">Arquivos</p>
                  <BsChevronDown size="1.1rem" />
                </>
              }
              transitionTime="200"
              triggerClassName="flex flex-row p-2 items-center justify-between bg-yellow-100 rounded-lg shadow-md"
              triggerOpenedClassName="flex flex-row p-2 items-center justify-between bg-yellow-100 rounded-t-lg"
              // contentOuterClassName="border border-black"
              contentInnerClassName="p-2 rounded-b-lg bg-gray-100"
              contentOuterClassName="shadow-md"
            >
              <div className="grid grid-cols-5 gap-4 mx-auto">
                {filteredProduct.files.map(({ id, name_with_version, archive_name, extension }) => {
                  return (
                    <a
                      key={id}
                      href={PRODUCT_FILES_FOLDER + archive_name}
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
          </div>
        </div>
      </>
    );
  }

  return <div className="flex flex-col space-y-2 p-4">{mainJsx}</div>;
}
