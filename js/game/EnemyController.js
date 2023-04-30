import Enemy from "./Enemy.js";


export default class EnemyController {
    enemyMap = [
        [4, 4, 4, 4, 4],
        [3, 3, 3, 3, 3],
        [2, 2, 2, 2, 2],
        [1, 1, 1, 1, 1],
    ];

    enemyRows = [];
    fireBulletTimerDefault = 100;
    fireBulletTimer = this.fireBulletTimerDefault;
    accelerationTimer = 300; // 5 seconds at 60 fps
    accelerationCount = 0;
    accelerationAmount = 1;
    projectileSpeed = -3;
    score = 0;

    constructor(canvas, enemyBulletController, playerBulletController) {
        this.canvas = canvas;
        this.enemyBulletController = enemyBulletController;
        this.playerBulletController = playerBulletController;
        this.enemySoundDeath = new Audio('./src/audio/bitch_scary_terry_sound.mp3');
        this.enemySoundDeath.volume = 0.2;

        this.createEnemies();
        this.direction = 1; // 1 for right, -1 for left
        this.speed = 2;
    }

    draw(ctx) {
        this.collisionDetect();
        this.enemyRows.flat().forEach((enemy) => {
            enemy.draw(ctx);
        });
        this.fireBullet();
    }

    createEnemies() {
        let enemy = new Enemy(0, 1, 1);
        this.enemyMap.forEach((row, rowIndex) => {
            this.enemyRows[rowIndex] = [];
            row.forEach((enemyNum, enemyIndex) => {
                this.enemyRows[rowIndex].push(new Enemy(enemyIndex * enemy.width * 0.8, (rowIndex + 1) * enemy.height * 0.8 + enemy.y, enemyNum));
            });
        });
    }

    collisionDetect() {
        this.enemyRows.forEach((enemyRow, rowNumber) => {
            enemyRow.forEach((enemy, enemyIndex) => {
                if(this.playerBulletController.collides(enemy)) {
                    this.enemySoundDeath.currentTime = 0;
                    this.enemySoundDeath.play();
                    if(rowNumber == 3) {
                        this.score += 5;
                    }
                    if(rowNumber == 2) {
                        this.score += 10;
                    }
                    if(rowNumber == 1) {
                        this.score += 15;
                    }
                    if(rowNumber == 0) {
                        this.score += 20;
                    }
                    enemyRow.splice(enemyIndex, 1);
                }
            });
        });
        this.enemyRows = this.enemyRows.filter((enemyRow) => enemyRow.length > 0);
        
    }

    collides(object) {
        return this.enemyRows.flat().some((enemy) => enemy.collides(object));
    }


    fireBullet() {
        this.fireBulletTimer--;
        if (this.fireBulletTimer <= 0) {
            const allEnemies = this.enemyRows.flat();
            const enemyIndex = Math.floor(Math.random() * allEnemies.length);
            const enemy = allEnemies[enemyIndex];
    
            const enemyBulletController = this.enemyBulletController;
    
            // Calculate the new bullet speed
            const maxAccelerationCount = 4;
            const accelerationAmount = 1;
            const maxBulletSpeed = -8;
            const accelerationInterval = 300; // 5 seconds at 60 fps
            let bulletSpeed = -3 - (this.accelerationCount * accelerationAmount);
            bulletSpeed = Math.max(maxBulletSpeed, bulletSpeed);
    
            // Check if previous bullet has passed 3/4 of the screen
            const lastBullet = enemyBulletController.bullets[enemyBulletController.bullets.length - 1];
            if (!lastBullet || (lastBullet && lastBullet.y > this.canvas.height * 0.25)) {
                enemyBulletController.shoot(enemy.x, enemy.y, bulletSpeed);
                this.fireBulletTimer = this.fireBulletTimerDefault;
    
                // Increase bullet speed every 5 seconds, for max 4 times
                this.accelerationTimer--;
                if (this.accelerationTimer <= 0 && this.accelerationCount < maxAccelerationCount) {
                    this.accelerationCount++;
                    this.accelerationTimer = accelerationInterval; // reset timer to 5 seconds
                }
            } else {
                // Try again next frame
                this.fireBulletTimer = 1;
            }
        }
    }

    // This function updates the enemy positions and speeds up the enemies every 5 seconds for max 4 times
    updateEnemies() {
        let enemyMoved = false;
        this.enemyRows.flat().forEach((enemy) => {
            const newPosX = enemy.x + this.direction * this.speed;
            if (newPosX < 0 || newPosX + enemy.width > this.canvas.width) {
                this.direction = -this.direction; // change direction
                this.enemyRows.flat().forEach((enemy2) => {
                    // enemy2.move(0, 10); // move down
                });
                enemyMoved = true;
            }
        });
        if (!enemyMoved) {
            this.enemyRows.flat().forEach((enemy) => {
                enemy.move(this.direction * this.speed / 2, 0); // move horizontally
            });
        }
         // Increase speed every 5 seconds, for max 4 times
        this.accelerationTimer--;
        if (this.accelerationTimer <= 0 && this.accelerationCount < 4) {
            this.speed += this.accelerationAmount;
            this.accelerationCount++;
            this.accelerationTimer = 300; // reset timer to 5 seconds
        }
    }
}
