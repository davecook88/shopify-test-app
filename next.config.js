require('dotenv');

const Webpack = require('webpack');
const apiKey = JSON.stringify(process.env.SHOPIFY_API_KEY);

module.exports = {
  webpack:(config) => {
    const env = { API_KEY: apiKey };
    config.plugins.push(new Webpack.DefinePlugin(env));
    return config;
  }
}