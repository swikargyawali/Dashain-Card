// Simple deck + gameplay
const suits = ["♠", "♥", "♦", "♣"];
const ranks = [
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "J",
  "Q",
  "K",
  "A",
];
// value map for comparison (2 lowest, A highest)
const valueMap = {};
ranks.forEach((r, i) => (valueMap[r] = i + 2)); // 2 ->2, A->14

let deck = [];
let round = 0,
  score = { p1: 0, p2: 0, tie: 0 };

const hand1El = document.getElementById("hand1");
const hand2El = document.getElementById("hand2");
const res1El = document.getElementById("res1");
const res2El = document.getElementById("res2");
const roundInfo = document.getElementById("roundInfo");
const scoreBoard = document.getElementById("scoreBoard");

function buildDeck() {
  deck = [];
  for (const s of suits) {
    for (const r of ranks) {
      deck.push({ suit: s, rank: r, value: valueMap[r] });
    }
  }
}
function shuffleDeck() {
  // Fisher-Yates
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
}

function renderCard(card) {
  const div = document.createElement("div");
  div.className =
    "card" + (card.suit === "♥" || card.suit === "♦" ? " red" : "");
  div.innerHTML = `<div class="rank">${card.rank}</div><div class="suit">${card.suit}</div><div style="font-size:11px; text-align:right;">${card.rank}</div>`;
  return div;
}

function clearBoard() {
  hand1El.innerHTML = "";
  hand2El.innerHTML = "";
  res1El.textContent = "";
  res2El.textContent = "";
}

function dealCards(count = 2) {
  clearBoard();
  if (deck.length < count * 2) {
    alert("Deck ma card कम छ — पुन: shuffle गर्नुहोस्!");
    return;
  }
  const p1 = [],
    p2 = [];
  for (let i = 0; i < count; i++) {
    p1.push(deck.pop());
    p2.push(deck.pop());
  }
  // render
  p1.forEach((c) => hand1El.appendChild(renderCard(c)));
  p2.forEach((c) => hand2El.appendChild(renderCard(c)));
  // decide winner by sum value
  const sum = (arr) => arr.reduce((s, c) => s + c.value, 0);
  const v1 = sum(p1),
    v2 = sum(p2);
  round++;
  roundInfo.textContent = `Rounds played: ${round}`;
  if (v1 > v2) {
    res1El.textContent = "Jityo! 🎉";
    res2El.textContent = "Haryo 😅";
    score.p1++;
  } else if (v2 > v1) {
    res2El.textContent = "Jityo! 🎉";
    res1El.textContent = "Haryo 😅";
    score.p2++;
  } else {
    res1El.textContent = res2El.textContent = "Tie — bhayo? 😉";
    score.tie++;
  }
  scoreBoard.textContent = `Score — Timi: ${score.p1} | Sathi: ${score.p2} | Ties: ${score.tie}`;
}

// initial setup
buildDeck();
shuffleDeck();

document.getElementById("shuffleBtn").addEventListener("click", () => {
  buildDeck();
  shuffleDeck();
  round = 0;
  score = { p1: 0, p2: 0, tie: 0 };
  clearBoard();
  roundInfo.textContent = `Rounds played: ${round}`;
  scoreBoard.textContent = `Score — Timi: ${score.p1} | Sathi: ${score.p2} | Ties: ${score.tie}`;
  alert("Deck shuffled — Dashain ko mahol ready! 🎊");
});

document.getElementById("dealBtn").addEventListener("click", () => {
  dealCards(2);
});

document.getElementById("roundBtn").addEventListener("click", () => {
  // reset for new round but keep same deck order
  clearBoard();
});

document.getElementById("autoBtn").addEventListener("click", () => {
  // auto play 10 quick rounds (best effort; synchronous)
  let roundsToPlay = 10;
  // if not enough cards left rebuild/shuffle
  if (deck.length < roundsToPlay * 2) {
    buildDeck();
    shuffleDeck();
    round = 0;
    score = { p1: 0, p2: 0, tie: 0 };
    scoreBoard.textContent = `Score — Timi: ${score.p1} | Sathi: ${score.p2} | Ties: ${score.tie}`;
  }
  for (let i = 0; i < roundsToPlay; i++) {
    dealCards(2);
  }
  alert("Auto play finished — kasto ramailo! 🎉");
});

// small festive greeting on load
window.addEventListener("load", () => {
  setTimeout(() => {
    // show small dashain greeting
    console.log("Dashain ko subhakamana! — Enjoy taash :)");
  }, 600);
});
