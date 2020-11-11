const {
    searchArticle
} = require('./article.controller');

const router = require('express').Router();

router.get('/', searchArticle);

module.exports = router;