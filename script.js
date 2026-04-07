document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.card');
  const button = document.getElementById('shuffle-button');

  fetch('tarot-deck.json')
    .then(res => res.json())
    .then(deck => {
      const images = {
        "The High Priestess": "images/tarot/high-priestess.png",
        "The Lovers": "images/tarot/lovers.png",
        "The Moon": "images/tarot/moon.png",
        "The Star": "images/tarot/star.png",
        "The Tower": "images/tarot/tower.png"
      };

      function randomCards(pool, count) {
        return [...Array(count)].map(() => pool[Math.floor(Math.random() * pool.length)]);
      }

      function updateReading() {
        randomCards(deck.deck, 3).forEach((cardInfo, i) => {
          const cardEl = cards[i].querySelector('.card-wrapper');
          const frontEl = cards[i].querySelector('.front img');
          const backEl = cards[i].querySelector('.back img');
          const textEl = cards[i].querySelector('.back p');

          // Delay the flip so the effect is smooth
          setTimeout(() => {
            cardEl.classList.add('flipped');
            backEl.src = images[cardInfo.name];
            frontEl.src = images[cardInfo.name];
            textEl.textContent = cardInfo.meaning;
          }, 300 * i);
        });
      }

      function resetFlips() {
        cards.forEach(card => card.querySelector('.card-wrapper').classList.remove('flipped'));
      }

      button.addEventListener('click', () => {
        resetFlips();
        updateReading();
      });

      // Initial flip
      updateReading();
    })
    .catch(err => {
      console.log('Tarot deck loading failed', err);
    });
});
