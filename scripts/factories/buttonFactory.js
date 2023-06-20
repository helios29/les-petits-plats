import { taglaunch } from '../utils/tags.js';

//Append element to the button
export function buttonFactory(list, buttonName) {
  
  const liButtonList = document.createElement('li');
  liButtonList.classList.add('notClicked');
  liButtonList.setAttribute('data-tag', `${buttonName}`);
  liButtonList.textContent = list;
  liButtonList.addEventListener('click', taglaunch); //Add the event listener

  return liButtonList;
}
