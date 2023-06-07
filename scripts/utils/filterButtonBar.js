// // ButtonBAR EVENT
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
