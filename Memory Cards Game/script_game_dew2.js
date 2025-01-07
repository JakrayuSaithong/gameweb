function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

const cards = document.querySelectorAll('.cards');
let flippedCards = [];
let timer;
let startTime = 0;
let canFlip = true;
const timeRemainingElement = document.getElementById('time-remaining');
let formattedTime;

function flipCard() {
  if (!timer) {
    startTime = new Date();
    timer = setInterval(updateTimer, 1000);
  }

  if (canFlip && !this.classList.contains('visible')) {
    this.classList.add('visible');
    flippedCards.push(this);

    if (flippedCards.length === 2) {
      canFlip = false;
      setTimeout(checkMatch, 500);
    }
  }
}

function updateTimer() {
  const currentTime = new Date();
  const timeDiff = Math.floor((currentTime - startTime) / 1000);
  formattedTime = formatTime(Math.floor(timeDiff / 3600)) + ':' + formatTime(Math.floor((timeDiff % 3600) / 60)) + ':' + formatTime(timeDiff % 60);
  timeRemainingElement.textContent = formattedTime;
}

function formatTime(time) {
  return time < 10 ? `0${time}` : time;
}

function checkMatch() {
  const card1Id = flippedCards[0].querySelector('.card-value').id;
  const card2Id = flippedCards[1].querySelector('.card-value').id;

  if (card1Id === card2Id) {
    flippedCards.forEach(card => card.classList.add('matched'));
  } else {
    flippedCards.forEach(card => card.classList.remove('visible'));
  }
  flippedCards = [];
  canFlip = true;
  
  const matchedCards = document.querySelectorAll('.cards.matched');
  if (matchedCards.length === cards.length) {
    clearInterval(timer);
    showModal();
  }
}

function showModal() {
  const modalElement = document.getElementById('exampleModal');
  const timeSaveElement = document.getElementById('time-save');
  timeSaveElement.textContent = formattedTime;

  const myModal = new bootstrap.Modal(modalElement, {
    backdrop: 'static',
    keyboard: false
  });
  myModal.show();
}

cards.forEach(card => card.addEventListener('click', flipCard));

const cardValues = document.querySelectorAll('.card-value');
const cardValuesArray = Array.from(cardValues);
shuffleArray(cardValuesArray);

cardValuesArray.forEach((value, index) => {
  cards[index].querySelector('.card-front').appendChild(value);
});