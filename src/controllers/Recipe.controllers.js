const axios = require("axios");
const { Diet, Recipe } = require("../db");
  const { API_KEY} = process.env;
  const respuesta = require("../../respuesta.json") // ACTIVAR si la API no funciona

const getApiData = async () => {  
  try {
//DESDE LA API
    // const apiUrl = await axios.get(
    //   `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`
    // ); 
    //const apiData = apiUrl.data.results.map((recipes) => { 
//FIN API

// DESDE EL JSON
      let apiUrl = respuesta; // ACTIVAR si la API no funciona
      const apiData = apiUrl['results'].map((recipes) => { // ACTIVAR si la API no funciona
// fIN JSON

      return {   
        id: recipes.id.toString(),
        image: recipes.image,
        name: recipes.title.toLowerCase(), 
        type: recipes.diets,
        summary: recipes.summary,
        score: recipes.spoonacularScore,
        healthyScore: recipes.healthScore,
        dishTypes: recipes.dishTypes,
        steps: recipes.analyzedInstructions[0]?.steps.map((s) => {
          return {
            number: s.number, 
            step: s.step,
          };
        }),
      };
    });
    return apiData;
  } catch (e) {
    console.log(e);
  }
};

const dbData = async () => {
  const del = await Recipe.findAll({
    include: {
      model: Diet,
      attributes: ["name"],
    },
  });
  return del;
};

const allRecipes = async () => {
  const api = await getApiData();
  const db = await dbData();  
  const all = api.concat(db);
  return all;
};

const getByName = async (req, res) => { 
  try {
    const { name } = req.query;

    const recipe = await allRecipes();
    if (name) {
      const fil = recipe.filter((el) =>
        el.name.toLowerCase().includes(name.toLowerCase())
      );
      fil.length ? res.send(fil) : res.status(404).send({ msg: "not found" });
    } else {
      return res.send(recipe);
    }
  } catch (e) {
    console.log(e);
  }
};

const getIdRecipe = async (req, res) => {
  try {
    const { id } = req.params;
    const filId = await allRecipes(id);
    if (id) {
      const busqueda = filId.filter((el) => el.id === id);

      busqueda.length
        ? res.send(busqueda)
        : res.send({ msg: "error does not exist" });
    } else {
      res.send({ msg: "Should enter a valid ID" });
    }
  } catch (error) { 
    res.status(404).send({ msg: "Should enter a valid ID" });
  }
};

const getPost = async (req, res) => {
  const { name, summary, score, healthyScore, steps, type, image, dishTypes } =
    req.body;
  try {
    const nuevaReceta = await Recipe.create({
      name,
      summary,
      score,
      healthyScore,
      steps,
      image,
      dishTypes, 
      type,
      
    });

    const dietas = await Diet.findAll({
      where: { name: type },
    });
    await nuevaReceta.addDiet(dietas); 

    return res.status(200).send({ msg: "successfully created" });
  } catch (e) { 
    console.log(e);
  }
};


const deleted = async(req,res)=>{
  let {id}=req.params
  await Recipe.destroy({
    where: {
     id: id
    }
   }).then(count => {
    if (!count) {
     return res.status(404).send({error: 'No user'});
    }
    res.status(204).send();
   });
}


module.exports = {
  getApiData,
  getByName,
  getIdRecipe,
  getPost,
  dbData,
  allRecipes,
  deleted
  
};
