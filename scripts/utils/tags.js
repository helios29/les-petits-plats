import { tagFactory } from '../factories/tagFactory.js';
import { getTagInArrays } from '../utils/filterTagsV2.js';
import { filterResult } from '../utils/filterTagsV2.js';
import { Recipes } from '../pages/meal.js';
import { wordSEARCHBAR } from '../utils/filterSearchBar.js';
import { filterSearchBarElements } from '../utils/filterSearchBar.js';
import { nbrTagSelected } from '../utils/filterTagsV2.js';

let arrayTag = [];
export let buttonName = '';
export let tagSelected = '';

function showTagButton(tagSelected, buttonName) {
  // Permet de voir les bouttons des tags à l'écran
  if (tagSelected !== undefined && tagSelected.className === 'notClicked') {
    // event.preventDefault();

    const tagContainer = document.querySelector(`.tagContainer`);
    const tagModel = tagFactory(tagSelected.innerText, buttonName);
    arrayTag.push(tagModel);
    console.log('tagSelected', tagSelected);
    // console.log('tagModel', tagModel);
    // console.log(' arrayTag', arrayTag);
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

function tagclose(e, nbrTagSelected) {
  e.remove();
  tagSelected.className = 'notClicked';
  nbrTagSelected -= 2;
  console.log('nbrTagSelected', nbrTagSelected);
  // return arrayTag.length - 1;
}

function tagDelete(arrayTag, tagSelected) {
  arrayTag.forEach((tag) => {
    tag.addEventListener('click', (e) => {
      // console.log('tagDelete', e.currentTarget);
      // const numberOfTag = tagclose(e.currentTarget, tagSelected, arrayTag);
      // arrayTag.splice(-1);

      const tagsSelectedInArray = getTagInArrays();

      const ingredients = tagsSelectedInArray.arrayIngredientsSelected;
      const appareils = tagsSelectedInArray.arrayAppareilsSelected;
      const ustensils = tagsSelectedInArray.arrayUstensilsSelected;
      const nbrTagSelected = tagsSelectedInArray.nbrTagSelected

      tagclose(e.currentTarget, nbrTagSelected)


      const results = filterResult(ingredients, appareils, ustensils);

      const recipesCard = new Recipes();
      recipesCard.displayData(results);

      const recipes = document.querySelectorAll('.recipeCard');
      filterSearchBarElements(wordSEARCHBAR, recipes);
      taglaunch();
      // console.log("searchBarlaunch in tag delete")
      // searchBarlaunch();
    });
  });
}

export function taglaunch() {
  document.querySelectorAll('.choice li').forEach((choice) => {
    choice.addEventListener('click', (e) => {
      e.preventDefault();
      tagSelected = e.currentTarget;
      const buttonName = tagSelected.dataset.tag;
      const tagElement = showTagButton(tagSelected, buttonName);

      if (arrayTag.length > 0) {
        const tagsSelectedInArray = getTagInArrays();

        const ingredients = tagsSelectedInArray.arrayIngredientsSelected;
        const appareils = tagsSelectedInArray.arrayAppareilsSelected;
        const ustensils = tagsSelectedInArray.arrayUstensilsSelected;

        const results = filterResult(ingredients, appareils, ustensils);

        const recipesCard = new Recipes();
        recipesCard.displayData(results);

        const recipes = document.querySelectorAll('.recipeCard');
        filterSearchBarElements(wordSEARCHBAR, recipes);
        tagDelete(arrayTag, tagElement);

        tagSelected.setAttribute('class', 'clicked');
        tagInClickedClass(ingredients, appareils, ustensils);
        // tagSelected.classList.add('clicked');
        // console.log('tagSelected', tagSelected);
        // console.log('tagSelected.classList', tagSelected.classList);
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
        // console.log('ingredient', ingredient);
        // console.log('ingredientLi', ingredientLi);
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
