const axios = require("axios");
const { Diet, Recipe } = require("../db");
const { API_KEY } = process.env; 
const respuesta =  require("../../respuesta.json") // ACTIVAR Si la API NO Funciona

const getDiets = async (req, res) => { 
  try { 
    //DESDE LA API

    // const dietas = await axios.get(
    //   `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`
    // ); 
    // const types = await dietas.data.results.map((t) => t.diets);  

    // contadorvegetarian = 0
    // for(i=0; i<dietas.data['results'].length;i++){
    //   if(dietas.data['results'][i]['vegetarian']){
    //         console.log('Propiedad vegetarian',dietas.data['results'][i]['vegetarian'])
    //     if(!dietas.data['results'][i]['diets'].includes('vegetarian'))
    //         console.log('Propiedad "diets" include vegetarian?',dietas.data['results'][i]['diets'].includes('vegetarian'))
    //     dietas.data['results'][i]['diets'].push('vegetarian')
    //     contadorvegetarian = contadorvegetarian+1
    //     console.log('contador Vegetarian', contadorvegetarian)
    //     console.log(dietas.data['results'][i]['title'])
    //     console.log(dietas.data['results'][i]['diets'])
    //   }
    // }

    // contadorvegan = 0
    // for(i=0; i<dietas.data['results'].length;i++){
    //   if(dietas.data['results'][i]['vegan'] ){
    //     if(!dietas.data['results'][i]['diets'].includes('vegan'))
    //     dietas.data['results'][i]['diets'].push('vegan')
    //     contadorvegan = contadorvegan+1
    //     console.log('contador vegan', contadorvegan)
    //     console.log('tiene vegan?', dietas.data['results'][i]['diets'].includes('vegan'))
    //     console.log(dietas.data['results'][i]['title'])
    //     console.log(dietas.data['results'][i]['diets'])
    //   }
    // }

    // contadorglutenFree = 0
    // for(i=0; i<dietas.data['results'].length;i++){
    //   if(dietas.data['results'][i]['glutenFree']){
    //     if(!dietas.data['results'][i]['diets'].includes('gluten free'))
    //     dietas.data['results'][i]['diets'].push('glutenFree')
    //     contadorglutenFree = contadorglutenFree+1
    //     console.log('contador glutenFree', contadorglutenFree)
    //     console.log(dietas.data['results'][i]['title'])
    //     console.log(dietas.data['results'][i]['diets'])
    //   }
    // }
    // console.log('types: ',types)
  //FIN DE LA API

//----------------------------------------------------------------
    // DESDE EL JSON
    let dietas = respuesta; 
    const types = await dietas['results'].map((t) => t.diets);  
   
    contadorvegetarian = 0
    for(i=0; i<dietas['results'].length;i++){
      if(dietas['results'][i]['vegetarian']){
        if(!dietas['results'][i]['diets'].includes('vegetarian'))
        dietas['results'][i]['diets'].push('vegetarian')
        contadorvegetarian = contadorvegetarian+1
        console.log('contador Vegetarian', contadorvegetarian)
        console.log(dietas['results'][i]['title'])
        console.log(dietas['results'][i]['diets'])
      }
    }

    contadorvegan = 0
    for(i=0; i<dietas['results'].length;i++){
      if(dietas['results'][i]['vegan'] ){
        if(!dietas['results'][i]['diets'].includes('vegan'))
        dietas['results'][i]['diets'].push('vegan')
        contadorvegan = contadorvegan+1
        console.log('contador vegan', contadorvegan)
        console.log('tiene vegan?', dietas['results'][i]['diets'].includes('vegan'))
        console.log(dietas['results'][i]['title'])
        console.log(dietas['results'][i]['diets'])
      }
    }

    contadorglutenFree = 0
    for(i=0; i<dietas['results'].length;i++){
      if(dietas['results'][i]['glutenFree']){
        if(!dietas['results'][i]['diets'].includes('gluten free'))
        dietas['results'][i]['diets'].push('glutenFree')
        contadorglutenFree = contadorglutenFree+1
        console.log('contador glutenFree', contadorglutenFree)
        console.log(dietas['results'][i]['title'])
        console.log(dietas['results'][i]['diets'])
      }
    }
    console.log('types: ',types)
  //FIN DEL JSON
//----------------------------------------------------------------
    const diets = types.flat();
    const typeDiets = [...new Set(diets),]; 
    typeDiets.forEach(async (d) => {
      await Diet.findOrCreate({ 
        where: { name: d }, 
      });
    });
    const allDiets = await Diet.findAll();
    return allDiets;
  } catch (error) {
  console.log(error); 
  }
};

const dietas = async (req, res) => {
  try {
    const d = await Diet.findAll();
    res.send(d);
  } catch (e) {
    res.status(404).send({msg:"error"})
}; 
}

module.exports = {
  getDiets,
  dietas,
};
