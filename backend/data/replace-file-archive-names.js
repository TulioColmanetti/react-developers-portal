const fs = require('fs').promises;

const products = require('./export-products');
const services = require('./export-services');

const replacedProducts = products.map((product) => {
  const files = product.files.map((file) => {
    file.archive_name = 'product-file.' + file.extension;
    return file;
  });
  return { ...product, files };
});

fs.writeFile('./products-replaced.json', JSON.stringify(replacedProducts, null, 2));

const replacedServices = services.map((service) => {
  const files = service.files.map((file) => {
    file.archive_name = 'service-file.' + file.extension;
    return file;
  });
  return { ...service, files };
});

fs.writeFile('./services-replaced.json', JSON.stringify(replacedServices, null, 2));
