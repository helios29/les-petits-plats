export function tagFactory(tag) {
  console.log('tag', tag);

  const tagDiv = document.createElement('div');
  tagDiv.classList.add('tag');

  const tagElement = document.createElement('div');
  tagElement.classList.add('tagElement');
  tagElement.innerText = tag;

  const tagCloseButton = document.createElement('button');
  tagCloseButton.classList.add('btnTag');
  tagCloseButton.innerHTML = `<i class="fa-regular fa-circle-xmark"></i>`;

  tagDiv.appendChild(tagElement);
  tagDiv.appendChild(tagCloseButton);

  console.log('tagDiv', tagDiv);
  return tagDiv;
}
