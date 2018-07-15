const express = require('express');
var cors = require('cors');

const app = express();
app.use(cors());

app.get('/products', (req, res) => {
  setTimeout(() => {
    const error = Math.random() > 0.8;
    if (error) {
      res.status(500);
    }
    res.json(require('./products.json'));
  }, 800)
});

app.listen(7001, () => console.log('Server listening on port 7001'));
