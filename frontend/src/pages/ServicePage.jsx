import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { apiGetServiceFrom } from '../services/apiService';
import Loading from '../components/utils/Loading';
import Error from '../components/utils/Error';
import ServiceTitle from '../components/services/ServiceTitle';
import ServiceCard from '../components/services/ServiceCard';
import ServiceHeader from '../components/services/ServiceHeader';
import ServiceImage from '../components/services/ServiceImage';
import ServiceDetailsContainer from '../components/services/ServiceDetailsContainer';
import ServiceInfo from '../components/services/ServiceInfo';
import Select from '../components/utils/Select';
import FilesCollapsibleContainer from '../components/utils/FilesCollapsibleContainer';
import FilesCollapsible from '../components/utils/FilesCollapsible';
import IframeCollapsible from '../components/utils/IframeCollapsible';

const SERVICE_FILES_FOLDER = '/files/services/';

export default function ServicePage() {
  const { id: serviceId } = useParams();
  const [service, setService] = useState(null);
  const [filteredService, setFilteredService] = useState(null);
  const [selectedFilesVersion, setSelectedFilesVersion] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function getService() {
      try {
        const apiService = await apiGetServiceFrom(serviceId);
        // .sort((a, b) => a.name.localeCompare(b.name));

        if (apiService) {
          const currentService = apiService;
          setService(currentService);
          setFilteredService(Object.assign({}, currentService));
          // op1 = "Todas"
          setSelectedFilesVersion('op1');
        } else setError('Serviço não encontrado!');
      } catch (error) {
        setError(error.message);
      }

      setLoading(false);
    }

    getService();
  }, [serviceId]);

  useEffect(() => {
    async function getServiceWithFilteredFiles() {
      if (service) {
        const serviceWithFilteredFiles = Object.assign({}, service);
        const arrayOfServiceFiles = Object.assign([], service.files);

        // Filter files by file version (op2 = "Mais recente")
        if (selectedFilesVersion === 'op2') {
          const groupBy = function (xs, key) {
            return xs.reduce(function (rv, x) {
              (rv[x[key]] = rv[x[key]] || []).push(x);
              return rv;
            }, {});
          };

          const arrayOfGroupedFilesByName = groupBy(arrayOfServiceFiles, 'name');
          const arrayOfFilteredFilesByFileVersion = [];

          for (const [, value] of Object.entries(arrayOfGroupedFilesByName)) {
            const max = value.reduce(function (prev, current) {
              return prev.version_code > current.version_code ? prev : current;
            });
            arrayOfFilteredFilesByFileVersion.push(max);
          }

          serviceWithFilteredFiles.files = arrayOfFilteredFilesByFileVersion;
        }

        setFilteredService(serviceWithFilteredFiles);
      }
    }

    getServiceWithFilteredFiles();
  }, [selectedFilesVersion, service]);

  const handleFilesVersionChange = (newSelectedFilesVersion) => {
    setSelectedFilesVersion(newSelectedFilesVersion);
  };

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
      <ServiceCard>
        <ServiceTitle title={filteredService.name} />
        <ServiceHeader>
          <ServiceImage image={filteredService.image} />
          <ServiceDetailsContainer>
            <ServiceInfo product={filteredService} />
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
          </ServiceDetailsContainer>
        </ServiceHeader>
        <FilesCollapsibleContainer>
          <FilesCollapsible triggerTitleName="Documentação" filesFolder={SERVICE_FILES_FOLDER}>
            {filteredService.files.filter((file) => file.category === 'Documentação')}
          </FilesCollapsible>
          <FilesCollapsible triggerTitleName="Recursos de Desenvolvimento" filesFolder={SERVICE_FILES_FOLDER}>
            {filteredService.files.filter((file) => file.category === 'Recursos de Desenvolvimento')}
          </FilesCollapsible>
          <IframeCollapsible
            triggerTitleName={'Área de Testes com ' + filteredService.test.type}
            iframeSrcUrl={filteredService.test.link}
          />
        </FilesCollapsibleContainer>
      </ServiceCard>
    );
  }

  return <>{mainJsx}</>;
}
