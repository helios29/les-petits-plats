export function buttonFactory(list, buttonName) {
  
  const liButtonList = document.createElement('li');
  liButtonList.classList.add('notClicked');
  liButtonList.setAttribute('data-tag', `${buttonName}`);
  liButtonList.textContent = list;
  
  return liButtonList;
}
