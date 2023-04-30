import EnemyController from "./EnemyController.js";
// import Score from "./Score.js";
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
background.src = "src/images/game/background-canvas.png";



// ----------------------------- Declaration of game variables -----------------------------

let playerBulletController;
let player;
let playerLife;

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

let shootingKey = document.getElementById("#shootKey");
let gameTime = document.getElementById("#gameTime");

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
  timeRemaining = Math.max(0, 120 - Math.floor((now - gameStartTime) / 1000));
  minutesRemaining = Math.floor(timeRemaining / 60);
  secondsRemaining = timeRemaining % 60;

  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
  checkGameOver();

  // Check if time is up
  if (timeRemaining <= 0) {
    isGameOver = true;
  }

  if (!isGameOver) {
    enemyController.draw(ctx); // call the draw() method of EnemyController to draw the enemies on the canvas
    enemyController.updateEnemies(); // update the position of the enemies
    player.draw(ctx);
    playerBulletController.draw(ctx);
    enemyBulletController.draw(ctx);

    score = enemyController.score;
    ctx.fillStyle = "white";
    ctx.font = "2.5vh Permanent Marker";

    ctx.fillText(`Score: ${score}`, 5, 30);
    ctx.fillText(`Time Left: ${minutesRemaining}:${secondsRemaining < 10 ? '0' : ''}${secondsRemaining}`, 200, 30);

  }

}



function displayGameOver() {
  if (isGameOver) {
    let text = "";
    if (lifes === 0) {
      text = "You lost";
    }
    if (timeRemaining <= 0) {
      if (score < 100) {
        text = "You can do better, your score is: " + score;
      }
      else {
        text = "Winner";
      }
    }
    if (isWinner) {
      text = "Champion!";
    }
    let textOffset = isWinner ? 3.5 : 5;

    ctx.fillStyle = "white";
    ctx.font = "15vh Permanent Marker";
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
  $("#life-img").attr("src", "/src/images/game/" + lifes + "life.png");

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
    $("#life-img").attr("src", "/src/images/game/" + lifes + "life.png");

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

  scores.sort(function(a, b){return b - a});
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
    startGame();

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
    $('#mute-icon').attr('src', 'src/images/game/volume.png').css({ 'width': '30px', 'height': '30px' });
    $('audio').prop('muted', false);

  } else {
    // Mute audio
    player.playerSoundDeath.muted = true;
    enemyController.enemySoundDeath.muted = true;
    backgroundSound.muted = true;

    $('#mute-icon').attr('src', 'src/images/game/volume-mute.png').css({ 'width': '30px', 'height': '30px' });
    $('audio').prop('muted', true);

  }
  $(this).blur();
});


$(window).on('beforeunload', function () {
  return 'Are you sure you want to leave?';
});



$(document).ready(function () {
  $('#play').on('click', function () {

    // Start the game here
    if (gamePlayed) {
      endGame();
      gamePlayed = false;
    }
    newGame();
    startGame();

    gamePlayed = true;
  });
});


let gamePlayed = false;

function startGame() {
  backgroundSound.currentTime = 0;
  backgroundSound.play();
  intervalId = setInterval(play, 10);

  console.log('Game started!');
}

function endGame() {
  console.log('Game ends!');
  backgroundSound.pause();
  backgroundSound.currentTime = 0;
  $('#mute-icon').attr('src', 'src/images/game/volume.png').css({ 'width': '30px', 'height': '30px' });
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
  console.log("pause")
  $(this).blur();

});


function pauseGame() {
  if (intervalId) {
    clearInterval(intervalId);
    intervalId = null;
    backgroundSound.pause();
  } else {
    startGame();
  }
}

