export function buttonFactory(list) {
  const liButtonList = document.createElement('li');
  liButtonList.textContent = list;
  return liButtonList;
}
