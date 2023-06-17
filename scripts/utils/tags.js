import { tagFactory } from '../factories/tagFactory.js';
import { getTagInArrays } from '../utils/filterTagsV2.js';
import { filterResult } from '../utils/filterTagsV2.js';
import { Recipes } from '../pages/meal.js';
import { wordSEARCHBAR } from '../utils/filterSearchBar.js';
import { filterSearchBarElements } from '../utils/filterSearchBar.js';
import { searchBarlaunch } from '../utils/filterSearchBar.js';

let arrayTag = [];
export let buttonName = '';
export let tagSelected = '';

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

function tagclose(e, arrayTag) {
  e.remove();
  tagSelected.className = 'notClicked';
  return arrayTag.length - 1;
}

function tagDelete(arrayTag, nbrTagSelected) {
  console.log('coucou de tagDelete - arrayTag', arrayTag);
  arrayTag.forEach((tag) => {
    tag.addEventListener('click', (e) => {
      console.log('e', e.currentTarget);
      console.log('arrayTag.length', arrayTag.length);

      if (arrayTag.length > 0) {
        nbrTagSelected = tagclose(e.currentTarget, arrayTag);
        console.log('coucou de tagDelete - nbrTagSelected', nbrTagSelected);
        const tagsSelectedInArray = getTagInArrays(nbrTagSelected);
        tagsSelectedInArray.nbrTagSelected -= 1;
        console.log(
          '@@@@@@@@@@@@@@@@@@@@@@@@ nbrTagSelected in getTagInArrays',
          tagsSelectedInArray.nbrTagSelected
        );
        const ingredients = tagsSelectedInArray.arrayIngredientsSelected;
        const appareils = tagsSelectedInArray.arrayAppareilsSelected;
        const ustensils = tagsSelectedInArray.arrayUstensilsSelected;
        console.log('====================> ingredients', ingredients);
        console.log('====================> appareils', appareils);
        console.log('====================> ustensils', ustensils);

        const results = filterResult(ingredients, appareils, ustensils);

        const recipesCard = new Recipes();
        recipesCard.displayData(results);
        console.log('results', results);

        const recipes = document.querySelectorAll('.recipeCard');
        filterSearchBarElements(wordSEARCHBAR, recipes, nbrTagSelected);
        taglaunch(nbrTagSelected);
        console.log('searchBarlaunch in tag delete');
        searchBarlaunch();
      }
    });
  });
}

export function taglaunch() {
  let nbrTagSelected = 0;
  document.querySelectorAll('.choice li').forEach((choice) => {
    choice.addEventListener('click', (e) => {
      e.preventDefault();
      tagSelected = e.currentTarget;
      const buttonName = tagSelected.dataset.tag;
      const tagElement = showTagButton(tagSelected, buttonName);
      console.log('arrayTags', arrayTag);

      if (arrayTag.length > 0) {
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
        console.log('results', results);

        const recipes = document.querySelectorAll('.recipeCard');
        filterSearchBarElements(
          wordSEARCHBAR,
          recipes,
          tagsSelectedInArray.nbrTagSelected
        );
        tagDelete(arrayTag, tagElement, nbrTagSelected);

        tagSelected.setAttribute('class', 'clicked');
        tagInClickedClass(ingredients, appareils, ustensils);
      }
    });
  });
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
taglaunch();
