import { ButtonFilter } from '../utils/button.js';
import { filteringPreparation } from '../utils/tags.js';

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

export function filterSearchBarElements() {
  //Filter the result
  filteringPreparation(wordSEARCHBAR);

  // Show message that no card were found
  noCardFound();
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

function noCardFound() {
  const cardNotFound = document.querySelector('.card__not_found');
  const recipeCard = document.querySelectorAll('.recipeCard');

  //if there is no more card to show then show error message
  if (recipeCard.length === 0) {
    cardNotFound.innerText = `Oups, il n'y a aucune recette correspondante. Pourtant nous avons des recettes au thon, à la coco aux pommes etc....`;
  } else {
    cardNotFound.innerText = ``;
  }
}

export function countNbrTagSelected() {
  const tagsSelected = document.querySelectorAll(`.tagSelected`);
  console.log('nbrTagSelected in getTagInArrays', tagsSelected.length);

  return tagsSelected.length;
}

console.log('searchBarlaunch in filterSearchBar');
searchBarlaunch();
