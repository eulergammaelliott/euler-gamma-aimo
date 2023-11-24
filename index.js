require('dotenv').config();

const app = require('express')();

app.set('view engine', 'pug');

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/supporters', (req, res) => {
  res.render('supporters');
});

app.get('/get-involved', (req, res) => {
  res.render('get-involved');
});

app.listen(process.env.PORT, () => {
  console.log('listening on ' + process.env.PORT);
});