// Load Configuration

const { tables } = require('../models');
const { isTableInConfig, getTableById } = require('../utils/config');

const getTables = async (_, res) => {
  const items = await tables.list();
  const filteredItems = items.filter(({ id }) => isTableInConfig(id)).map(table => {
    console.log(table);
    return {
      ...table,
      name: getTableById(table.id).name || table.name,
    };
  })
  res.send(filteredItems);
};

const getTable = async (req, res) => {
  const { tableId } = req.params;
  const data = await tables.get(tableId);
  res.status(200).send(data);
}

const getRows = async (req, res) => {
  const { tableId } = req.params;
  const data = await tables.getRows(tableId);
  const { primaryKey } = getTableById(tableId);
  data.results = data.results.map((row) => {
    return {
      ...row,
      name: row.values[primaryKey],
    }
  })
  res.status(200).send(data);
};

const getRow = async (req, res) => {
  const { tableId, rowId } = req.params;
  const data = await tables.getRow(tableId, rowId);
  res.status(200).send(data);
}

const updateRow = async (req, res) => {
  const { tableId, rowId } = req.params;
  await tables.putRow(tableId, rowId, req.body);
  await tables.publish(tableId);
  res.status(200).send();
}

module.exports = {
  getTables,
  getTable,

  // Rows
  getRows,
  getRow,
  updateRow,
}
