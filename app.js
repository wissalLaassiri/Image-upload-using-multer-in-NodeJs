const express = require("express");
const app = express();
const route = require('./models/article.route');
const {
  upimg
} = require('./middlewares/multer');
const {
  searchArticle
} = require('./models/article.controller');
const morgan = require('morgan');

app.use(express.json());
app.use('/zidou', route);
//app.use(morgan('combined'));

app.post('/upload/:id/:ext', (req, res) => {
  upimg(req, res, (err) => {
    if (err) console.log(err);
  })
});
app.get('/', (req, res) => {
  searchArticle(req, res, (err) => {
    if (err) res.status(401).send(err);
  })
})


module.exports = app;