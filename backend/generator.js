const fs = require('fs').promises;
const uuid = require('uuid').v4;

//---------------- Common constants ----------------//

const FILE_FOLDER = 'C:\\proj-sw-dev\\igti\\pa-fst\\react-developers-portal\\frontend\\public\\files\\';

const ALPHABET_CHAR_CODES = Array.from(Array(26)).map((e, i) => i + 65);
const ALPHABET = ALPHABET_CHAR_CODES.map((x) => String.fromCharCode(x));

//---------------- Products constants ----------------//

const PRODUCT_CATEGORIES = [
  'Smartphone',
  'Smart TV',
  'Smartwatch',
  'Impressora',
  'Impressora 3D',
  'Pinpad',
  'Maquininha de Pagamento (POS)',
];

const PRODUCT_IMAGES = [
  'smartphone-image',
  'smart-tv-image',
  'smartwatch-image',
  'printer-image',
  '3d-printer-image',
  'pinpad-image',
  'pos-image',
];

const PRODUCT_MODELS = [
  'PTX-200',
  'ABZ-5000',
  'Q-SERIES-72',
  'W-SERIES-16',
  'KING-A-100',
  'HJ420',
  'PLZ890',
  '4500-A',
  '4500-B',
  '4500-C',
  'T-2',
  'X-3',
  'U-7',
  'F-4',
  'XPTO-9000',
  'VBM-293',
  'KAJF-141',
  'MBRW-318',
  '832-HZ',
  '192-EX',
  '028-UNW',
  'M23A',
  'OPW291JF',
  'MIL9234',
  'N98C37',
];

const PRODUCT_FIRMWARES = [
  'FW-20220114-A',
  'FW-20200222-B',
  'FW-20101201-A',
  'FW-20150809-C',
  'FW-20180625-D',
  'FW-20170923-E',
  'FW-20170229-C',
  'FW-20170704-D',
  'FW-20170311-B',
];

const PRODUCT_FILE_FOLDER = FILE_FOLDER + 'products';

const PRODUCT_FILE_CATEGORIES = ['Documentação', 'Recursos de Desenvolvimento', 'Atualização', 'Outros'];

const PRODUCT_FILE_NAMES = [
  ['Manual', 'Guia-do-usuário', 'Datasheet'],
  ['SDK', 'Drivers', 'Exemplos-de-uso', 'Apps-demo', 'Tools', 'Image-pack'],
  ['Atualizador', 'Patcher', 'Hotfix'],
  ['Catálogo', 'Norma-A', 'Norma-B', 'Certificação'],
];

const PRODUCT_FILE_EXTS = ['pdf', 'zip', 'zip', 'pdf'];

//---------------- Services constants ----------------//

const SERVICE_CATEGORIES = [
  'Processamento de Arquivos',
  'Consulta de Dados',
  'Coleta de Dados de Produto',
  'Teste de Aplicativos',
];

const SERVICE_IMAGES = ['smartphone-image', 'smart-tv-image', 'smartwatch-image', 'printer-image'];

const SERVICE_FILE_FOLDER = FILE_FOLDER + 'services';

const SERVICE_FILE_CATEGORIES = ['Documentação', 'Recursos de Desenvolvimento'];

const SERVICE_FILE_NAMES = [
  ['Manual', 'Guia-do-usuário'],
  ['Postman-Collection', 'Insomnia-Collection', 'Paw-Project'],
];

const SERVICE_FILE_EXTS = ['pdf', 'zip'];

const SERVICE_DOC_TYPE = ['Swagger'];

const SERVICE_DOC_LINK = ['https://petstore.swagger.io/'];

//---------------- Products implementation ----------------//

function generateProducts() {
  const products = [];

  // Generate products
  for (let i = 0; i < 20; i++) {
    const product = `product${i + 1}`;
    const productCategoryNumber = getRandomNumber(0, PRODUCT_CATEGORIES.length - 1);
    const productCategory = PRODUCT_CATEGORIES[productCategoryNumber];
    const productName = `${productCategory} - ${i + 1}`;
    const productModelNumber = getRandomNumber(0, PRODUCT_MODELS.length - 1);
    const productModel = PRODUCT_MODELS[productModelNumber];

    products.push({
      id: uuid(),
      name: productName,
      description: `Esta página contém todos os recursos necessários ao desenvolvimento e/ou integração de aplicações com o produto ${productName}.`,
      category: productCategory,
      model: productModel,
      image: `${PRODUCT_IMAGES[productCategoryNumber]}.png`,
      firmare_versions: [],
      files: [],
    });

    // Generate firmwares for products
    const currFirmwareArray = randomPicksFromArrayNoRepetition(PRODUCT_FIRMWARES);
    products[i].firmare_versions = currFirmwareArray;

    // Generate files for products
    const currFileNamesMatrix = PRODUCT_FILE_NAMES.map((row) => [...row]);

    // Generate random amount of categories with no repetition (from 0 to array length - 1)
    // const currFileCategoryNumberList = randomPicksFromArrayNoRepetition([...Array(PRODUCT_FILE_CATEGORIES.length).keys()]);
    // Generate index list with all categories and no repetition (from 0 to array length - 1)
    const currFileCategoryNumberList = [...Array(PRODUCT_FILE_CATEGORIES.length).keys()];
    // for (let j = 0; j < 3; j++) {
    for (let j = 0; j < currFileCategoryNumberList.length; j++) {
      const file = `file${j + 1}`;
      // const fileCategoryNumber = getRandomNumber(0, PRODUCT_FILE_CATEGORIES.length - 1);
      const fileCategoryNumber = currFileCategoryNumberList[j];
      const fileCategory = PRODUCT_FILE_CATEGORIES[fileCategoryNumber];
      const fileExt = PRODUCT_FILE_EXTS[fileCategoryNumber];

      // Generate random amount of files of chosen category with no repetition (from 0 to array length - 1)
      const currFileNameNumberList = randomPicksFromArrayNoRepetition([
        ...Array(currFileNamesMatrix[fileCategoryNumber].length).keys(),
      ]);
      for (let k = 0; k < currFileNameNumberList.length; k++) {
        // const fileNameNumber = getRandomNumber(0, currFileNamesMatrix[fileCategoryNumber].length - 1);
        const fileNameNumber = currFileNameNumberList[k];
        const fileName = currFileNamesMatrix[fileCategoryNumber][fileNameNumber];
        // currFileNamesMatrix[fileCategoryNumber].splice(fileNameNumber, 1);

        const numberOfVersions = getRandomNumber(1, 3);

        // Generate versions for files
        // for (let l = 0; l < numberOfVersions; l++) {
        for (let l = numberOfVersions - 1; l >= 0; l--) {
          const versionCode = l + 1;
          const versionName = 'v' + versionCode + '.0';
          const fileNameWithVersion = `${fileName}-${versionName}`;
          const fileArchiveName = `${product}-${file}-${versionName}.${fileExt}`;

          const firmareEffectivity = randomPicksFromArrayNoRepetition(currFirmwareArray);

          fs.writeFile(PRODUCT_FILE_FOLDER + '/' + fileArchiveName, 'Dummy file');

          products[i].files.push({
            id: uuid(),
            name: fileName,
            category: fileCategory,
            version_name: versionName,
            version_code: versionCode,
            firmare_effectivity: firmareEffectivity,
            name_with_version: fileNameWithVersion,
            extension: fileExt,
            archive_name: fileArchiveName,
            url: `/${fileArchiveName}`,
          });
        }
      }
    }
  }

  return products;
}

