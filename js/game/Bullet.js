export default class Bullet { 
    constructor(canvas, x, y, velocity, bulletImagePath) {
        this.canvas = canvas;
        this.velocity = velocity;

        const screenHeight = window.innerHeight;
        const imageHeight = screenHeight * 0.04;
        this.image = new Image();
        this.image.src = bulletImagePath;
        this.image.width = this.image.width * (imageHeight / this.image.height);
        this.image.height = imageHeight;
        this.width = this.image.width;
        this.height = this.image.height;

        this.x = x;
        this.y = y;

    }

    draw(ctx) {
        this.y -= this.velocity;
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
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

