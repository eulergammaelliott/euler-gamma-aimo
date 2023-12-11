require('dotenv').config();
const fs = require('fs');
const Express = require('express');

const app = Express();

app.set('view engine', 'pug');

app.use(Express.static('./assets'));
app.use(Express.static('./node_modules/turbolinks/dist'));
app.use((req, res, next) => {
  res.setHeader('Cache-Control', 'public, s-maxage=3600, max-age=600, stale-if-error=3600');
  next();
});

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

app.get('/terms', (req, res) => {
  res.render('terms');
});

app.get('/privacy', (req, res) => {
  res.redirect('/privacy-notice-v1.pdf');
});

app.get('/updates', (req, res) => {
  let updates = fs.readFileSync('./content/updates-items.csv').toString();
  res.render('updates', { updates });
});

app.listen(process.env.PORT, () => {
  console.log('listening on ' + process.env.PORT);
});