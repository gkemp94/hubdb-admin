const hs = require('../utils/hubspot');
const pick = require('lodash/pick');

const list = async () => {
  const { data } = await hs.get('/cms/v3/hubdb/tables');
  return data.results.map(table => pick(table, ['id', 'name']))
};

const get = async (tableId) => {
  const { data } = await hs.get(`/cms/v3/hubdb/tables/${tableId}`);
  return data;
};

const getRows = async (tableId) => {
  const { data } = await hs.get(`/cms/v3/hubdb/tables/${tableId}/rows`);
  return data;
};

const getRow = async (tableId, rowId) => {
  const { data } = await hs.get(`/cms/v3/hubdb/tables/${tableId}/rows/${rowId}`);
  return data;
};

const putRow = async (tableId, rowId, body) => {
  const { data } = await hs.put(`/cms/v3/hubdb/tables/${tableId}/rows/${rowId}/draft`, body);
  return true;
}

const publish = async (tableId) => {
  await hs.post(`/cms/v3/hubdb/tables/${tableId}/draft/push-live`, {});
}

module.exports = {
  list,
  get,
  publish,

  // Rows
  getRows,
  getRow,
  putRow,
};
