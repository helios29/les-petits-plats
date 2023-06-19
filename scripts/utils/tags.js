import { tagFactory } from '../factories/tagFactory.js';
import { getTagInArrays } from '../utils/filterTagsV2.js';
import { filterResult } from '../utils/filterTagsV2.js';
import { Recipes } from '../pages/meal.js';
import { wordSEARCHBAR } from '../utils/filterSearchBar.js';
import { filterSearchBarElements } from '../utils/filterSearchBar.js';
import { searchBarlaunch } from '../utils/filterSearchBar.js';
import { countNbrTagSelected } from '../utils/filterSearchBar.js';
import { generateNewTagListing } from '../utils/filterSearchBar.js';

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

function tagclose(e, buttonName) {
  //Remove tag from screen
  e.remove();
  console.log('e', e.innerText);
  console.log('buttonName', buttonName);
  console.log('tagSelected', tagSelected);
  const classToChange = document.querySelector(`.choice .${buttonName}Tag `);
  // tagSelected.className = 'notClicked';
}

function tagDelete(arrayTag, nbrTagSelected, buttonName) {
  console.log('coucou de tagDelete - arrayTag', arrayTag);
  arrayTag.forEach((tag) => {
    tag.addEventListener('click', (e) => {
      console.log('e', e.currentTarget);
      console.log('arrayTag.length', arrayTag.length);

      //Remove tag from screen
      tagclose(e.currentTarget, buttonName);

      filteringPreparation();

      const recipes = document.querySelectorAll('.recipeCard');
      filterSearchBarElements(wordSEARCHBAR, recipes, nbrTagSelected);
      taglaunch(nbrTagSelected);
      console.log('searchBarlaunch in tag delete');
      searchBarlaunch();
    });
  });
}

export function taglaunch() {
  let tagSelected = this;
  console.log('tagSelected', tagSelected);
  const buttonName = tagSelected.dataset.tag;
  console.log('buttonName', buttonName);
  //Show tag button on the screen
  showTagButton(tagSelected, buttonName);
  console.log('arrayTags', arrayTag);

  filteringPreparation(wordSEARCHBAR);
} //);
//   });

// }

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

  //Add eventListener
  document.querySelectorAll('.choice li').forEach((choice) => {
    choice.addEventListener('click', taglaunch);
  });
}

export function preparationButtonListing(nbrCardNone) {
  const recipesCards = document.querySelectorAll('.recipeCard');

  let arrayListButton = [];
  let ustensilsListArray = [];
  let ingredientsListArray = [];
  let appliancesListArray = [];

  recipesCards.forEach((recipeCard) => {
    //Create the listing for the button with the card that matches
    arrayListButton = recipeCard.getAttribute('appliance').split(',');
    appliancesListArray = createAppliancesArray(
      arrayListButton,
      appliancesListArray
    );

    arrayListButton = recipeCard.getAttribute('ustensils').split(',');
    ustensilsListArray = createUstensilsArray(
      arrayListButton,
      ustensilsListArray
    );

    arrayListButton = recipeCard.getAttribute('ingredients').split(',');
    ingredientsListArray = createIngredientsArray(
      arrayListButton,
      ingredientsListArray
    );
    nbrCardNone += 1;
  });
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
  const results = filterResult(ingredients, appareils, ustensils, wordSEARCHBAR);

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
    ingredients.forEach((ingredient) => {
      ingredientsLi.forEach((ingredientLi) => {
        if (ingredient === ingredientLi.innerText) {
          ingredientLi.className = 'Clicked';
        }
      });
    });
  }

  if (appareils && appareils.length > 0) {
    const appareilsLi = document.querySelectorAll('.appliancesTag li');
    appareils.forEach((appareil) => {
      appareilsLi.forEach((appareilLi) => {
        if (appareil === appareilLi.innerText) {
          appareilLi.className = 'Clicked';
        }
      });
    });
  }

  if (ustensils && ustensils.length > 0) {
    const ustensilsLi = document.querySelectorAll('.ustensilsTag li');
    ustensils.forEach((ustensil) => {
      ustensilsLi.forEach((ustensilLi) => {
        if (ustensil === ustensilLi.innerText) {
          ustensilLi.className = 'Clicked';
        }
      });
    });
  }
}

// Lauch tag if no word enter in searchBar
console.log('taglaunch in tags');
// taglaunch();
