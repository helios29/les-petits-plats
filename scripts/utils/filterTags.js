import { arrayCard } from '../utils/filter.js';
import { dataFetch } from '../pages/meal.js';

export function listTagCreation(tagName, buttonName) {
  console.log('tag', tagName);
  const recipes = document.querySelectorAll('.receipeCard');
  filterElementsTag(tagName, recipes, buttonName);
  console.log('buttonName', buttonName);
  // console.log('dataFetch', dataFetch);

  let ingredientList = [];
  let appareilsList = [];
  let ustensilsList = [];

  for (let i = 0; i < arrayCard.length; i++) {
    let ustensils = dataFetch[arrayCard[i]].ustensils;
    for (let j = 0; j < ustensils.length; j++) {
      ustensilsList.push(ustensils[j]);
    }
    let appareils = dataFetch[arrayCard[i]].appliance;
    appareilsList.push(appareils);

    let ingredients = dataFetch[arrayCard[i]].ingredients;
    for (let j = 0; j < ustensils.length; j++) {
      console.log('ingredients[j]', ingredients[j].ingredient);
      ingredientList.push(ingredients[j].ingredient);
    }
  }

  ustensilsList = createUniqueList(ustensilsList);
  appareilsList = createUniqueList(appareilsList);
  ingredientList = createUniqueList(ingredientList);

  console.log('buttonName', buttonName);
  console.log('ustensilsList', ustensilsList);
  console.log('appareilsList', appareilsList);
  console.log('ingredientList', ingredientList);
}

export function filterElementsTag(tagName,recipes, buttonName) {
  console.log('buttonName', buttonName);

  if (tagName.length > 2) {
    // filter if words > 2 letters
    for (let i = 0; i < dataFetch.length; i++) {
      if (buttonName === 'Ustensils') {
        let arrayTag = dataFetch[i].ustensils;
        filterTag(tagName, i, recipes, arrayTag);
      } else if (buttonName === 'Appareils') {
        let arrayTag = dataFetch[i].appliance;
        // console.log('Appareil arrayTag', arrayTag);
        filterTagApplicance(tagName, i, recipes, arrayTag);
      } else if (buttonName === 'Ingrédients') {
        let arrayTag = dataFetch[i].ingredients;
        filterTagIngredient(tagName, i, recipes, arrayTag);
      }
    }
  }
}

function filterTagIngredient(tagName, i, recipes, arrayTag) {
  // console.log('dataFetch[i]', dataFetch[i]);
  // console.log('recipes[i]', recipes[i]);
  console.log('tagName', tagName);
  console.log('arrayTag', arrayTag);

  for (let j = 0; j < arrayTag.length; j++) {
    // if (recipes[i].textContent.toLowerCase().includes(words.toLowerCase())) {
    if (arrayTag[j].ingredient.toLowerCase() === tagName.toLowerCase()) {
      recipes[i].style.display = 'block';
      break;
    } else {
      recipes[i].style.display = 'none';
    }
  }
}

function filterTag(tagName, i, recipes, arrayTag) {
  // console.log('dataFetch[i]', dataFetch[i]);
  // console.log('recipes[i]', recipes[i]);
  console.log('tagName', tagName);
  console.log('arrayTag', arrayTag);

  for (let j = 0; j < arrayTag.length; j++) {
    // if (recipes[i].textContent.toLowerCase().includes(words.toLowerCase())) {
    if (arrayTag[j].toLowerCase() === tagName.toLowerCase()) {
      recipes[i].style.display = 'block';
      break;
    } else {
      recipes[i].style.display = 'none';
    }
  }
}

function filterTagApplicance(tagName, i, recipes, arrayTag) {
  // console.log('dataFetch[i]', dataFetch[i]);
  // console.log('recipes[i]', recipes[i]);
  console.log('tagName', tagName);
  console.log('arrayTag', arrayTag);

  // if (recipes[i].textContent.toLowerCase().includes(words.toLowerCase())) {
  if (arrayTag.toLowerCase() === tagName.toLowerCase()) {
    recipes[i].style.display = 'block';
  } else {
    recipes[i].style.display = 'none';
  }
}


export function tagCloseShowAllCard(numberOfTag) {
  const recipes = document.querySelectorAll('.receipeCard');
  console.log('numberOfTag', numberOfTag);
  if (numberOfTag === 0) {
    for (let i = 0; i < recipes.length; i++) {
      recipes[i].style.display = 'block';
    }
  }
}

function createUniqueList(list) {
  const uniquelist = [...new Set(list)];
  // console.log('uniquelist', uniquelist);
  return uniquelist.sort();
}
