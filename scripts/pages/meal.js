// eslint-disable-next-line max-classes-per-file
import { receipeFactory } from '../factories/mealFactory.js';

// function displayData(recipes) {
//   const receipesList = document.querySelector('#receipesList');

//   recipes.forEach((receipe) => {
//     const receipeModel = receipeFactory(receipe);
//     const userCardDOM = receipeModel.getUserCardDOM();
//     receipesList.appendChild(userCardDOM);
//   });
// }

// export function fetchData() {
//   // pas besoin de async car je suis sur .then .catch
//   return fetch('/data/recipes.json')
//     .then((response) => response.json())
//     .then((data) => data.recipes)
//     .catch((err) => console.log(err));
// }

// async function init() {
//   const recipes = await fetchData();
//   console.log("recipes", recipes);
//   displayData(recipes);
// }

// init();

class Recipes {
  constructor(recipes) {
    this.recipes = recipes;
  }

  fetchData() {
    return fetch('/data/recipes.json')
      .then((response) => response.json())
      .then((data) => data.recipes)
      .catch((err) => console.log(err));
  }

  displayData(recipes) {
    const receipesList = document.querySelector('#receipesList');

    recipes.forEach((receipe) => {
      const receipeModel = receipeFactory(receipe);
      const userCardDOM = receipeModel.getUserCardDOM();
      receipesList.appendChild(userCardDOM);
    });
  }
}

class ButtonFilter extends Recipes {
  constructor(data, buttonElement) {
    super(data);
    this.buttonElement = buttonElement;
  }

  createButtonElement(e, recipes) {
    const buttonName = e;
    console.log('bouton cliquer : ', buttonName);

    if (buttonName === 'ingredient') {
      // console.log('1 ingredient : ', recipes[0].ingredients[0]);

      let listIngredients = [];

      recipes.forEach(function (recipe) {
        console.log('recipe.ingredients', recipe.ingredients);
        let ingredientRecipes = recipe.ingredients;

        ingredientRecipes.forEach(function (ingredientRecipe) {
          console.log('ingredientRecipe', ingredientRecipe.ingredient);
          listIngredients.push(ingredientRecipe.ingredient);
        });
      });

      buttonFilter.createUniqueList(listIngredients);

    } else if (buttonName === 'device') {
      const listDevices = [];
      recipes.forEach((recipe) => listDevices.push(recipe.appliance));
      console.log('listDevices : ', listDevices);

      buttonFilter.createUniqueList(listDevices);


    } else if (buttonName === 'ustensil') {
      const listUstensils = [];

      recipes.forEach((recipe) => {
        console.log('recipe.ustensils', recipe.ustensils);
        let ustensilRecipes = recipe.ustensils;

        ustensilRecipes.forEach((ustensilRecipe) => {
          console.log('ustensilRecipe', ustensilRecipe);
          listUstensils.push(ustensilRecipe);
        });
      });
      console.log('listUstensils : ', listUstensils);

      buttonFilter.createUniqueList(listUstensils);
    }
  }

  createUniqueList(list) {
    const uniquelist = [...new Set(list)];
    console.log('uniquelist', uniquelist);
    return uniquelist.sort();
  }

  determineButtonClicked(buttonName){
    if (buttonName === 'ingredient') {

      recipes.forEach(function (recipe) {
        console.log('recipe.ingredients', recipe.ingredients);
        let ingredientRecipes = recipe.ingredients;

        ingredientRecipes.forEach(function (ingredientRecipe) {
          console.log('ingredientRecipe', ingredientRecipe.ingredient);
          listIngredients.push(ingredientRecipe.ingredient);
        });
      });

      buttonFilter.createUniqueList(listIngredients);

    } else if (buttonName === 'device') {
     recipe.appliance
    } else if (buttonName === 'ustensil') {

      recipe.ustensils;
       
    }
  }
  // displaylist(uniquelist){
    // const buttonList = document.querySelector('#receipesList');

    // uniquelist.forEach((list) => {
    //   const buttonModel = buttonFactory(list);
    //   const userCardDOM = buttonModel.getUserCardDOM();
    //   buttonList.appendChild(userCardDOM);
    // });
  // }
 
}

const recipes = new Recipes();
const dataFetch = await recipes.fetchData();
console.log('dataFetch', dataFetch);
recipes.displayData(dataFetch);

document.querySelectorAll('button').forEach((button) => {
  button.addEventListener('click', (e) => {
    e.preventDefault();
    buttonFilter.createButtonElement(e.currentTarget.id, dataFetch);
  });
});

const buttonFilter = new ButtonFilter();
