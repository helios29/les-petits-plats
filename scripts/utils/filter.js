export let wordSEARCHBAR = '';
export let arrayCard = [];

// ButtonBAR EVENT
document.querySelectorAll('.buttonBarSearch').forEach((buttonBar) => {
  buttonBar.addEventListener('keyup', (e) => {
    const wordButtonBAR = e.target.value;
    const wordChoice = document.querySelectorAll('.choice li');
    console.log('wordButtonBAR', wordButtonBAR);
    console.log('wordChoice', wordChoice);
    filterElementsButton(wordButtonBAR, wordChoice);
  });
});

function filterElementsButton(words, wordChoice) {
  for (let i = 0; i < wordChoice.length; i++) {
    if (wordChoice[i].textContent.toLowerCase().includes(words)) {
      wordChoice[i].style.display = 'block';
    } else {
      wordChoice[i].style.display = 'none';
    }
  }
}

// SEARCHBAR EVENT
const searchBar = document.querySelector('#searchbar');

searchBar.addEventListener('keyup', (e) => {
  wordSEARCHBAR = e.target.value;
  console.log('wordSEARCHBAR', wordSEARCHBAR);
  const recipes = document.querySelectorAll('.receipeCard');
  const cardNotFound = document.querySelector('.card__not_found');
  filterElements(wordSEARCHBAR, recipes, cardNotFound);
  filterButtonList(wordSEARCHBAR);
});

export function filterElements(words, recipes, cardNotFound) {
  let nbrCardNone = 0;
  if (words.length > 2) {
    // filter if words > 2 letters
    for (let i = 0; i < recipes.length; i++) {

      if (recipes[i].textContent.toLowerCase().includes(words.toLowerCase())) {
        recipes[i].style.display = 'block';
        arrayCard.push(i)
      } else {
        recipes[i].style.display = 'none';
        nbrCardNone += 1;
      }
    }
  } else {
    // show all cards
    for (let i = 0; i < recipes.length; i++) {
      recipes[i].style.display = 'block';
    }
  }
  if (nbrCardNone === recipes.length) {
    cardNotFound.innerText = `Oups, il ny a aucune recette correspondante. Pourtant nous avons des recettes au thon, à la coco aux pommes etc....`;
  } else {
    cardNotFound.innerText = ``;
  }

}

function filterButtonList(wordSEARCHBAR) {
  document.querySelectorAll('.buttonBarSearch').forEach((buttonBar) => {
    const wordChoice = document.querySelectorAll('.choice li');
    // console.log('wordSEARCHBAR', wordSEARCHBAR);
    // console.log('wordChoice', wordChoice);
    filterElementsButton(wordSEARCHBAR, wordChoice);
  });
}
