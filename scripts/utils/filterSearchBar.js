import { ButtonFilter } from '../utils/button.js';
import { taglaunch } from '../utils/tags.js';
import { Recipes } from '../pages/meal.js';
import { dataFetch } from '../pages/meal.js';
import { getTagInArrays } from '../utils/filterTagsV2.js';
import { filterResult } from '../utils/filterTagsV2.js';

export let wordSEARCHBAR = '';

export function searchBarlaunch() {
  // // SEARCHBAR EVENT
  const searchBar = document.querySelector('#searchbar');

  searchBar.addEventListener('keyup', (e) => {
    wordSEARCHBAR = e.target.value;
    console.log('wordSEARCHBAR', wordSEARCHBAR);
    const recipes = document.querySelectorAll('.recipeCard');
    filterSearchBarElements(wordSEARCHBAR, recipes);
  });
}

export function filterSearchBarElements(words, recipes, nbrTagSelected) {
  let nbrCardNone = 0;
  let creationListing;
  nbrTagSelected = countNbrTagSelected();
  console.log('&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&& coucou');
  console.log('-------------------> words', words);
  console.log('-------------------> words.length', words.length);
  console.log('-------------------> nbrTagSelected', nbrTagSelected);

  if (nbrTagSelected > 0 && words.length < 3) {
    // filter if there is a tag selected and "word" less than 3 letter
    const tagsSelectedInArray = getTagInArrays(nbrTagSelected);
    console.log(
      'nbrTagSelected in getTagInArrays',
      tagsSelectedInArray.nbrTagSelected
    );
    const ingredients = tagsSelectedInArray.arrayIngredientsSelected;
    const appareils = tagsSelectedInArray.arrayAppareilsSelected;
    const ustensils = tagsSelectedInArray.arrayUstensilsSelected;

    console.log('ingredients', ingredients);
    const results = filterResult(ingredients, appareils, ustensils);

    const recipesCard = new Recipes();
    recipesCard.displayData(results);
  } else if (words.length > 2 || nbrTagSelected > 0) {
    // filter if words > 2 letters or tag has been selected
    creationListing = creatingButtonListing(recipes, words, nbrCardNone);
    // Generation of the new tag listing
    generateNewTagListing(
      creationListing.appliancesListArray,
      creationListing.ustensilsListArray,
      creationListing.ingredientsListArray
    );
  } else if (words.length < 3 && nbrTagSelected === 0) {
    console.log('==================>Test ');
    // show all cards
    const recipesList = document.getElementById('recipesList');
    recipesList.innerHTML = '';
    const recipesAll = new Recipes();
    recipesAll.displayData(dataFetch);

    //Check if there is still not a tag selected
    creationListing = creatingButtonListing(recipes, words, nbrCardNone);
    // Generation of the new tag listing
    generateNewTagListing(
      creationListing.appliancesListArray,
      creationListing.ustensilsListArray,
      creationListing.ingredientsListArray
    );
  }
  console.log('==================>creationListing ', creationListing);
  // Show message that no card were found
  nbrCardNone = creationListing.nbrCardNone;
  noCardFound(nbrCardNone);

  // Tag launch
  taglaunch();
  console.log('searchBarlaunch in filterSearchBarElements');
}

export function generateNewTagListing(
  appliancesListArray,
  ustensilsListArray,
  ingredientsListArray
) {
  console.log('==================>appliancesListArray ', appliancesListArray);
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
  });
}

function noCardFound(nbrCardNone) {
  const cardNotFound = document.querySelector('.card__not_found');
  const recipeCard = document.querySelectorAll('.recipeCard');

  //if there is no more card to show then show error message
  if (nbrCardNone === recipeCard.length) {
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

//Creation of a listing for button if word entered in searchBar match
function creatingButtonListing(recipes, words, nbrCardNone) {
  let arrayListButton = [];
  let ustensilsListArray = [];
  let ingredientsListArray = [];
  let appliancesListArray = [];

  for (let i = 0; i < recipes.length; i++) {
    if (recipes[i].textContent.toLowerCase().includes(words.toLowerCase())) {
      //Show the recipes that match
      recipes[i].style.display = 'block';

      //Create the listing for the button with the card that matches
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
  return {
    appliancesListArray,
    ustensilsListArray,
    ingredientsListArray,
    nbrCardNone,
  };
}

function countNbrTagSelected() {
  const tagsSelected = document.querySelectorAll(`.tagSelected`);
  console.log('nbrTagSelected in getTagInArrays', tagsSelected.length);

  return tagsSelected.length;
}

console.log('searchBarlaunch in filterSearchBarElements');
searchBarlaunch();