//---------------- Services implementation ----------------//

function generateServices() {
  const services = [];

  // Generate services
  for (let i = 0; i < 10; i++) {
    const service = `service${i + 1}`;
    const serviceCategoryNumber = getRandomNumber(0, SERVICE_CATEGORIES.length - 1);
    const serviceCategory = SERVICE_CATEGORIES[serviceCategoryNumber];
    const serviceName = `${serviceCategory} - ${ALPHABET[i]}`;

    services.push({
      id: uuid(),
      name: serviceName,
      description: `Esta página contém todos os recursos necessários ao desenvolvimento e/ou integração de aplicações com o serviço de ${serviceName}.`,
      category: serviceCategory,
      image: `${SERVICE_IMAGES[serviceCategoryNumber]}.png`,
      documentation: { type: SERVICE_DOC_TYPE[0], link: SERVICE_DOC_LINK[0] },
      files: [],
    });

    // Generate files for services
    const currFileNamesMatrix = SERVICE_FILE_NAMES.map((row) => [...row]);

    // Generate index list with all categories and no repetition (from 0 to array length - 1)
    const currFileCategoryNumberList = [...Array(SERVICE_FILE_CATEGORIES.length).keys()];

    for (let j = 0; j < currFileCategoryNumberList.length; j++) {
      const file = `file${j + 1}`;
      const fileCategoryNumber = currFileCategoryNumberList[j];
      const fileCategory = SERVICE_FILE_CATEGORIES[fileCategoryNumber];
      const fileExt = SERVICE_FILE_EXTS[fileCategoryNumber];

      // Generate random amount of files of chosen category with no repetition (from 0 to array length - 1)
      const currFileNameNumberList = randomPicksFromArrayNoRepetition([
        ...Array(currFileNamesMatrix[fileCategoryNumber].length).keys(),
      ]);
      for (let k = 0; k < currFileNameNumberList.length; k++) {
        const fileNameNumber = currFileNameNumberList[k];
        const fileName = currFileNamesMatrix[fileCategoryNumber][fileNameNumber];

        const numberOfVersions = getRandomNumber(1, 3);

        // Generate versions for files
        for (let l = numberOfVersions - 1; l >= 0; l--) {
          const versionCode = l + 1;
          const versionName = 'v' + versionCode + '.0';
          const fileNameWithVersion = `${fileName}-${versionName}`;
          const fileArchiveName = `${service}-${file}-${versionName}.${fileExt}`;

          fs.writeFile(SERVICE_FILE_FOLDER + '/' + fileArchiveName, 'Dummy file');

          services[i].files.push({
            id: uuid(),
            name: fileName,
            category: fileCategory,
            version_name: versionName,
            version_code: versionCode,
            name_with_version: fileNameWithVersion,
            extension: fileExt,
            archive_name: fileArchiveName,
            url: `/${fileArchiveName}`,
          });
        }
      }
    }
  }

  return services;
}

//---------------- Common implementation ----------------//

/**
 * Fonte: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random#getting_a_random_integer_between_two_values_inclusive
 */
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomPicksFromArrayNoRepetition(array) {
  const copyArray = Object.assign([], array);
  const numberOfPicks = getRandomNumber(1, copyArray.length);
  const newArray = [];

  for (let i = 0; i < numberOfPicks; i++) {
    const randomIndex = getRandomNumber(0, copyArray.length - 1);
    newArray.push(copyArray[randomIndex]);
    copyArray.splice(randomIndex, 1);
  }

  return newArray;
}

function start() {
  fs.writeFile(
    './api.json',
    JSON.stringify(
      {
        products: generateProducts(),
        services: generateServices(),
      },
      null,
      2
    )
  );
}

start();
