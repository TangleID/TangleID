const dotenv = require('dotenv');
const webpack = require('webpack');

const customEnvironments = dotenv.config().parsed;

module.exports = {
  webpack: (config) => {
    const environmentPlugin = new webpack.EnvironmentPlugin(customEnvironments);
    config.plugins.push(environmentPlugin);

    return config;
  },
};
