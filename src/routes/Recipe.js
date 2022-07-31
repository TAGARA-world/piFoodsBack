const express = require('express');
const {getByName, getIdRecipe, getPost, deleted} = require('../controllers/Recipe.controllers');
const router = express.Router();

router.get('/',getByName);
router.get('/:id', getIdRecipe);
router.post('/create',getPost);
router.delete('/delete/:id',deleted);

module.exports = router;