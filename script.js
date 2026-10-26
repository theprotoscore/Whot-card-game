let currentCard = null;
let deck;
let computerHand = [];
let playerHand = [];
let currentPlayer = "player"; // "player" or "computer"

const computerHandContainer = document.getElementById("computer-cards");
const playerHandContainer = document.getElementById("your-cards");

window.onload = function () {
  buildDeck();
  shuffleDeck();
  startGame();

  // Initial render on page load
  render(computerHand, computerHandContainer);
  render(playerHand, playerHandContainer);
  startPlayerTurn();
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
  cardImg.id = c;
  return cardImg;
}

function startGame() {
  currentCard = deck.pop(); // hidden = deck.pop();
  document.getElementById("static-cards").append(createCard(currentCard));

  dealCards(computerHand);
  dealCards(playerHand);

  console.log(deck);
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

    if (handContainer.id === "your-cards") {
      cardImg.addEventListener("click", function (event) {
        if (currentPlayer === "player" && isCardValid(cardName)) {
          playCard(cardName, hand, handContainer);
        }
      });
    }

    handContainer.appendChild(cardImg);
  });
}

function isCardValid(cardName) {
  // Deconstruct the card name into shape and number
  const [cardShape, cardNumber] = cardName.split("_");
  const [currentShape, currentNumber] = currentCard.split("_");

  return cardShape === currentShape || cardNumber === currentNumber;
}

function playCard(cardName, hand, handContainer) {
  currentCard = hand.find((card) => card === cardName);
  hand.splice(hand.indexOf(cardName), 1);

  const lastChild = document.querySelector("#static-cards > :last-child");
  lastChild.remove();
  document.getElementById("static-cards").append(createCard(currentCard));
  render(hand, handContainer);

  if (hand.length === 0) {
    alert(`${currentPlayer} Wins`);
    return; // game over: no more turns get scheduled
  }

  currentPlayer = currentPlayer === "player" ? "computer" : "player";
  if (currentPlayer === "computer") {
    setTimeout(computerTurn, 800); // // small delay so it feels like a turn
  } else {
    startPlayerTurn(); // checks whether the player can move
  }
}

function computerTurn() {
  const playable = computerHand.find((c) => isCardValid(c));
  console.log(playable);
  if (playable) {
    playCard(playable, computerHand, computerHandContainer);
  } else {
    // draw a card, then pass the turn
    drawCard(computerHand);
    render(computerHand, computerHandContainer);
    startPlayerTurn();
  }
}

function drawCard(hand) {
  if (deck.length === 0) return false; // nothing to draw, just pass
  hand.push(deck.pop());
  return true;
}

function startPlayerTurn() {
  currentPlayer = "player";

  const hasPlayable = playerHand.some((c) => isCardValid(c));
  if (!hasPlayable) {
    // no legal card: draw one, then pass to the computer
    setTimeout(() => {
      drawCard(playerHand);
      render(playerHand, playerHandContainer);
      currentPlayer = "computer";
      setTimeout(computerTurn, 800);
    }, 1000);
  }
}
