const express = require('express');
var cors = require('cors');

const app = express();
app.use(cors());

app.get('/products', (req, res) => {
  setTimeout(() => {
    res.json(require('./products.json'));
  }, 800)
});

app.listen(7001, () => console.log('Server listening on port 7001'));
