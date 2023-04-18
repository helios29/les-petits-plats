export function receipeFactory(data) {
  const { name, ingredients, quantity, unit, time, description } = data;

  function getUserCardDOM() {

    const receipeCard = document.createElement('div');
    receipeCard.classList.add('receipeCard');

    const img = document.createElement('div');
    img.classList.add('img');

    const cardDescription = document.createElement('div');
    cardDescription.classList.add('cardDescription');

    const cardTitleTime = document.createElement('div');
    cardTitleTime.classList.add('cardTitleTime');

    const h2 = document.createElement('h2');
    h2.classList.add('titleReceipt');
    h2.textContent = name;
    h2.setAttribute('aria-label', `nom de la recette ${name}`);

    const mealTimeLogo = document.createElement('div');
    mealTimeLogo.classList.add('mealTimeLogo');
    mealTimeLogo.innerHTML = `<i class="fa-regular fa-clock"></i>`;
    mealTimeLogo.setAttribute('aria-label', `temps de la recette ${name}`);

    const mealTime = document.createElement('div');
    mealTime.classList.add('mealTime');
    mealTime.innerHTML = `${data.time} min`;
    mealTimeLogo.appendChild(mealTime);

    const cardIngredientDescription = document.createElement('div');
    cardIngredientDescription.classList.add('cardIngredientDescription');

    const ingredient = document.createElement('div');
    ingredient.classList.add('listIngredients');

    ingredients.forEach((meal) => {
      const element = document.createElement('div');
      if (meal.unit) {
        if (meal.unit === 'grammes') {
          element.innerHTML = `${meal.ingredient} : ${meal.quantity} g`;
        } else if (meal.unit === 'undefined') {
          element.innerHTML = `${meal.ingredient} : ${meal.quantity}`;
        } else if (meal.unit === 'cuillères à soupe') {
          element.innerHTML = `${meal.ingredient} : ${meal.quantity} cuillères`;
        } else {
          element.innerHTML = `${meal.ingredient} : ${meal.quantity} ${meal.unit}`;
        }
      } else {
        element.innerHTML = `${meal.ingredient} : ${meal.quantity}`;
      }

      ingredient.appendChild(element);
    });

    const mealDescription = document.createElement('p');
    mealDescription.classList.add('mealDescription');
    mealDescription.textContent = data.description;

    cardTitleTime.appendChild(h2);
    cardTitleTime.appendChild(mealTimeLogo);

    cardIngredientDescription.appendChild(ingredient);
    cardIngredientDescription.appendChild(mealDescription);

    cardDescription.appendChild(cardTitleTime);
    cardDescription.appendChild(cardIngredientDescription);

    receipeCard.appendChild(img);
    receipeCard.appendChild(cardDescription);

    return receipeCard;
  }

  return {
    name,
    ingredients,
    quantity,
    unit,
    time,
    description,
    getUserCardDOM,
  };
}
