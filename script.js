// completed => base, high/low card  / card display
// not completed => Number of Cards

// global varible

let playerTurn = 1;
let player1card;
let cardContainer;
let cardContainer2;
const player1Button = document.createElement('button');
const player2Button = document.createElement('button');
const gameInfo = document.createElement('div');
let canClick = true;
let player2FirstCard = 0;
let player2SecondCard = 0;
let player2Diff = 0;
let player1FirstCard = 0;
let player1SecondCard = 0;
let player1Diff = 0;
let currentHighCard = 0;
let playersArray = [];
// player action buttons methods

// Get a random index ranging from 0 (inclusive) to max (exclusive).
const getRandomIndex = (max) => Math.floor(Math.random() * max);

// Shuffle an array of cards
// Shuffle an array of cards
const shuffleCards = (cards) => {
  // Loop over the card deck array once
  for (let currentIndex = 0; currentIndex < cards.length; currentIndex += 1) {
    // Select a random index in the deck
    const randomIndex = getRandomIndex(cards.length);
    // Select the card that corresponds to randomIndex
    const randomCard = cards[randomIndex];
    // Select the card that corresponds to currentIndex
    const currentCard = cards[currentIndex];
    // Swap positions of randomCard and currentCard in the deck
    cards[currentIndex] = randomCard;
    cards[randomIndex] = currentCard;
  }
  // Return the shuffled deck
  return cards;
};

const makeDeck = () => {
  // Initialise an empty deck array
  const newDeck = [];
  // Initialise an array of the 4 suits in our deck. We will loop over this array.
  const suits = ['hearts', 'diamonds', 'clubs', 'spades'];

  // Loop over the suits array
  for (let suitIndex = 0; suitIndex < suits.length; suitIndex += 1) {
    // Store the current suit in a variable
    const currentSuit = suits[suitIndex];

    // initialise variable suitSymbol
    let currentSymbol;

    // set suit symbol to match current suit
    if (currentSuit === 'hearts') {
      currentSymbol = '♥️';
    } else if (currentSuit === 'spades') {
      currentSymbol = '♠️';
    } else if (currentSuit === 'clubs') {
      currentSymbol = '♣️';
    } else {
      currentSymbol = '♦️';
    }

    // set the color of the card (used later to
    // determine the css class which in turn determines the color)
    // does not directly set the color of the card
    let cardColor;
    if (currentSymbol === '♥️' || currentSymbol === '♦️') {
      cardColor = 'red';
    } else {
      cardColor = 'black';
    }

    // Loop from 1 to 13 to create all cards for a given suit
    // Notice rankCounter starts at 1 and not 0, and ends at 13 and not 12.
    // This is an example of a loop without an array.
    for (let rankCounter = 1; rankCounter <= 13; rankCounter += 1) {
      // By default, the card name is the same as rankCounter
      let cardName = `${rankCounter}`;

      // If rank is 1, 11, 12, or 13, set cardName to the ace or face card's name
      if (cardName === '1') {
        cardName = 'A';
      } else if (cardName === '11') {
        cardName = 'J';
      } else if (cardName === '12') {
        cardName = 'Q';
      } else if (cardName === '13') {
        cardName = 'K';
      }

      // Create a new card with the current name, suit, suit symbol, display name colour and rank
      const cardInfo = {
        suitSymbol: currentSymbol,
        suit: currentSuit,
        name: cardName,
        color: cardColor,
        rank: rankCounter,
      };
      // Add the new card to the deck
      newDeck.push(cardInfo);
    }
  }

  // Return the completed card deck
  return newDeck;
};
const deck = shuffleCards(makeDeck());

const createCard = (cardInfo) => {
  const suit = document.createElement('div');
  suit.classList.add('suit', cardInfo.color);
  suit.innerText = cardInfo.suitSymbol;

  const name = document.createElement('div');
  name.classList.add(cardInfo.name, cardInfo.color);
  name.innerText = cardInfo.name;

  const card = document.createElement('div');
  card.classList.add('card');

  card.appendChild(name);
  card.appendChild(suit);

  return card;
};

