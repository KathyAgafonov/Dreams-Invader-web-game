import EnemyController from "./EnemyController.js";
import Player from "./Player.js";
import BulletController from "./BulletController.js";


// ----------------------------- initialization -----------------------------

// canvas
const canvas = document.getElementById("game");
const ctx = canvas.getContext('2d');
canvas.width = innerWidth
canvas.height = innerHeight

// score
const scoreElement = document.getElementById("scoreElement");

// background
const background = new Image();
background.src = "./src/images/game/background-canvas.png";

// ----------------------------- Declaration of game variables -----------------------------

let playerBulletController;
let player;

let enemyBulletController;
let enemyController;

let backgroundSound;

let intervalId;
let rankNumber;
let isGameOver;
let isWinner;
let lifes;
let gameStartTime;
let score;
let scores;
let shown;

let now;
let timeRemaining;
let minutesRemaining;
let secondsRemaining;

let game_time = 120;
export function getGameTime(gTime) {
  game_time = gTime;
}

newGame();
function newGame() {
  playerBulletController = new BulletController(canvas, "./src/images/game/pickle.png");
  player = new Player(canvas, 3, playerBulletController);

  enemyBulletController = new BulletController(canvas, "./src/images/game/scissors.png");
  enemyController = new EnemyController(canvas, enemyBulletController, playerBulletController);

  backgroundSound = new Audio('./src/audio/Cody_Patterson_Scary_Terry.mp3');
  backgroundSound.volume = 0.2;
  backgroundSound.loop = true;

  rankNumber = 1;

  isGameOver = false;
  isWinner = false;

  lifes = 3;

  gameStartTime = new Date().getTime();

  score = 0;
  if (scores == null) {
    initScoresArray();
  }
  shown = false;
}

function initScoresArray() {
  scores = []
}

const logoutButton = document.getElementById("nav_logout");
logoutButton.addEventListener("click", initScoresArray);

function play() {
  // Calculate time remaining
  now = new Date();
  timeRemaining = Math.max(0, game_time - Math.floor((now - gameStartTime) / 1000));
  minutesRemaining = Math.floor(timeRemaining / 60);
  secondsRemaining = timeRemaining % 60;

  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
  checkGameOver();

  // Check if time is done
  if (timeRemaining <= 0) {
    isGameOver = true;
  }

  if (!isGameOver) {
    enemyController.draw(ctx);
    enemyController.updateEnemies(); // update the position of the enemies
    player.draw(ctx);
    playerBulletController.draw(ctx);
    enemyBulletController.draw(ctx);

    score = enemyController.score;

    document.getElementById("score_element").textContent = score;
    document.getElementById("time_element").textContent = `${minutesRemaining}:${secondsRemaining < 10 ? '0' : ''}${secondsRemaining}`;
  }
}
let loserSound = new Audio('./src/audio/OMG_SO_EMBARRASSING.mp3');
loserSound.volume = 0.2;

let winnerSound = new Audio('./src/audio/ricky_ticky_tavy_beach.mp3');
winnerSound.volume = 0.2;


function displayGameOver() {
  if (isGameOver) {
    let text = "";
    if (lifes === 0) {
      text = "You lost";

      setTimeout(() => {
        loserSound.play();
      }, 1000); // wait for 1 second
    }
    if (timeRemaining <= 0) {
      if (score < 100) {
        text = "You can do better, your score is: " + score;
        setTimeout(() => {
          loserSound.play();
        }, 1000); // wait for 1 second
      }
      else {
        text = "Winner";
        setTimeout(() => {
          winnerSound.play();
        }, 1000); // wait for 1 second
      }
    }
    if (isWinner) {
      text = "Champion!";
      setTimeout(() => {
        winnerSound.play();
      }, 1000); // wait for 1 second
    }

    ctx.fillStyle = "white";
    ctx.font = "6vh Permanent Marker";
    ctx.textAlign = "center";
    ctx.fillText(text, canvas.width / 2, canvas.height / 2);
    setTimeout(() => {
      ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
      if (!shown) {
        scores.push(score);
        showScores();
        shown = true;
      }
    }, 2000);
  }
}


