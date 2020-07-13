const axios = require('axios');
const { HAPIKEY } = process.env;

const hs = axios.create({
  baseURL: 'https://api.hubapi.com',
});

hs.interceptors.request.use(config => {
  config.params = config.params || {};
  config.params.hapikey = HAPIKEY;
  return config;
});

module.exports = hs;
