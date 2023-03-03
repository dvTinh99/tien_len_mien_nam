const deck = [
  "2S", "3S", "4S", "5S", "6S", "7S", "8S", "9S", "10S", "JS", "QS", "KS", "AS",
  "2C", "3C", "4C", "5C", "6C", "7C", "8C", "9C", "10C", "JC", "QC", "KC", "AC",
  "2H", "3H", "4H", "5H", "6H", "7H", "8H", "9H", "10H", "JH", "QH", "KH", "AH",
  "2D", "3D", "4D", "5D", "6D", "7D", "8D", "9D", "10D", "JD", "QD", "KD", "AD"
];
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
const shuffledDeck = shuffle(deck);
const players = [[], [], [], []];
for (let i = 0; i < 13; i++) {
  for (let j = 0; j < 4; j++) {
    players[j].push(shuffledDeck.pop());
  }
}
console.log('players: ', players);


function sortCards(cards) {
  cards.sort((a, b) => {
    const aRank = ranks.indexOf(a.slice(0, -1));
    const bRank = ranks.indexOf(b.slice(0, -1));
    if (aRank === bRank) {
      return suits.indexOf(a.slice(-1)) - suits.indexOf(b.slice(-1));
    }
    return aRank - bRank;
  });
  return cards;
}

const ranks = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
const suits = ["S", "C", "H", "D"];

// Sắp xếp lá bài trong tay của mỗi người
players.forEach(player => sortCards(player));

function playTurn(playerIndex, leadingSuit, playedCards) {
  const hand = players[playerIndex];
  const options = getPlayableCards(hand, leadingSuit);

  if (options.length === 0) {
    return null; // Không có lá bài nào có thể đánh được.
  }

  let chosenCard;
  if (playerIndex === 0) {
    chosenCard = chooseBestCard(hand, options, playedCards);
  } else {
    chosenCard = chooseRandomCard(options);
  }

  hand.splice(hand.indexOf(chosenCard), 1); // Bỏ lá bài đã đánh khỏi tay.
  return chosenCard;
}

function getPlayableCards(hand, leadingSuit) {
  if (!leadingSuit) {
    // Không có lá bài nào đã được đánh ra, tất cả các lá bài đều có thể đánh được.
    return hand;
  }
  // Lọc ra các lá bài của tay có kích hoạt được theo suit.
  return hand.filter(card => card.endsWith(leadingSuit));
}

function chooseRandomCard(options) {
  const index = Math.floor(Math.random() * options.length);
  return options[index];
}
