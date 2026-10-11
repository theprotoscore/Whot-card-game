let startCard; // let hidden;
let deck;
let computerHand = [];
let playerHand = [];

const computerHandContainer = document.getElementById("computer-cards");
const playerHandContainer = document.getElementById("your-cards");

window.onload = function () {
  buildDeck();
  shuffleDeck();
  startGame();

  // Initial render on page load
  render(computerHand, computerHandContainer);
  render(playerHand, playerHandContainer);
};

function buildDeck() {
  const shapes = ["triangle", "circle", "plus", "square", "star"];
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
  deck = [];

  for (let shape = 0; shape < shapes.length; shape++) {
    for (let number = 0; number < numbers.length; number++) {
      deck.push(`${shapes[shape]}_${numbers[number]}`);
    }
  }
}

function shuffleDeck() {
  for (let currentIndex = 0; currentIndex < deck.length; currentIndex++) {
    let randomIndex = Math.floor(Math.random() * deck.length);

    let temp = deck[currentIndex];
    deck[currentIndex] = deck[randomIndex];
    deck[randomIndex] = temp;
  }
}

function startGame() {
  startCard = deck.pop(); // hidden = deck.pop();

  const cardImg = document.createElement("img");
  cardImg.src = `./cards/${startCard}.svg`;
  document.getElementById("top-cards-container").append(cardImg);

  dealCards(computerHand, "computer-cards");
  dealCards(playerHand, "your-cards");

  console.log(deck);
  console.log(startCard);
  console.log(computerHand);
  console.log(playerHand);
}

function dealCards(hand, playerHtml) {
  if (playerHtml === "computer-cards" || playerHtml === "your-cards") {
    for (let i = 0; i < 5; i++) {
      let card = deck.pop();
      hand.push(card);
    }
  }
}

// 2. Function to render the list to the DOM
function render(hand, handContainer) {
  handContainer.innerHTML = ""; // Clear current list

  hand.forEach((card) => {
    let cardImg = document.createElement("img");
    cardImg.src = `./cards/${card}.svg`;

    cardImg.addEventListener("click", function () {
      deleteCard(cardImg, hand, handContainer);
    });
    handContainer.appendChild(cardImg);
  });
}

function deleteCard(cardImg, hand, handContainer) {
  const cardFile = cardImg.src.split("/").at(-1);
  const index = hand.findIndex((card) => `${card}.svg` === cardFile);
  if (index !== -1) hand.splice(index, 1);
  render(hand, handContainer); // Automatically updates the screen
}
