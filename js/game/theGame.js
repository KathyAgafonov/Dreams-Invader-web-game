import EnemyController from "./EnemyController.js";
import Score from "./Score.js";
import Player from "./Player.js";
import BulletController from "./BulletController.js";

const canvas = document.getElementById("game");
const scoreElement = document.getElementById("scoreElement");

const ctx = canvas.getContext('2d');
canvas.width = innerWidth;
canvas.height = innerHeight;

const background = new Image();
background.src = "src/images/game/background-canvas.png";


// instances for our game
const playerBulletController = new BulletController(canvas, "./src/images/game/pickle.png");
const player = new Player(canvas, 3, playerBulletController);

const enemyBulletController = new BulletController(canvas, "./src/images/game/scissors.png");
const enemyController = new EnemyController(canvas, enemyBulletController, playerBulletController, scoreElement);


const backgroundSound = new Audio('./src/audio/Cody_Patterson_Scary_Terry.mp3');
backgroundSound.volume = 0.2;
backgroundSound.play();

// const scores = [];
// let currScore =  new Score();
let isGameOver = false;
let isWinner = false;

let lifes = 3;


// To add a score:
// scores.addScore(100);

// To get the scores:
// const allScores = scores.getScores();

function game() {
    checkGameOver();
    // ctx.fillStyle = "white";
    // ctx.font = "20px Arial";
    // ctx.fillText(`Score: ${score}`, 20, 40);

    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    displayGameOver();
    // scores.drawScore(ctx);

    if (!isGameOver) {
        enemyController.draw(ctx); // call the draw() method of EnemyController to draw the enemies on the canvas
        enemyController.updateEnemies(); // update the position of the enemies
        player.draw(ctx);
        playerBulletController.draw(ctx);
        enemyBulletController.draw(ctx);
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
    if (isGameOver) {
      return;
    }
    if (enemyBulletController.collides(player)) {
      player.hit();
    }

    if (enemyController.collides(player)) {
      player.hit();
    }
    if (enemyController.enemyRows.length === 0) {
        isWinner = true;
        isGameOver = true;
    }
    if(!player.stillAlive()){
      isGameOver = true;
    }
  }
setInterval(game, 1000 / 60);
// setInterval(game, 10);