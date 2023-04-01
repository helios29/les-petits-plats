import { receipeFactory } from '../factories/mealFactory.js';

function displayData(receipes) {
  const receipesList = document.querySelector('#receipesList');

  receipes.forEach((receipe) => {
    const receipeModel = receipeFactory(receipe);
    const userCardDOM = receipeModel.getUserCardDOM();
    receipesList.appendChild(userCardDOM);
  });
}

function init() {
  // pas besoin de async car je suis sur .then .catch
  fetch('/data/recipes.json')
    .then((response) => response.json())
    .then((data) => displayData(data.recipes))
    .catch((err) => console.log(err));
}

init();
