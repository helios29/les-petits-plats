/* eslint-disable class-methods-use-this */
// eslint-disable-next-line max-classes-per-file
import { receipeFactory } from '../factories/mealFactory.js';
import { buttonFactory } from '../factories/buttonFactory.js';

class Recipes {
  constructor(recipes) {
    this.recipes = recipes;
  }

  fetchData() {
    return fetch('/data/recipes.json')
      .then((response) => response.json())
      .then((data) => data.recipes)
      .catch((err) => console.log(err));
  }

  displayData(recipes) {
    const receipesList = document.querySelector('#receipesList');

    recipes.forEach((receipe) => {
      const receipeModel = receipeFactory(receipe);
      const userCardDOM = receipeModel.getUserCardDOM();
      receipesList.appendChild(userCardDOM);
    });
  }
}

class ButtonFilter extends Recipes {
  constructor(data, buttonElement) {
    super(data);
    this.buttonElement = buttonElement;
  }

  createListElement(e, recipes) {
    const buttonName = e;
    console.log('bouton cliqué : ', buttonName);

    if (buttonName === 'Ingrédients') {
      let listIngredients = [];

      recipes.forEach((recipe) => {
        let ingredientRecipes = recipe.ingredients;

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
    } else if (buttonName === 'Ustensils') {
      const listUstensils = [];

      recipes.forEach((recipe) => {
        let ustensilRecipes = recipe.ustensils;

        ustensilRecipes.forEach((ustensilRecipe) => {
          listUstensils.push(ustensilRecipe);
        });
      });
      return buttonFilter.createUniqueList(listUstensils);
    }
  }

  createUniqueList(list) {
    const uniquelist = [...new Set(list)];
    console.log('uniquelist', uniquelist);
    return uniquelist.sort();
  }

  displaylist(finalList, e) {
    // const buttonList = document.querySelector(`#${e} .choice`);
    console.log('-------------> e', `#${e}`);

    const buttonList = document.querySelector(`#${e}`).nextElementSibling
      .nextElementSibling;
    console.log('buttonList', buttonList);
    finalList.forEach((list) => {
      const buttonModel = buttonFactory(list);
      buttonList.appendChild(buttonModel);
    });
  }

  displayTitleButton(title) {
    console.log('&&&&&&&&&&&&&&&&& title', title);

    if (title === 'Ingrédients') {
      return 'Ingrédents';
    } else if (title === 'Appareils') {
      return 'Appareils';
    } else if (title === 'Ustensils') {
      return 'Ustensils';
    }
  }

  showList(e) {
    const list = document.querySelector(`#${e}`).nextElementSibling
      .nextElementSibling;
    const filterIcon = list.previousElementSibling;

    const element = document.querySelector(`#${e}`);
    console.log('-------------> element', element);
    console.log('-------------> list', list);
    console.log('-------------> filterIcon', filterIcon);

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

const recipes = new Recipes();
const dataFetch = await recipes.fetchData();
console.log('dataFetch', dataFetch);
recipes.displayData(dataFetch);

document.querySelectorAll('.buttonBarSearch').forEach((button) => {
  button.addEventListener('click', (e) => {
    e.preventDefault();
    const finalList = buttonFilter.createListElement(
      e.currentTarget.id,
      dataFetch
    );

    const button = document.querySelector(`#${e.currentTarget.id}`);
    console.log('-------------> list ', button.className);

    if (button.className === 'buttonBarSearch close')
      buttonFilter.displaylist(finalList, e.currentTarget.id);

    buttonFilter.showList(e.currentTarget.id);
  });
});

const buttonFilter = new ButtonFilter();

// SEARCHBAR EVENT
const searchBar = document.querySelector('#searchbar');

searchBar.addEventListener('keyup', (e) => {
  const words = e.target.value;
  const recipes = document.querySelectorAll('.receipeCard');
  filterElements(words, recipes);
});

function filterElements(words, recipes) {
  if (words.length > 2) {
    for (let i = 0; i < recipes.length; i++) {
      if (recipes[i].textContent.toLowerCase().includes(words)) {
        recipes[i].style.display = 'block';
      } else {
        recipes[i].style.display = 'none';
      }
    }
  } else {
    displayData(dataFetch)
  }
}
