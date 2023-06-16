import { ButtonFilter } from '../utils/button.js';
import { taglaunch } from '../utils/tags.js';
import { Recipes } from '../pages/meal.js';
import { dataFetch } from '../pages/meal.js';

export let wordSEARCHBAR = '';

export function searchBarlaunch() {
  // // SEARCHBAR EVENT
  const searchBar = document.querySelector('#searchbar');

  searchBar.addEventListener('keyup', (e) => {
    wordSEARCHBAR = e.target.value;
    console.log('wordSEARCHBAR', wordSEARCHBAR);
    const recipes = document.querySelectorAll('.recipeCard');
    filterSearchBarElements(wordSEARCHBAR, recipes);
    // filterButtonList(wordSEARCHBAR);
  });
}

export function filterSearchBarElements(words, recipes, nbrTagSelected) {
  let arrayListButton = [];
  let nbrCardNone = 0;
  let ustensilsListArray = [];
  let ingredientsListArray = [];
  let appliancesListArray = [];
  console.log('-------------------> words', words);
  console.log('-------------------> words.length', words.length);
  console.log('-------------------> nbrTagSelected', nbrTagSelected);

  if (words.length > 2 || nbrTagSelected > 0) {
    // filter if words > 2 letters or tag has been selected
    console.log('<<<< coucou tag delete');
    for (let i = 0; i < recipes.length; i++) {
      if (recipes[i].textContent.toLowerCase().includes(words.toLowerCase())) {
        //Show the recipes that match
        recipes[i].style.display = 'block';
        arrayListButton = recipes[i].getAttribute('appliance').split(',');
        appliancesListArray = createAppliancesArray(
          arrayListButton,
          appliancesListArray
        );

        arrayListButton = recipes[i].getAttribute('ustensils').split(',');
        ustensilsListArray = createUstensilsArray(
          arrayListButton,
          ustensilsListArray
        );

        arrayListButton = recipes[i].getAttribute('ingredients').split(',');
        ingredientsListArray = createIngredientsArray(
          arrayListButton,
          ingredientsListArray
        );
      } else {
        //Don't show recipes that doesn't match
        recipes[i].style.display = 'none';
        nbrCardNone += 1;
      }
    }

    console.log('-------------------> recipes.length', recipes.length);
  } else if (words.length < 3) {
    console.log('-------------------> words.length < 3');
    // show all cards
    const recipesList = document.getElementById('recipesList');
    recipesList.innerHTML = '';
    const recipesAll = new Recipes();
    // console.log('dataFetch', dataFetch);
    recipesAll.displayData(dataFetch);

    for (let i = 0; i < recipes.length; i++) {
      if (recipes[i].textContent.toLowerCase().includes(words.toLowerCase())) {
        //Show the recipes that match
        recipes[i].style.display = 'block';
        arrayListButton = recipes[i].getAttribute('appliance').split(',');
        appliancesListArray = createAppliancesArray(
          arrayListButton,
          appliancesListArray
        );

        arrayListButton = recipes[i].getAttribute('ustensils').split(',');
        ustensilsListArray = createUstensilsArray(
          arrayListButton,
          ustensilsListArray
        );

        arrayListButton = recipes[i].getAttribute('ingredients').split(',');
        ingredientsListArray = createIngredientsArray(
          arrayListButton,
          ingredientsListArray
        );
      } else {
        console.log('<<<< coucou tag delete +++++');
        //Filter the cards if no tagsSelected
        //Don't show recipes that doesn't match
        recipes[i].style.display = 'none';
        nbrCardNone += 1;
      }
    }
    console.log('-------------------> recipes.length', recipes.length);
  }

  // Show message that no card were found
  noCardFound(recipes, nbrCardNone);

  // Generation of the new tag listing
  generateNewTagListing(
    appliancesListArray,
    ustensilsListArray,
    ingredientsListArray
  );
  // Tag launch
  taglaunch(nbrTagSelected);
  console.log('searchBarlaunch in filterSearchBarElements');
  // searchBarlaunch();
}

export function generateNewTagListing(
  appliancesListArray,
  ustensilsListArray,
  ingredientsListArray
) {
  document.querySelectorAll('.buttonBarSearch').forEach((button) => {
    const buttonName = button.getAttribute('name');
    let finalList = '';

    // Delete previous list and generate the filtered one
    const buttonListTags = document.querySelector(`.${buttonName}Tag`);
    buttonListTags.innerHTML = '';
    const buttonFilter = new ButtonFilter();

    if (buttonName === 'ingredients') {
      ingredientsListArray =
        buttonFilter.createUniqueList(ingredientsListArray);
      finalList = ingredientsListArray;
    } else if (buttonName === 'appliances') {
      appliancesListArray = buttonFilter.createUniqueList(appliancesListArray);
      finalList = appliancesListArray;
    } else if (buttonName === 'ustensils') {
      ustensilsListArray = buttonFilter.createUniqueList(ustensilsListArray);
      finalList = ustensilsListArray;
    }
    buttonFilter.displaylist(finalList, buttonName);
    // console.log('buttonName - finalList ', buttonName, finalList);
  });
}

function noCardFound(recipes, nbrCardNone) {
  const cardNotFound = document.querySelector('.card__not_found');

  if (nbrCardNone === recipes.length) {
    cardNotFound.innerText = `Oups, il n'y a aucune recette correspondante. Pourtant nous avons des recettes au thon, à la coco aux pommes etc....`;
  } else {
    cardNotFound.innerText = ``;
  }
}

function createAppliancesArray(arrayListButton, appliancesListArray) {
  // if (arrayListButton !== 'undefined')
  appliancesListArray.push(arrayListButton[0]);
  return appliancesListArray;
}

function createUstensilsArray(arrayListButton, ustensilsListArray) {
  for (let j = 0; j < arrayListButton.length; j++) {
    if (arrayListButton[j] !== undefined)
      ustensilsListArray.push(arrayListButton[j]);
  }
  return ustensilsListArray;
}

function createIngredientsArray(arrayListButton, ingredientsListArray) {
  for (let j = 0; j < arrayListButton.length; j++) {
    if (arrayListButton[j] !== undefined) {
      ingredientsListArray.push(arrayListButton[j]);
    }
  }
  return ingredientsListArray;
}
console.log('searchBarlaunch in filterSearchBarElements');
searchBarlaunch();
