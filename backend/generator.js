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

const PRODUCT_FILE_FOLDER = 'C:\\proj-sw-dev\\igti\\pa-fst\\react-developers-portal\\frontend\\public\\files\\products';

const FILE_CATEGORIES = ['Documentação', 'Recurso de Desenvolvimento', 'Atualizador', 'Outros'];

const FILE_EXTS = ['pdf', 'zip', 'zip', 'pdf'];

/**
 * Fonte: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random#getting_a_random_integer_between_two_values_inclusive
 */
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

async function start() {
  const products = [];

  for (let i = 0; i < 6; i++) {
    const product = `product${i + 1}`;
    const productCategoryNumber = getRandomNumber(0, PRODUCT_CATEGORIES.length - 1);
    const productCategory = PRODUCT_CATEGORIES[productCategoryNumber];
    const productName = `${productCategory} ${i + 1}`;

    products.push({
      id: uuid(),
      name: productName,
      description: `Descrição de ${productName}.`,
      category: productCategory,
      model: '',
      image: `${PRODUCT_IMAGES[productCategoryNumber]}.png`,
      firmare_versions: [],
      files: [],
    });

    for (let j = 0; j < 3; j++) {
      const file = `file${j + 1}`;
      const fileCategoryNumber = getRandomNumber(0, FILE_CATEGORIES.length - 1);
      const fileCategory = FILE_CATEGORIES[fileCategoryNumber];
      const fileExt = FILE_EXTS[fileCategoryNumber];
      const fileName = `Arquivo ${j + 1}`;
      const numberOfVersions = getRandomNumber(1, 3);

      for (let k = 0; k < numberOfVersions; k++) {
        const versionCode = k + 1;
        const versionName = 'v' + versionCode;
        const fileNameWithVersion = `Arquivo ${j + 1} - ${versionName}`;
        const fileArchiveName = `${product}-${file}-${versionName}.${fileExt}`;

        fs.writeFile(PRODUCT_FILE_FOLDER + '/' + fileArchiveName, 'Dummy file');

        products[i].files.push({
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

start();
