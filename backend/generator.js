const fs = require('fs').promises;
const uuid = require('uuid').v4;

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

const PRODUCT_FILE_FOLDER = 'C:\\proj-sw-dev\\igti\\pa-fst\\react-developers-portal\\frontend\\public\\files\\products';

const FILE_CATEGORIES = ['Documentação', 'Recurso de Desenvolvimento', 'Atualização', 'Outros'];

const FILE_NAMES = [
  ['Manual', 'Guia-do-usuário', 'Datasheet'],
  ['SDK', 'Drivers', 'Exemplos-de-uso', 'Apps-demo', 'Tools', 'Image-pack'],
  ['Atualizador', 'Patcher', 'Hotfix'],
  ['Catálogo', 'Norma-A', 'Norma-B', 'Certificação'],
];

const FILE_EXTS = ['pdf', 'zip', 'zip', 'pdf'];

/**
 * Fonte: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random#getting_a_random_integer_between_two_values_inclusive
 */
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

async function start() {
  const products = [];

  // Generate products
  for (let i = 0; i < 10; i++) {
    const product = `product${i + 1}`;
    const productCategoryNumber = getRandomNumber(0, PRODUCT_CATEGORIES.length - 1);
    const productCategory = PRODUCT_CATEGORIES[productCategoryNumber];
    const productName = `${productCategory} - ${i + 1}`;
    const productModelNumber = getRandomNumber(0, PRODUCT_MODELS.length - 1);
    const productModel = PRODUCT_MODELS[productModelNumber];

    products.push({
      id: uuid(),
      name: productName,
      description: `Essa seção é dedicada à descrição do produto ${productName}.`,
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
    const currFileNamesMatrix = FILE_NAMES.map((row) => [...row]);

    // Generate random amount of categories with no repetition (from 0 to array length - 1)
    const currFileCategoryNumberList = randomPicksFromArrayNoRepetition([...Array(FILE_CATEGORIES.length).keys()]);
    // for (let j = 0; j < 3; j++) {
    for (let j = 0; j < currFileCategoryNumberList.length; j++) {
      const file = `file${j + 1}`;
      // const fileCategoryNumber = getRandomNumber(0, FILE_CATEGORIES.length - 1);
      const fileCategoryNumber = currFileCategoryNumberList[j];
      const fileCategory = FILE_CATEGORIES[fileCategoryNumber];
      const fileExt = FILE_EXTS[fileCategoryNumber];

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

  fs.writeFile(
    './api.json',
    JSON.stringify(
      {
        products,
      },
      null,
      2
    )
  );

  // const candidates = [];
  // const cities = [];
  // const election = [];
  // for (const candidate of CANDIDATE_NAMES) {
  //   candidates.push({
  //     id: uuid(),
  //     name: candidate,
  //     username: candidate.toLowerCase(),
  //   });
  // }
  // for (const city of CITY_NAMES) {
  //   const votingPopulation = getRandomNumber(1_000_000, 2_000_000);
  //   // prettier-ignore
  //   const absence =
  //     Math.floor((votingPopulation * getRandomNumber(5, 10)) / 100);
  //   const presence = votingPopulation - absence;
  //   cities.push({
  //     id: uuid(),
  //     name: city,
  //     votingPopulation,
  //     absence,
  //     presence,
  //   });
  // }
  // for (const city of cities) {
  //   let remainingVotes = city.presence;
  //   for (const candidate of candidates) {
  //     const willRunElection = getRandomNumber(1, 2) === 2;
  //     if (!willRunElection) {
  //       continue;
  //     }
  //     const percentage = getRandomNumber(10, 20) / 100;
  //     const votes = Math.floor(remainingVotes * percentage);
  //     remainingVotes -= Math.max(0, votes);
  //     election.push({
  //       id: uuid(),
  //       cityId: city.id,
  //       candidateId: candidate.id,
  //       votes,
  //     });
  //   }
  //   election[election.length - 1].votes += remainingVotes;
  //   // cities.push({
  //   //   id: uuid(),
  //   //   city: { name: city, votingPopulation, absence },
  //   //   candidates,
  //   // });
  // }
  // // for (const city of cities) {
  // //   console.log(city.city.votingPopulation - city.city.absence);
  // //   console.log(city.candidates.reduce((ac, { votes }) => ac + votes, 0));
  // // }
  // fs.writeFile(
  //   './api.json',
  //   JSON.stringify(
  //     {
  //       cities: cities.sort((a, b) => a.id.localeCompare(b.id)),
  //       candidates: candidates.sort((a, b) => a.id.localeCompare(b.id)),
  //       election: election.sort((a, b) => a.id.localeCompare(b.id)),
  //     },
  //     null,
  //     2
  //   )
  // );
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

start();
