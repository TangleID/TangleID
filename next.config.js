const dotenv = require('dotenv');
const webpack = require('webpack');

const customEnvironments = dotenv.config().parsed;

const defaultEnvironments = {
  IRI_HOST: 'http://node2.puyuma.org:8000',
  SWARM_HOST: 'http://node2.puyuma.org:8000',
  API_HOST: 'http://localhost:3000/api',
};

// Merge with default environments
const environments = Object.assign(defaultEnvironments, customEnvironments);
// Set environments to 'process.env'
process.env = Object.assign(process.env, environments);

module.exports = {
  webpack: (config) => {
    const environmentPlugin = new webpack.EnvironmentPlugin(environments);
    config.plugins.push(environmentPlugin);

    return config;
  },
};
