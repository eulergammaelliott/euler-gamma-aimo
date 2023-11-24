require('dotenv').config();
const Express = require('express');

const app = Express();

app.set('view engine', 'pug');

app.use(Express.static('./node_modules/turbolinks/dist'));

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