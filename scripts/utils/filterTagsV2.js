import { dataFetch } from '../pages/meal.js';

export function getTagInArrays() {
  const arrayIngredientsSelected = [];
  const arrayUstensilsSelected = [];
  const arrayAppareilsSelected = [];
  const tagsSelected = document.querySelectorAll(`.tagSelected`);

  for (let i = 0; i < tagsSelected.length; i++) {
    const elementSelected = tagsSelected[i].innerText;
    const buttonName = tagsSelected[i].dataset.tag;

    if (buttonName === 'ingredients') {
      arrayIngredientsSelected.push(elementSelected);
    } else if (buttonName === 'appliances') {
      arrayAppareilsSelected.push(elementSelected);
    } else if (buttonName === 'ustensils') {
      arrayUstensilsSelected.push(elementSelected);
    }
  
  }

  console.log('Ingrédients', arrayIngredientsSelected);
  console.log('Appareils', arrayAppareilsSelected);
  console.log('Ustensils', arrayUstensilsSelected);
  // nbrTagSelected += tagsSelected.length;
  // console.log('nbrTagSelected in getTagInArrays', nbrTagSelected);

  return {
    arrayIngredientsSelected,
    arrayAppareilsSelected,
    arrayUstensilsSelected,
    // nbrTagSelected,
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

    for (let i = 0; i < ingredients.length; i++) {
      console.log('recipe', recipe);
      result = result.filter((recipe) =>

      
        recipe.ingredients[i].some((ingredient) =>
          ingredient.ingredient
            .toLowerCase()
            .includes(ingredients[i].toLowerCase())
        )
      );
    }
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
