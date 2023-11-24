require('dotenv').config();

const app = require('express')();

app.set('view engine', 'pug');

app.get('/', (req, res) => {
  res.render('index');
});

app.listen(process.env.PORT, () => {
  console.log('listening on ' + process.env.PORT);
});