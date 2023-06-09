import { dataFetch } from '../pages/meal.js';

export function getTagInArrays() {
  const arrayIngredientsSelected = [];
  const arrayUstensilsSelected = [];
  const arrayAppareilsSelected = [];
  const tagsSelected = document.querySelectorAll(`.tagSelected`);

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
  });


  return {
    arrayIngredientsSelected,
    arrayAppareilsSelected,
    arrayUstensilsSelected,
  };
}

export function filterResult(ingredients, appareils, ustensils, wordSEARCHBAR) {
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
  }

  return result;
}
