import { buttonFactory } from '../factories/buttonFactory.js';
import { Recipes } from '../pages/meal.js';
import { dataFetch } from '../pages/meal.js';



export class ButtonFilter extends Recipes {
  constructor(data, buttonElement) {
    super(data);
    this.buttonElement = buttonElement;
  }

  // eslint-disable-next-line class-methods-use-this
  createListElement(recipes, listButton) {

    const buttonName = listButton;

    if (buttonName === 'ingredients') {
      const listIngredients = [];

      recipes.forEach((recipe) => {
        const ingredientRecipes = recipe.ingredients;

        ingredientRecipes.forEach((ingredientRecipe) => {
          listIngredients.push(ingredientRecipe.ingredient);
        });
      });
      return buttonFilter.createUniqueList(listIngredients);
    }
    if (buttonName === 'appliances') {
      const listDevices = [];
      recipes.forEach((recipe) => listDevices.push(recipe.appliance));

      return buttonFilter.createUniqueList(listDevices);
    }
    if (buttonName === 'ustensils') {
      const listUstensils = [];

      recipes.forEach((recipe) => {
        const ustensilRecipes = recipe.ustensils;

        ustensilRecipes.forEach((ustensilRecipe) => {
          listUstensils.push(ustensilRecipe);
        });
      });
      return buttonFilter.createUniqueList(listUstensils);
    }
  }

  createUniqueList(list) {
    const uniquelist = [...new Set(list)];
    return uniquelist.sort();
  }

  //Display list to the button and append it
  displaylist(finalList, listButton) {
    const buttonList = document.querySelector(`.${listButton}Tag`);
    
    finalList.forEach((list) => {
      const buttonModel = buttonFactory(list, listButton);
      buttonList.appendChild(buttonModel);
    });
  }

  displayTitleButton(title) {
    if (title === 'ingredients') {
      return 'Ingrédents';
    }
    if (title === 'appliances') {
      return 'Appareils';
    }
    if (title === 'ustensils') {
      return 'Ustensils';
    }
  }

  showList(e) {
    const list = document.querySelector(`#${e}`).nextElementSibling
      .nextElementSibling;
    const filterIcon = list.previousElementSibling;

    const element = document.querySelector(`#${e}`);

    if (list.style.display === 'none') {
      list.style.display = 'grid';
      filterIcon.className = 'filterIcon rotate';
      element.className = 'buttonBarSearch open already';
      element.type = 'text';
      element.value = '';
    } else {
      list.style.display = 'none';
      filterIcon.className = 'filterIcon';
      element.className = 'buttonBarSearch close already';
      element.type = 'button';
      element.value = buttonFilter.displayTitleButton(e);
    }
  }
}

// listener on the button
document.querySelectorAll('.buttonBarSearch').forEach((button) => {
  button.addEventListener('click', (e) => {
    e.preventDefault();
    buttonFilter.showList(e.currentTarget.id);
  });
});

export const displayTagList = (buttonFilter) => {
  const listButtons = ['ingredients', 'appliances', 'ustensils'];
  listButtons.forEach((listButton) => {
    const finalList = buttonFilter.createListElement(dataFetch, listButton);
    buttonFilter.displaylist(finalList, listButton);
  });
};

const buttonFilter = new ButtonFilter(dataFetch);
displayTagList(buttonFilter);
