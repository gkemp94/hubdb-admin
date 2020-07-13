// Parses Out and Provides Helper Functions for Configuration
const fs = require('fs');
const keyBy = require('lodash/keyBy')
const yaml = require('js-yaml');
const file = fs.readFileSync('./config.yml', 'utf8');
const config = yaml.safeLoad(file);

const tablesByTableId = keyBy(config.tables, 'tableId');

const isTableInConfig = (tableId) => {
  return !!tablesByTableId[tableId];
};

const getTableById = tableId => {
  return tablesByTableId[tableId];
}

module.exports = {
  isTableInConfig,
  getTableById,
}
