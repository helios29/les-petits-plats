// Update button listing
function filterElementsButton(words, wordChoice) {
  for (let i = 0; i < wordChoice.length; i += 1) {
    if (wordChoice[i].textContent.toLowerCase().includes(words)) {
      wordChoice[i].style.display = 'block';
    } else {
      wordChoice[i].style.display = 'none';
    }
  }
}

// ButtonBAR EVENT
document.querySelectorAll('.buttonBarSearch').forEach((buttonBar) => {
  buttonBar.addEventListener('keyup', (e) => {
    const wordButtonBAR = e.target.value;
    const wordChoice = document.querySelectorAll('.choice li');
    filterElementsButton(wordButtonBAR, wordChoice);
  });
});