const output = (message) => {
  gameInfo.innerText = message;
};

const player1Click = () => {
  if (playerTurn === 1 && canClick === true) {
    cardContainer.innerHTML = '';
    canClick = false;

    for (let i = 0; i < 4; i++) {
      player1card = deck.pop();
      // put the object into a array
      playersArray.push(player1card);
    }
    // sort the array by rank and taking the last element and inserting into the second index lastly delete last index
    playersArray.sort((a, b) => a.rank - b.rank);
    console.log(playersArray);
    playersArray.splice(1, 0, playersArray[playersArray.length - 1]);
    playersArray.splice(playersArray.length - 1, 1);
    console.log(playersArray);

    // populate the cards
    playersArray.forEach((player1card) => {
      const cardElement = createCard(player1card);
      if (currentHighCard < player1card.rank) {
        currentHighCard = player1card.rank;
      }
      playersArray.push(player1card.rank);
      cardContainer.appendChild(cardElement);
      playerTurn = 2;
      canClick = true;
    });
    // find the difference between highcard and lowest card
    player1FirstCard = currentHighCard;
    console.log(player1FirstCard);
    player1SecondCard = playersArray[0].rank;
    console.log(player1SecondCard);
    player1Diff = calTheDifference(player1FirstCard, player1SecondCard);
    console.log(`player 1 diff is ${player1Diff}`);
  }
};

const player2Click = () => {
  if (playerTurn === 2 && canClick === true) {
    canClick = false;
    let player2Card;
    playersArray = [];
    for (let i = 0; i < 4; i++) {
      player2Card = deck.pop();
      playersArray.push(player2Card);
    }
    playersArray.sort((a, b) => a.rank - b.rank);
    console.log(playersArray);
    playersArray.splice(1, 0, playersArray[playersArray.length - 1]);
    playersArray.splice(playersArray.length - 1, 1);
    console.log(playersArray);

    playersArray.forEach((player1card) => {
      const cardElement = createCard(player1card);
      if (currentHighCard < player1card.rank) {
        currentHighCard = player1card.rank;
      }
      playersArray.push(player1card.rank);
      cardContainer2.appendChild(cardElement);
      playerTurn = 2;
      canClick = true;
    });

    player2FirstCard = currentHighCard;
    playersArray.sort((a, b) => a - b);
    player2SecondCard = playersArray[0].rank;
    player2Diff = calTheDifference(player2FirstCard, player2SecondCard);
    console.log(`player 2 diff is ${player2Diff}`);

    if (player1Diff > player2Diff) {
      output('player 1 wins');
    } else if (player1Diff < player2Diff) {
      output('player 2 wins');
    } else {
      output('tie');
    }
  }
};
// find the difference array sorting the number to prevent negative result
let diffArray = [];
const calTheDifference = (firstNum, secondNum) => {
  diffArray = [firstNum, secondNum];
  diffArray.sort((a, b) => a - b);
  console.log(`diff array = ${diffArray}`);
  return diffArray[1] - diffArray[0];
};

const initGame = () => {
  cardContainer = document.createElement('div');
  cardContainer.classList.add('card-container');
  document.body.appendChild(cardContainer);
  cardContainer2 = document.createElement('div');
  cardContainer2.classList.add('card-container');
  document.body.appendChild(cardContainer2);
  // initialize button functionality
  player1Button.innerText = 'Player 1 Draw';
  document.body.appendChild(player1Button);

  player2Button.innerText = 'Player 2 Draw';
  document.body.appendChild(player2Button);

  player1Button.addEventListener('click', player1Click);
  player2Button.addEventListener('click', player2Click);

  // fill game info div with starting instructions
  gameInfo.innerText = 'Its player 1 turn. Click to draw a card!';
  document.body.appendChild(gameInfo);
};

initGame();
