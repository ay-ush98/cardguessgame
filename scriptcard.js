const fruits = [
  { name: "Apple", img: "https://up.yimg.com/ib/th/id/OIP.3-zrV5_l8F7c65Xr1DflrgHaHa?pid=Api&rs=1&c=1&qlt=95&w=109&h=109" },
  { name: "Banana", img: "https://tse1.mm.bing.net/th/id/OIP._dm5grCTwNFIzz-lBPPenAHaJE?pid=Api&P=0&h=180" },
  { name: "Orange", img: "https://tse1.mm.bing.net/th/id/OIP.Nu08ezFrxYy1bPHv4EbYVQAAAA?pid=Api&P=0&h=180" },
  { name: "Grapes", img: "https://tse4.mm.bing.net/th/id/OIP.iDxI1s15TCL3xYo4yJHf0wHaFj?pid=Api&P=0&h=180" },
  { name: "Pineapple", img: "https://tse3.mm.bing.net/th/id/OIP.YgJ35_c86TUwj10CbwIAXQHaEL?pid=Api&P=0&h=180" }
];
let shownFruitIndex, chances;
const shownCard = document.getElementById('shownCard');
const cardGrid = document.getElementById('cardGrid');
const chancesDisplay = document.getElementById('chances');
const resultDisplay = document.getElementById('result');
const resetBtn = document.getElementById('resetBtn');

function showShownCard() {
  const fruit = fruits[shownFruitIndex];
  shownCard.innerHTML = `
    <img src="${fruit.img}" alt="${fruit.name}" />
    <div>${fruit.name}</div>
  `;
}

function createCard(fruit, index) {
  const card = document.createElement("div");
  card.className = "card";
  card.innerHTML = `
    <div class="card-inner">
      <div class="card-front"></div>
      <div class="card-back">
        <img src="${fruit.img}" alt="${fruit.name}" />
        ${fruit.name}
      </div>
    </div>
  `;
  card.addEventListener("click", () => guessCard(index, card));
  cardGrid.appendChild(card);
}

function guessCard(index, cardElement) {
  if (chances <= 0 || cardElement.classList.contains("flipped")) return;

  cardElement.classList.add("flipped");
  chances--;
  chancesDisplay.textContent = chances;

  if (index === shownFruitIndex) {
    resultDisplay.textContent = "🎉 Correct! You found the card!";
  } else if (chances === 0) {
    resultDisplay.textContent = "❌ Out of chances! Try again.";
  }
}

function initGame() {
  chances = 2;
  shownFruitIndex = Math.floor(Math.random() * fruits.length);
  chancesDisplay.textContent = chances;
  resultDisplay.textContent = '';
  cardGrid.innerHTML = '';
  showShownCard();

  const shuffled = [...fruits].sort(() => Math.random() - 0.5);
  shuffled.forEach((fruit, index) => createCard(fruit, fruits.indexOf(fruit)));
}

resetBtn.addEventListener('click', initGame);

initGame();