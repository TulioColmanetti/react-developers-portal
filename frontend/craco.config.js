// craco.config.js
// https://tailwindcss.com/docs/guides/create-react-app
module.exports = {
  style: {
    postOptions: {
      plugins: [require('tailwindcss'), require('autoprefixer')],
    },
  },
};
