import Elements from './elements.js';

class Controller {
  constructor(cardsNumber) {
    this.elements = new Elements(cardsNumber);
    this.prevCard = null;
    this.startClock = true;
    this.time = null;
    this.MAX_CLICKS = 2;
    this.PAUSE_DURATION = 1000;
    
    this.showAllCards(); // Show all cards at the start
    this.clickCard();
  }

  showAllCards() {
    const { cards } = this.elements;
    cards.forEach(card => {
      card.classList.add('change'); // Assuming 'change' class reveals the card
    });

    // Hide cards after 5 seconds
    setTimeout(() => {
      cards.forEach(card => {
        card.classList.remove('change'); // Hide the cards
      });
    }, 5000);
  }

  clickCard() {
    const { attempts, cards } = this.elements;

    cards.forEach((card) => {
      card.addEventListener('click', () => {
        if (this.startClock) this.setTime();
        attempts.click++;
        card.classList.add('change');

        if (attempts.click === this.MAX_CLICKS) {
          this.handleCardSelection(card, attempts);
        } else {
          this.prevCard = card;
        }

        this.startClock = false;
      });
    });
  }

  handleCardSelection(currentCard, attempts) {
    const { cards } = this.elements;

    cards.forEach((card) => {
      card.classList.add('pause');
      setTimeout(() => card.classList.remove('pause'), this.PAUSE_DURATION);
    });

    if (this.prevCard.dataset.index === currentCard.dataset.index) {
      attempts.correct++;
      currentCard.classList.add('stop');
      this.prevCard.classList.add('stop');
    } else {
      attempts.wrong++;
      setTimeout(() => {
        currentCard.classList.remove('change');
        this.prevCard.classList.remove('change');
      }, this.PAUSE_DURATION);
    }

    attempts.click = 0;
    this.endGame(attempts);
    console.log(`Correct: ${attempts.correct}, Wrong: ${attempts.wrong}`);
  }

  endGame({ correct }) {
    const { cardsNumber, modal, modalBtn, wrong, attempts, timer, modalTime } = this.elements;

    if (correct === cardsNumber / 2) {
      console.log('You Won');
      this.startClock = true;
      this.stopTime();
      modal.style.visibility = 'visible';
      modal.style.opacity = '1';

      const timerClone = timer.cloneNode(true);
      modalTime.append(timerClone);
      wrong.textContent = attempts.wrong;

      modalBtn.onclick = () => {
        location.reload();
      };
    } else {
      console.log('Not Yet');
    }
  }

  setTime() {
    if (this.time) return; // Prevent multiple intervals

    let int = 1;
    const { timer } = this.elements;

    this.time = setInterval(() => {
      const seconds = int % 60;
      timer.children[1].innerHTML = seconds > 9 ? seconds : `0${seconds}`;
      const minutes = Math.floor(int / 60);
      timer.children[0].innerHTML = minutes > 9 ? minutes : `0${minutes}`;
      int++;
    }, 1000);
  }

  stopTime() {
    clearInterval(this.time);
    this.time = null; // Reset timer reference
  }
}

export default Controller;
