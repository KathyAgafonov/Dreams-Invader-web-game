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

function initScoresArray(){
  scores = []
}

const logoutButton = document.getElementById("nav_logout");
const playButton = document.getElementById("play");

logoutButton.addEventListener("click", initScoresArray);
playButton.addEventListener("click", initScoresArray);


function play() {
  // Calculate time remaining
  const now = new Date();
  const timeRemaining = Math.max(0, 120 - Math.floor((now - gameStartTime) / 1000));
  const minutesRemaining = Math.floor(timeRemaining / 60);
  const secondsRemaining = timeRemaining % 60;

  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
  checkGameOver();


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
    let text = isWinner ? "You Win" : "Game Over";
    let textOffset = isWinner ? 3.5 : 5;

    ctx.fillStyle = "white";
    ctx.font = "50px David";
    ctx.fillText(text, canvas.width / textOffset, canvas.height / 2);
    if (!shown) {
      scores.push(score);
      showScores();
      shown = true;
    }
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
    // gameOver();
    displayGameOver();
    endGame();
  }
}
function showScores() {
  // Get a reference to the table body
  var tableBody = $('#score-table tbody');

  // Clear the table body first
  tableBody.empty();

  // Sort scores by score in descending order
  scores.sort(function (a, b) {
    return b.score - a.score;
  });

  // Iterate over the scores array and add rows to the table
  scores.forEach(function (score, index) {
    // Create a new table row
    var newRow = $('<tr>');

    // Create table cells and set their text content
    var rankCell = $('<td>').text(index + 1);
    var scoreCell = $('<td>').text(score);

    // Add the cells to the row
    newRow.append(rankCell);
    newRow.append(scoreCell);

    // Add the row to the table body
    tableBody.append(newRow);
  });

  // Show the table
  $('#score-table').show();
}


// ----------------------------- Pop up with a button for another round when the game is over -----------------------------

function gameOver() {
  if (isGameOver) {
    return;
  }
  isGameOver = true;
}


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
    if(gamePlayed){
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
  // Code to start the game goes here
  // For example:
  backgroundSound.currentTime = 0;
  backgroundSound.play();
  intervalId = setInterval(play, 10);

  console.log('Game started!');
}

function endGame() {
  console.log('Game ends!');
  backgroundSound.muted = true;
  clearInterval(intervalId);
  // console.log('Game ends!');

  // Reset all game variables here
}


