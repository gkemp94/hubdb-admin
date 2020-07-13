const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

// Controllers
const { tables } = require('./controllers');


const app = express();
const PORT = process.env.PORT || 4000;

app.use(morgan('tiny'));
app.use(bodyParser.json());

app.get('/api/health', (_, res) => {
  res.status(200).send()
});

app.get('/api/tables/', tables.getTables);

app.get('/api/tables/:tableId', tables.getTable);

app.get('/api/tables/:tableId/rows', tables.getRows);

app.get('/api/tables/:tableId/rows/:rowId', tables.getRow);

app.put('/api/tables/:tableId/rows/:rowId', tables.updateRow);

app.listen(PORT || 4000, () => {
  console.log(`Listening on port ${PORT}`);
});
