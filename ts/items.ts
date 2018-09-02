const alphabet = "abcdefghijklmnopqrstuvwxyz".split('');

function createItems() {
  const source = document.querySelector('#source');
  for (let i = 0; i < 11; i++) {
    const item = createItem(source.children.length);
    source.appendChild(item);
  }
}

function createItem(idx: number): HTMLElement {
  const item = document.createElement('li');
  const letter = alphabet[idx];
  item.id = letter;
  item.innerText = letter.toUpperCase();
  item.classList.add('draggable');
  return item;
}
