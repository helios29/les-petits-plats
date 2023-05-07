import { buttonFactory } from '../factories/buttonFactory.js';
import { Recipes } from '../pages/meal.js';
import { dataFetch } from '../pages/meal.js';
import { taglaunch } from '../utils/tags.js';
import { wordSEARCHBAR } from '../utils/filter.js';

class ButtonFilter extends Recipes {
  constructor(data, buttonElement) {
    super(data);
    this.buttonElement = buttonElement;
  }

  createListElement(recipes, listButton) {
    // const buttonName = e;
    // console.log('bouton cliqué : ', buttonName);

    const buttonName = listButton;
    // console.log('=============@ buttonName: ', buttonName);
    // console.log('=============@ recipes: ', recipes);

    if (buttonName === 'Ingrédients') {
      const listIngredients = [];

      recipes.forEach((recipe) => {
        const ingredientRecipes = recipe.ingredients;

        ingredientRecipes.forEach((ingredientRecipe) => {
          listIngredients.push(ingredientRecipe.ingredient);
        });
      });
      return buttonFilter.createUniqueList(listIngredients);
    }
    if (buttonName === 'Appareils') {
      const listDevices = [];
      recipes.forEach((recipe) => listDevices.push(recipe.appliance));

      return buttonFilter.createUniqueList(listDevices);
    }
    if (buttonName === 'Ustensils') {
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

  displaylist(finalList, listButton) {
    // const buttonList = document.querySelector(`#${e} .choice`);
    // console.log('-------------> e', `#${listButton}`);

    const buttonList = document.querySelector(`#${listButton}`)
      .nextElementSibling.nextElementSibling;
    // console.log('buttonList', buttonList);
    finalList.forEach((list) => {
      const buttonModel = buttonFactory(list);
      buttonList.appendChild(buttonModel);
    });
  }

  displayTitleButton(title) {
    console.log('&&&&&&&&&&&&&&&&& title', title);

    if (title === 'Ingrédients') {
      return 'Ingrédents';
    }
    if (title === 'Appareils') {
      return 'Appareils';
    }
    if (title === 'Ustensils') {
      return 'Ustensils';
    }
  }

  showList(e) {
    const list = document.querySelector(`#${e}`).nextElementSibling
      .nextElementSibling;
    const filterIcon = list.previousElementSibling;

    const element = document.querySelector(`#${e}`);
    // console.log('-------------> element', element);
    // console.log('-------------> list', list);
    // console.log('-------------> filterIcon', filterIcon);
    // console.log('-------------> Button wordSEARCHBAR', wordSEARCHBAR);

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
      const wordChoice = document.querySelectorAll('.choice li');
      if (wordSEARCHBAR === '') {
        //if not word enter in the search bar
        for (let i = 0; i < wordChoice.length; i++)
          wordChoice[i].style.display = 'block';
      }
    }
  }
}

document.querySelectorAll('.buttonBarSearch').forEach((button) => {
  button.addEventListener('click', (e) => {
    e.preventDefault();
    buttonFilter.showList(e.currentTarget.id);
  });
});

const buttonFilter = new ButtonFilter(dataFetch);

const listButtons = ['Ingrédients', 'Appareils', 'Ustensils'];
listButtons.forEach((listButton) => {
  const finalList = buttonFilter.createListElement(dataFetch, listButton);
  buttonFilter.displaylist(finalList, listButton);
});

taglaunch();
