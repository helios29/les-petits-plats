export function tagFactory(tag, buttonName) {
  const tagDiv = document.createElement('div');
  tagDiv.classList.add('tagSelected');
  tagDiv.setAttribute('data-tag', `${buttonName}`);

  const tagElement = document.createElement('div');
  tagElement.classList.add('tagElement');
  tagElement.innerText = tag;

  const tagCloseButton = document.createElement('button');
  tagCloseButton.classList.add('btnTag');
  tagCloseButton.innerHTML = `<i class="fa-regular fa-circle-xmark"></i>`;

  tagDiv.appendChild(tagElement);
  tagDiv.appendChild(tagCloseButton);

  return tagDiv;
}
