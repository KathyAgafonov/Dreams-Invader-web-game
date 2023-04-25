export default class Enemy {
    constructor(x, y, imageNum) {
        this.x = x;
        this.y = y;

        const screenHeight = window.innerHeight;
        const imageHeight = screenHeight * 0.09;
        this.image = new Image();
        this.image.src = `src/images/game/little_scary_terry_${imageNum}.png`;
        this.image.width = this.image.width * (imageHeight / this.image.height);
        this.image.height = imageHeight;

        this.width = this.image.width;
        this.height = this.image.height;
    }

    draw(ctx) {
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }

    move( xVelocity, yVelocity) {
        this.x += xVelocity;
        this.y += yVelocity;
    }

    collides(object) {
        if(this.x + this.width > object.x &&
            this.x < object.x + object.width &&
            this.y + this.height > object.y &&
            this.y < object.y + object.height) {
            return true;
        }
        else {
            return false;
        }
    }

}