'use strict';
let ran = Math.trunc(Math.random() * 20) + 1;

let score = 20;
let highScore = 0;

document.querySelector('.check').addEventListener('click', function () {
  const guess = Number(document.querySelector('.guess').value);
  // when there is no input
  if (!guess) {
    document.querySelector('.message').textContent = '🤷‍♀️ No Number ';

    //when player win
  } else if (guess === ran) {
    document.querySelector('.message').textContent = '🎉 Correct Number!';

    document.querySelector('.number').textContent = ran;

    document.querySelector('body').style.backgroundColor = '#60b347';

    document.querySelector('.number').style.width = '30rem';

    //High-score
    if (highScore < score) {
      highScore = score;
      document.querySelector('.highscore').textContent = score;
    }

    //when no chance remaining
  } else if (score <= 1) {
    document.querySelector('.message').textContent = '💥 You Lost The Game';
    document.querySelector('.score').textContent = 0;

    //when guess is too high
  } else if (guess > ran) {
    document.querySelector('.message').textContent = '📈 Too High';
    score--;
    document.querySelector('.score').textContent = score;

    //when guess is too low
  } else if (guess < ran) {
    document.querySelector('.message').textContent = '📉 Too Low';
    score--;
    document.querySelector('.score').textContent = score;
  }
});

//Event for play again
document.querySelector('.again').addEventListener('click', function () {
  ran = Math.trunc(Math.random() * 20) + 1;

  document.querySelector('.message').textContent = 'Start guessing...';
  document.querySelector('.number').textContent = '?';
  document.querySelector('.score').textContent = 20;
  score = 20;
  document.querySelector('.guess').value = '';
  document.querySelector('body').style.backgroundColor = '#222';

  document.querySelector('.number').style.width = '15rem';
});
