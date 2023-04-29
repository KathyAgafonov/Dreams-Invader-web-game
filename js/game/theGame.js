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
}

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

    ctx.fillText(`Score: ${score}`, 20, 40);
    ctx.fillText(`Time Left: ${minutesRemaining}:${secondsRemaining < 10 ? '0' : ''}${secondsRemaining}`, 20, 70);

  }

}

function displayGameOver() {
  if (isGameOver) {
    let text = isWinner ? "You Win" : "Game Over";
    let textOffset = isWinner ? 3.5 : 5;

    ctx.fillStyle = "white";
    ctx.font = "50px David";
    ctx.fillText(text, canvas.width / textOffset, canvas.height / 2);
  }
}

function checkGameOver() {
  if (enemyBulletController.collides(player)) {
    player.hit()
    lifes--;
    console.log("you shoot me!")
  }

  // if (enemyController.collides(player)) {
  //   player.hit()
  //   lifes--;
  //   console.log("Im dead!")
  // }

  else if (enemyController.enemyRows.length === 0) {
    isWinner = true;
    isGameOver = true;
  }

  if (lifes === 0 || isGameOver) {
    isGameOver = true;
    gameOver();
    displayGameOver();
  }


}



// ----------------------------- Pop up with a button for another round when the game is over -----------------------------

// function gameOver() {
//   if (isGameOver) {
//     return;
//   }

//   isGameOver = true;

//   // Get the current date and time
//   const now = new Date();
//   const date = now.toLocaleDateString();
//   const time = now.toLocaleTimeString();

//   // Add the score and date to the record table
//   const recordTable = $("#recordTable-table tbody");
//   const newRow = $("<tr>");
//   newRow.append($("<td>").text(rankNumber));
//   newRow.append($("<td>").text(`${date} ${time}`));
//   newRow.append($("<td>").text(enemyController.score));
//   recordTable.append(newRow);

//   // Increment the rank number for the next game
//   rankNumber++;

//   // Create a new HTML element for the pop-up window
//   const popup = document.createElement("div");
//   popup.classList.add("popup");

//   // Add the player's score and the record table to the pop-up window
//   const scoreText = document.createElement("p");
//   scoreText.textContent = `Your Score: ${enemyController.score}`;
//   popup.appendChild(scoreText);

//   // Add the record table to the pop-up window
//   const table = document.createElement("table");
//   table.id = "recordTable-popup";
//   const tableHead = document.createElement("thead");
//   const tableHeadRow = document.createElement("tr");
//   tableHeadRow.innerHTML = "<th>Rank</th><th>Date</th><th>Score</th>";
//   tableHead.appendChild(tableHeadRow);
//   const tableBody = document.createElement("tbody");
//   tableBody.innerHTML = recordTable.html();
//   table.appendChild(tableHead);
//   table.appendChild(tableBody);
//   popup.appendChild(table);

//   // Add a button to start a new round
//   const anotherRoundButton = document.createElement("button");
//   anotherRoundButton.textContent = "Another Round";
//   anotherRoundButton.addEventListener("click", () => {
//     popup.remove();
//     newGame();
//     startGame();
//   });
//   popup.appendChild(anotherRoundButton);

//   // Save a reference to the popup element
//   const popupContainer = document.body.appendChild(popup);

//   // Add an event listener to the menu items to close the popup when a different menu item is clicked
//   const menuItems = document.querySelectorAll("#menuNavBar a");
//   for (let i = 0; i < menuItems.length; i++) {
//     menuItems[i].addEventListener("click", () => {
//       popupContainer.remove();
//     });
//   }

//   // Add an event listener to the window object to close the popup when the window loses focus
//   window.addEventListener("blur", () => {
//     popupContainer.remove();
//   });
// }




// ----------------------------- Mute/mute the sound in the game -----------------------------
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


// $(document).ready(function() {
//   $('#play').on('click', function() {
//     // Start the game here
//     // For example, you can call a function that starts the game:
//     startGame();
//   });
// });



// function startGame() {
//   // Code to start the game goes here
//   // For example:
//   backgroundSound.play();

//   setInterval(play, 10);

//   console.log('Game started!');
// }

// function endGame() {
//   console.log('Game ends!');
//   backgroundSound.pause
//   clearInterval(intervalId);
// }


$(window).on('beforeunload', function () {
  return 'Are you sure you want to leave?';
});

$(document).ready(function () {
  $('#play').on('click', function () {
    // Start the game here
    newGame();
    startGame();
  });
});

function startGame() {
  // Code to start the game goes here
  // For example:
  backgroundSound.play();
  intervalId = setInterval(play, 10);

  console.log('Game started!');
}

function endGame() {
  console.log('Game ends!');
  backgroundSound.pause();
  clearInterval(intervalId);
  console.log('Game ends!');

  // Reset all game variables here
}


