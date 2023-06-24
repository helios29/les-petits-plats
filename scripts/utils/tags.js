import { tagFactory } from '../factories/tagFactory.js';
import { getTagInArrays } from '../utils/filterTagsV2.js';
import { filterResult } from '../utils/filterTagsV2.js';
import { Recipes } from '../pages/meal.js';
import { wordSEARCHBAR } from '../utils/filterSearchBar.js';
import { filterSearchBarElements } from '../utils/filterSearchBar.js';
import { searchBarlaunch } from '../utils/filterSearchBar.js';
import { countNbrTagSelected } from '../utils/filterSearchBar.js';
import { generateNewTagListing } from '../utils/filterSearchBar.js';

//test

let arrayTag = [];
export let buttonName = '';
export let tagSelected = '';

//Event listener on tags
document.querySelectorAll('.choice li').forEach((choice) => {
  choice.addEventListener('click', taglaunch);
});

function showTagButton(tagSelected, buttonName) {
  // show tags on screen
  if (tagSelected !== undefined && tagSelected.className === 'notClicked') {
    const tagContainer = document.querySelector(`.tagContainer`);
    const tagModel = tagFactory(tagSelected.innerText, buttonName);

    arrayTag.push(tagModel);
    tagContainer.appendChild(tagModel);

    const tagCloseButton = tagModel.children[1];

    if (buttonName === 'ingredients') {
      tagModel.style.backgroundColor = '#3282f7';
      tagCloseButton.style.backgroundColor = '#3282f7';
    } else if (buttonName === 'appliances') {
      tagModel.style.backgroundColor = '#68d9a4';
      tagCloseButton.style.backgroundColor = '#68d9a4';
    } else if (buttonName === 'ustensils') {
      tagModel.style.backgroundColor = '#ed6454';
      tagCloseButton.style.backgroundColor = '#ed6454';
    }
    return tagSelected;
  }
}

function tagDelete(arrayTag, nbrTagSelected) {
  console.log('-----------------------------------------# coucou de tagDelete');
  console.log('coucou de tagDelete - arrayTag', arrayTag);
  arrayTag.forEach((tag) => {
    tag.addEventListener('click', (e) => {
      //Remove tag from screen
      e.currentTarget.remove();

      const recipes = document.querySelectorAll('.recipeCard');
      filterSearchBarElements(wordSEARCHBAR, recipes, nbrTagSelected);

      console.log('searchBarlaunch in tag delete');
      searchBarlaunch();
    });
  });
}

export function taglaunch(event) {
  console.log(
    '-----------------------------------------# coucou tag launch - tagSelected'
  );
  let tagSelected = event.target;
  console.log('tagSelected', tagSelected);
  const buttonName = tagSelected.dataset.tag;
  console.log('buttonName', buttonName);

  //Show tag button on the screen
  showTagButton(tagSelected, buttonName);
  console.log('arrayTags', arrayTag);

  filteringPreparation(wordSEARCHBAR);
}

export function filteringPreparation(wordSEARCHBAR) {
  //Put tags in arrays for filtering
  const tagsSelectedInArray = getTagInArrays();
  const ingredients = tagsSelectedInArray.arrayIngredientsSelected;
  const appareils = tagsSelectedInArray.arrayAppareilsSelected;
  const ustensils = tagsSelectedInArray.arrayUstensilsSelected;
  let nbrCardNone = 0;

  const nbrTagSelected = countNbrTagSelected();
  console.log('nbrTagSelected', nbrTagSelected);

  //Filtering the results
  filteringResult(tagsSelectedInArray, wordSEARCHBAR);

  //Preparation button Listing
  const listingPreparation = preparationButtonListing(nbrCardNone);
  const ingredientsListing = listingPreparation.ingredientsListArray;
  const appareilsListing = listingPreparation.appliancesListArray;
  const ustensilsListing = listingPreparation.ustensilsListArray;

  //Generating new tag listing
  generateNewTagListing(appareilsListing, ustensilsListing, ingredientsListing);

  //Adding the event listener for removing the tag
  tagDelete(arrayTag, nbrTagSelected, buttonName);

  // Avoid double click on tags
  tagInClickedClass(ingredients, appareils, ustensils);
}

export function preparationButtonListing(nbrCardNone) {
  const recipesCards = document.querySelectorAll('.recipeCard');

  let arrayListButton = [];
  let ustensilsListArray = [];
  let ingredientsListArray = [];
  let appliancesListArray = [];

  for (let j = 0; j < recipesCards.length; j++) {
    //Create the listing for the button with the card that matches
    arrayListButton = recipesCards[j].getAttribute('appliance').split(',');
    appliancesListArray = createAppliancesArray(
      arrayListButton,
      appliancesListArray
    );

    arrayListButton = recipesCards[j].getAttribute('ustensils').split(',');
    ustensilsListArray = createUstensilsArray(
      arrayListButton,
      ustensilsListArray
    );

    arrayListButton = recipesCards[j].getAttribute('ingredients').split(',');
    ingredientsListArray = createIngredientsArray(
      arrayListButton,
      ingredientsListArray
    );
    nbrCardNone += 1;
  }
  console.log('ingredientsListArray', ingredientsListArray);
  console.log('nbrCardNone', nbrCardNone);
  return {
    appliancesListArray,
    ustensilsListArray,
    ingredientsListArray,
    nbrCardNone,
  };
}

//Creating array
function createAppliancesArray(arrayListButton, appliancesListArray) {
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

function filteringResult(tagsSelectedInArray, wordSEARCHBAR) {
  const ingredients = tagsSelectedInArray.arrayIngredientsSelected;
  const appareils = tagsSelectedInArray.arrayAppareilsSelected;
  const ustensils = tagsSelectedInArray.arrayUstensilsSelected;
  const results = filterResult(
    ingredients,
    appareils,
    ustensils,
    wordSEARCHBAR
  );

  const recipesCard = new Recipes();
  recipesCard.displayData(results);
  console.log('results', results);

  return {
    ingredients,
    appareils,
    ustensils,
  };
}

// Avoid double click on tags
function tagInClickedClass(ingredients, appareils, ustensils) {
  if (ingredients && ingredients.length > 0) {
    const ingredientsLi = document.querySelectorAll('.ingredientsTag li');
    for (let j = 0; j < ingredients.length; j++) {
      for (let i = 0; i < ingredientsLi.length; i++) {
        if (ingredients[j] === ingredientsLi[i].innerText) {
          ingredientsLi[i].className = 'Clicked';
        }
      }
    }
  }

  if (appareils && appareils.length > 0) {
    const appareilsLi = document.querySelectorAll('.appliancesTag li');
    for (let j = 0; j < appareils.length; j++) {
      for (let i = 0; i < appareilsLi.length; i++) {
        if (appareils[j] === appareilsLi[i].innerText) {
          appareilsLi[i].className = 'Clicked';
        }
      }
    }
  }

  if (ustensils && ustensils.length > 0) {
    const ustensilsLi = document.querySelectorAll('.ustensilsTag li');
    for (let j = 0; j < ustensils.length; j++) {
      for (let i = 0; i < ustensilsLi.length; i++) {
        if (ustensils[j] === ustensilsLi[i].innerText) {
          ustensilsLi[i].className = 'Clicked';
        }
      }
    }
  }
}
