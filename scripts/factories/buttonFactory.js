export function buttonFactory(list) {
  const liButtonList = document.createElement('li');
  liButtonList.classList.add('notClicked');
  liButtonList.textContent = list;
  return liButtonList;
}
