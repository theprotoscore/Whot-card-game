let currentCard = null;
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

function createCard(c) {
  const cardImg = document.createElement("img");
  cardImg.src = `./cards/${c}.svg`;
  return cardImg;
}

function startGame() {
  currentCard = deck.pop(); // hidden = deck.pop();
  document.getElementById("static-cards").append(createCard(currentCard));

  dealCards(computerHand);
  dealCards(playerHand);

  console.log(deck);
  // console.log(currentCard);
  // console.log(computerHand);
  // console.log(playerHand);
}

function dealCards(hand) {
  for (let i = 0; i < 5; i++) {
    let card = deck.pop();
    hand.push(card);
  }
}

// 2. Function to render the list to the DOM
function render(hand, handContainer) {
  handContainer.innerHTML = ""; // Clear current list

  hand.forEach((cardName) => {
    const cardImg = createCard(cardName);

    cardImg.addEventListener("click", function (event) {
      deleteCard(cardImg, hand, handContainer);

      // Make clicked card current card
      currentCard = event.currentTarget;
      const lastChild = document.querySelector("#static-cards > :last-child");
      lastChild.remove();
      document.getElementById("static-cards").append(currentCard);
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