function checkGameOver() {
  $("#life-img").attr("src", "./src/images/game/" + lifes + "life.png");

  if (enemyBulletController.collides(player)) {
    player.hit()
    lifes--;
  }

  else if (enemyController.enemyRows.length === 0) {
    isWinner = true;
    isGameOver = true;
  }

  if (lifes === 0 || isGameOver) {
    isGameOver = true;
    displayGameOver();
    endGame();
    $("#life-img").attr("src", "./src/images/game/" + lifes + "life.png");

  }
}

// ----------------------------- popup with the record table and a button for a new game -----------------------------

// --------- print the score table popup ---------
function showScores() {
  var tableBody = $('#score-table tbody');

  tableBody.empty();

  let user = $("#onlineUserText").text().replace("Hi:", "");
  $("#loged_in_uname_score_table").text(user);

  // Create a new row for "p all time score"
  var allTimeScoreRow = $('<tr>');

  tableBody.append(allTimeScoreRow);

  scores.sort(function (a, b) { return b - a });
  scores.forEach(function (score, index) {
    var newRow = $('<tr>');

    var rankCell = $('<td>').text(index + 1);
    var scoreCell = $('<td>').text(score);

    // Add the cells to the row
    newRow.append(rankCell);
    newRow.append(scoreCell);

    tableBody.append(newRow);
  });

  // Show the table
  $('#score-table').show();
}

// --------- Hide the popup table when clicking outside of it ---------
document.addEventListener('click', function (event) {
  var scoreTable = document.getElementById('score-table');
  if (event.target !== scoreTable && !scoreTable.contains(event.target)) {
    scoreTable.style.display = 'none';
  }
});

// --------- new game button ---------
$(document).ready(function () {
  $('#new-game-btn').on('click', function () {

    // Start the game here
    if (gamePlayed) {
      endGame();
      gamePlayed = false;
    }
    newGame();
    gameIntervals();

    gamePlayed = true;

    // Hide the score table
    $('#score-table').hide();
  });
});

// ----------------------------- Mute/Unmute the sound in the game -----------------------------
$('#mute-button').click(function () {
  if (backgroundSound.muted) {
    // Unmute audio
    player.playerSoundDeath.muted = false;
    enemyController.enemySoundDeath.muted = false;
    backgroundSound.muted = false;
    $('#mute-icon').attr('src', './src/images/game/volume.png').css({ 'width': '30px', 'height': '30px' });
    $('audio').prop('muted', false);

  } else {
    // Mute audio
    player.playerSoundDeath.muted = true;
    enemyController.enemySoundDeath.muted = true;
    backgroundSound.muted = true;

    $('#mute-icon').attr('src', './src/images/game/volume-mute.png').css({ 'width': '30px', 'height': '30px' });
    $('audio').prop('muted', true);

  }
  $(this).blur();
});


$(window).on('beforeunload', function () {
  return 'Are you sure you want to leave?';
});


$(document).ready(function () {
  $('#play').on('click', function () {
    startGame();
  });
});


$(document).ready(function() {
  $("#login, #register").click(function(event) {
    if ($("#play").is(":visible") && $("#nav_logout").is(":visible")) {
      event.preventDefault();
      var result = confirm("Do you want to logout the game?");
      if (result) {
        // User clicked "OK", logout the game
        logout();
      } else {
        pauseGame();
        pauseGame();
        $(this).blur();
        // User clicked "Cancel", do nothing
      }
    }
  });
});




let gamePlayed = false;

export function gameIntervals() {
  backgroundSound.currentTime = 0;
  backgroundSound.play();
  intervalId = setInterval(play, 10);

}

export function startGame() {
  if (gamePlayed) {
    endGame();
    gamePlayed = false;
  }
  newGame();
  gameIntervals();

  gamePlayed = true;
}

function endGame() {
  backgroundSound.pause();
  backgroundSound.currentTime = 0;
  $('#mute-icon').attr('src', './src/images/game/volume.png').css({ 'width': '30px', 'height': '30px' });
  clearInterval(intervalId);

}

// Add event listeners to all menu items
const menuItems = document.querySelectorAll('.w3-bar-item');
menuItems.forEach(item => {
  item.addEventListener('click', () => {
    endGame();
  });
});

// // ----------------------------- Pause/Resume the game -----------------------------
$("#pause-button").click(function () {
  pauseGame();
  $(this).blur();

});

function pauseGame() {
  if (intervalId) {
    clearInterval(intervalId);
    intervalId = null;
    backgroundSound.pause();
  } else {
    gameIntervals();
  }
}

