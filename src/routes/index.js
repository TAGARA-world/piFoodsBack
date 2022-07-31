const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const Recipes = require("./Recipe.js")
const Diet = require("./Diet.js")

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/recipe",Recipes)
router.use("/types",Diet)
router.use("/diets",Diet)



module.exports = router;

