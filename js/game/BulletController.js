import Bullet from "./Bullet.js";

export default class BulletController {
    bullets = [];
    timeToNextBullet = 0;

    constructor(canvas, bulletImagePath) {
      this.canvas = canvas;
      this.bulletImagePath = bulletImagePath;
    }
  

  
    draw(ctx) {
        this.bullets = this.bullets.filter(bullet => bullet.y +bullet.width > 0);

        this.bullets.forEach((bullet) => bullet.draw(ctx));
        if(this.timeToNextBullet > 0) {
            this.timeToNextBullet--;
        }
    }

    shoot(x, y, velocity, timeToNextBullet = 0) {
        if(timeToNextBullet <= 0) {
            const bullet = new Bullet(this.canvas, x, y, velocity, this.bulletImagePath);
            this.bullets.push(bullet);
        }
        this.timeToNextBullet = timeToNextBullet;
    }

    collides(object) {
        const bulletHitsObjectInx = this.bullets.findIndex((bullet) => bullet.collides(object));

        if(bulletHitsObjectInx >= 0) {
            this.bullets.splice(bulletHitsObjectInx, 1);
            return true;
        }else {
            return false;
        }
    }


  }
  