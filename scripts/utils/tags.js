import { tagFactory } from '../factories/tagFactory.js';
import { listTagCreation } from '../utils/filterTags.js';
import { tagCloseShowAllCard } from '../utils/filterTags.js';

let arrayTag = [];
export let buttonName = '';

function onClickTagButton(liClicked, buttonName) {
  console.log('========> onClickEventButton event', liClicked);
  console.log('========> onClickEventButton buttonName', buttonName);

  if (liClicked !== undefined && liClicked.className === 'notClicked') {
    // event.preventDefault();
    console.log(
      '========> onClickEventButton event.textContent',
      liClicked.textContent
    );

    const tagContainer = document.querySelector(`.tagContainer`);
    const tagModel = tagFactory(liClicked.innerText);
    arrayTag.push(tagModel);
    console.log(
      '============> onClickEventButton arrayTag arrayTagLength',
      arrayTag,
      arrayTag.length
    );
    tagContainer.appendChild(tagModel);

    const tagCloseButton = tagModel.children[1];
    console.log(
      '====================> onClickEventButton tagCloseButton',
      tagCloseButton
    );

    liClicked.className = 'clicked';

    if (buttonName === 'Ingrédients') {
      tagModel.style.backgroundColor = '#3282f7';
      tagCloseButton.style.backgroundColor = '#3282f7';
    } else if (buttonName === 'Appareils') {
      tagModel.style.backgroundColor = '#68d9a4';
      tagCloseButton.style.backgroundColor = '#68d9a4';
    } else if (buttonName === 'Ustensils') {
      tagModel.style.backgroundColor = '#ed6454';
      tagCloseButton.style.backgroundColor = '#ed6454';
    }
    return liClicked;
  }
}

function tagclose(e, liClicked) {
  e.remove();
  liClicked.className = 'notClicked';
  return arrayTag.length - 1;
}

function tagEventListener(arrayTag, liClicked) {
  console.log('liClicked.innerText', liClicked.innerText);

  arrayTag.forEach((tag) => {
    tag.addEventListener('click', (e) => {
      const numberOfTag = tagclose(e.currentTarget, liClicked, arrayTag);
      arrayTag.splice(-1);
      tagCloseShowAllCard(numberOfTag);
    });
  });
}

export function taglaunch() {
  const choiceLi = document.querySelectorAll(`.choice li`);
  // console.log('choiceLi', choiceLi);
  choiceLi.forEach((choice) => {
    choice.addEventListener('click', (e) => {
      e.preventDefault();
      const parentButton = e.currentTarget.parentElement;
      const buttonName =
        parentButton.previousElementSibling.previousElementSibling.id;
      const tagElement = onClickTagButton(e.currentTarget, buttonName);
      // console.log('tagElement', tagElement.innerText);

      if (arrayTag.length > 0) {
        console.log('buttonName', buttonName);
        listTagCreation(tagElement.innerText, buttonName);
        tagEventListener(arrayTag, tagElement);
      }
    });
  });
}
