/* eslint-disable class-methods-use-this */
// eslint-disable-next-line max-classes-per-file
import { receipeFactory } from '../factories/mealFactory.js';

export class Recipes {
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
    const recipesList = document.querySelector('#recipesList');

    recipes.forEach((recipe) => {
      const recipeModel = receipeFactory(recipe);
      const userCardDOM = recipeModel.getUserCardDOM();
      recipesList.appendChild(userCardDOM);
    });
  }
}

const recipes = new Recipes();
export const dataFetch = await recipes.fetchData();
// console.log('dataFetch', dataFetch);
recipes.displayData(dataFetch);
