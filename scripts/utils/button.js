import { buttonFactory } from '../factories/buttonFactory.js';
import { Recipes } from '../pages/meal.js';
import { dataFetch } from '../pages/meal.js';

export class ButtonFilter extends Recipes {
  constructor(data, buttonElement) {
    super(data);
    this.buttonElement = buttonElement;
  }

  createListElement(recipes, listButton) {
    const buttonName = listButton;

    if (buttonName === 'ingredients') {
      const listIngredients = [];

      for (let i = 0; i < recipes.length; i++) {
        const ingredientRecipes = recipes[i].ingredients;
        for (let j = 0; j < ingredientRecipes.length; j++) {
          listIngredients.push(ingredientRecipes[j].ingredient);
        }
      }
      return buttonFilter.createUniqueList(listIngredients);
    }
    if (buttonName === 'appliances') {
      const listDevices = [];

      for (let i = 0; i < recipes.length; i++) {
        listDevices.push(recipes[i].appliance)
      }
      return buttonFilter.createUniqueList(listDevices);
    }
    if (buttonName === 'ustensils') {
      const listUstensils = [];

      for (let i = 0; i < recipes.length; i++) {
        const ustensilRecipes = recipes[i].ustensils;
        for (let j = 0; j < ustensilRecipes.length; j++) {
          listUstensils.push(ustensilRecipes[i]);
        }
      }
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

    for (let i = 0; i < finalList.length; i++) {
      const buttonModel = buttonFactory(finalList[i], listButton);
      buttonList.appendChild(buttonModel);
    }
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
const buttonBarSearch = document.querySelectorAll('.buttonBarSearch')
for (let i = 0; i < buttonBarSearch.length; i++) {
  buttonBarSearch[i].addEventListener('click', (e) => {
    e.preventDefault();
    buttonFilter.showList(e.currentTarget.id);
  });
}

export const displayTagList = (buttonFilter) => {
  const listButtons = ['ingredients', 'appliances', 'ustensils'];
  for (let i = 0; i < listButtons.length; i++) {
    const finalList = buttonFilter.createListElement(dataFetch, listButtons[i]);
    buttonFilter.displaylist(finalList, listButtons[i]);
  }
};

const buttonFilter = new ButtonFilter(dataFetch);
displayTagList(buttonFilter);
