import { dataFetch } from '../pages/meal.js';
import { wordSEARCHBAR } from '../utils/filterSearchBar.js';

export let nbrTagSelected = 0;

export function getTagInArrays() {
  const arrayIngredientsSelected = [];
  const arrayUstensilsSelected = [];
  const arrayAppareilsSelected = [];
  const tagsSelected = document.querySelectorAll(`.tagSelected`);
  console.log('tagsSelected in getTagInArrays', tagsSelected.length);

  tagsSelected.forEach((tagSelected) => {
    const elementSelected = tagSelected.innerText;
    const buttonName = tagSelected.dataset.tag;

    if (buttonName === 'ingredients') {
      arrayIngredientsSelected.push(elementSelected);
    } else if (buttonName === 'appliances') {
      arrayAppareilsSelected.push(elementSelected);
    } else if (buttonName === 'ustensils') {
      arrayUstensilsSelected.push(elementSelected);
    }

    nbrTagSelected += tagsSelected.length;
    console.log('nbrTagSelected in getTagInArrays', nbrTagSelected);
  });
  // console.log('Ingrédients', arrayIngredientsSelected);
  // console.log('Appareils', arrayAppareilsSelected);
  // console.log('Ustensils', arrayUstensilsSelected);

  return {
    arrayIngredientsSelected,
    arrayAppareilsSelected,
    arrayUstensilsSelected,
    nbrTagSelected,
  };
}

export function filterResult(ingredients, appareils, ustensils) {
  const recipesContainer = document.querySelector('#recipesList');
  recipesContainer.innerHTML = '';
  let result = dataFetch;

  if (wordSEARCHBAR && wordSEARCHBAR.length > 2) {
    result = result.filter(
      (recipe) =>
        recipe.name.toLowerCase().includes(wordSEARCHBAR) ||
        recipe.description.toLowerCase().includes(wordSEARCHBAR) ||
        recipe.ingredients.some((i) =>
          i.ingredient.toLowerCase().includes(wordSEARCHBAR)
        )
    );
  }

  if (ingredients && ingredients.length > 0) {
    ingredients.forEach((_ingredient) => {
      result = result.filter((recipe) =>
        recipe.ingredients.some((ingredient) =>
          ingredient.ingredient
            .toLowerCase()
            .includes(_ingredient.toLowerCase())
        )
      );
    });
  }

  if (appareils && appareils.length > 0) {
    result = result.filter((recipe) => appareils.includes(recipe.appliance));
  }

  if (ustensils && ustensils.length > 0) {
    ustensils.forEach((_ustensil) => {
      result = result.filter((recipe) =>
        recipe.ustensils.some((ustensil) =>
          ustensil.toLowerCase().includes(_ustensil.toLowerCase())
        )
      );
    });
    // result = result.filter((recipe) =>
    //   recipe.ustensils.some((u) => ustensils.includes(u))
    // );
  }

  return result;
}
