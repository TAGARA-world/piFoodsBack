const express = require('express');
const { dietas } = require('../controllers/Diet.controllers');
const { deleted } = require('../controllers/Recipe.controllers');
const router = express.Router();

router.get('/',dietas);

module.exports = router;