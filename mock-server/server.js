const express = require('express');
const data = require('./data.json');

const app = express();
const router = express.Router();

router.get('/seller', (req, res) => {
  res.json({ errno: 0, data: data.seller });
});

router.get('/goods', (req, res) => {
  res.json({ errno: 0, data: data.goods });
});

router.get('/ratings', (req, res) => {
  res.json({ errno: 0, data: data.ratings });
});

app.use('/api', router);

app.get('/', (req, res) => {
  res.type('text/plain').send(
    [
      'shopping-rn mock API',
      '  GET /api/seller',
      '  GET /api/goods',
      '  GET /api/ratings',
      '',
      'iOS simulator:     http://localhost:8900/api',
      'Android emulator:  http://10.0.2.2:8900/api',
    ].join('\n'),
  );
});

const port = Number(process.env.PORT) || 8900;

app.listen(port, '0.0.0.0', () => {
  console.log(`shopping-rn mock API listening on http://localhost:${port}`);
});
