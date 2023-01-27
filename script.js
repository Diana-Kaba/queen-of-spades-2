let cards = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];

let turn = 1;
let number = 0;

let cardsField = document.getElementById("cards");
let info = document.getElementById("info");
// let cardNumber = document.getElementById("card");
// let setCard = document.getElementById("set_card");
let rel = document.getElementById("reload");

let realCards = document.getElementById("real_cards");
let playedCardsField = document.getElementById("played_cards");

let playedCards = [];

let isGame = true;

//cardNumber.value = 0;
info.innerHTML = "Take the card!";

function shuffle(arr) {
  let rand, temp;
  for (let i = 0; i < arr.length; i++) {
    rand = Math.floor(Math.random() * (i + 1));
    temp = arr[rand];
    arr[rand] = arr[i];
    arr[i] = temp;
  }
  return arr;
}

shuffle(cards);

function showCards(cards) {
  return cards.join(", ");
}

cardsField.innerHTML = showCards(cards);

function generateCards(cards, cardsF, show = false) {
  cardsF.innerHTML = "";
  for (let i = 0; i < cards.length; i++) {
    cardsF.innerHTML += `<div id="rc_${cards[i]}" class="card">${
      show ? cards[i] : ""
    }</div>`;
  }
}

function removeCard(number) {
  cards.splice(number, 1);
  cardsField.innerHTML = showCards(cards);
}

function addEventCardList() {
  let card_elements = document.getElementsByClassName("card");

  for (let i = 0; i < card_elements.length; i++) {
    card_elements[i].addEventListener("click", play);
  }
}

function removeCard(card) {
  playedCards.push(card);
  for (let i = 0; i < cards.length; i++) {
    if (cards[i] == card) number = i;
  }
  cards.splice(number, 1);

  cardsField.innerHTML = cards;

  generateCards(cards, realCards, false);

  generateCards(playedCards, playedCardsField, true);
  addEventCardList();
}

function newPlay() {
  location.reload();
  return false;
}

function play(event) {
  if (!isGame) return;
  let el = event.target;
  let elId = el.id;
  try {
    if (myMove(elId)) return;
    setTimeout(computerMove, 2000);
  } catch (ex) {
    info.innerHTML = ex.message;
  }
}

function myMove(elId) {
  let b = false;
  let card = elId.substr(3);
  if (checkWin("You ", card)) {
    b = true;
  } else {
    setTimeout(removeCard.bind(null, card), 1000);
  }
  return b;
}

function computerMove() {
  isGame = false;
  let b = false;
  number = Math.floor(Math.random() * cards.length);
  let card = cards[number];
  if (checkWin("I ", card)) {
    b = true;
  }
  setTimeout(removeCard.bind(null, card), 1000);
  isGame = true;
  return b;
}

function checkWin(who, card) {
  info.innerHTML = who + " take " + card;
  if (card == "Q") {
    info.innerHTML = who + " win";
    confetti();

    stop();
    fly();
    return true;
  }
  return false;
}

function stop() {
  let card_elements = document.getElementsByClassName("card");
  for (let i = 0; i < card_elements.length; i++) {
    card_elements[i].removeEventListener("click", play);
  }
  isGame = false;
}

function fly() {
  let card_elements = document.getElementsByClassName("card");
  for (let i = 0; i < card_elements.length; i++) {
    card_elements[i].classList.add("rotate");
  }
}

window.onload = function () {
  generateCards(cards, realCards, false);
  addEventCardList();
  rel.addEventListener("click", newPlay);
};

function confetti() {
  $.each($(".particletext.confetti"), function () {
    var confetticount = ($(this).width() / 50) * 10;
    for (var i = 0; i <= confetticount; i++) {
      $(this).append(
        '<span class="particle c' +
          $.rnd(1, 2) +
          '" style="top:' +
          $.rnd(10, 50) +
          "%; left:" +
          $.rnd(0, 100) +
          "%;width:" +
          $.rnd(6, 8) +
          "px; height:" +
          $.rnd(3, 4) +
          "px;animation-delay: " +
          $.rnd(0, 30) / 10 +
          's;"></span>'
      );
    }
  });
}

jQuery.rnd = function (m, n) {
  m = parseInt(m);
  n = parseInt(n);
  return Math.floor(Math.random() * (n - m + 1)) + m;
};

initparticles();
