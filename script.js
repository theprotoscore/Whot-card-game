// let hidden;
let deck;
let computerCards = [];
let yourCards = [];

window.onload = function () {
  buildDeck();
  shuffleDeck();
  startGame();
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

  console.log(deck);
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
  // hidden = deck.pop();

  for (let i = 0; i < 5; i++) {
    let cardImg = document.createElement("img");
    let card = deck.pop();
    cardImg.src = `./cards/${card}.svg`;
    computerCards.push(card);
    document.getElementById("computer-cards").append(cardImg);
  }
  console.log(computerCards);

  for (let i = 0; i < 5; i++) {
    let cardImg = document.createElement("img");
    let card = deck.pop();
    cardImg.src = `./cards/${card}.svg`;
    yourCards.push(card);
    document.getElementById("your-cards").append(cardImg);
  }
  console.log(yourCards);
}
