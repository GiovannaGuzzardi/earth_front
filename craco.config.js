module.exports = {
    plugins: [
      {
        plugin: require('craco-less'),
        options: {
          lessLoaderOptions: {
            lessOptions: {
              modifyVars: { '@primary-color': '#5800cc' }, // Define a cor primária
              javascriptEnabled: true,
            },
          },
        },
      },
    ],
  };
  