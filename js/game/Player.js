// Image paths
let rightRickImagePath = "./src/images/game/rick_right.png";
let leftRickImagePath = "./src/images/game/rick_left.png";
let backRickImagePath = "./src/images/game/rick_back.png";
let frontRickImagePath = "./src/images/game/rick_front.png";

export default class Player {
    rightPressed = false;
    leftPressed = false;
    upPressed = false;
    downPressed = false;
    shootPressed = false;

    constructor(canvas, velocity, bulletController) {
        this.canvas = canvas;
        this.velocity = velocity;
        this.bulletController = bulletController;
        
        const screenHeight = window.innerHeight;
        const imageHeight = screenHeight * 0.09;
        this.image = new Image();
        this.image.src = backRickImagePath;
        this.image.width = this.image.width * (imageHeight / this.image.height);
        this.image.height = imageHeight;
        this.width = this.image.width;
        this.height = this.image.height;

        this.x = this.canvas.width / 2;
        this.y = this.canvas.height - this.height * 2.5; // bottom of the screen

        document.addEventListener("keydown", this.keydown);
        document.addEventListener("keyup", this.keyup);
    }

 
    draw(ctx) {
        // if(this.shootPressed){
        //     this.bulletController.shoot(this.x + this.width / 2, this.y, 4);
        // }
        this.move();
        this.exceedLimits();
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }

    exceedLimits() {
        //left
        if(this.x < 0) {
            this.x = 0;
        }
        //right
        if(this.x > this.canvas.width - this.width) {
            this.x = this.canvas.width - this.width;
        }
        //up
        if(this.y < 0) {
            this.y = 0;
        }
        //up - The player can move up to 40% of the lower area of the canvas
        if(this.y <= this.canvas.height * 0.4) { 
            this.y = this.canvas.height * 0.4;
        }
        //down
        if(this.y > this.canvas.height - this.height * 2.5) {
            this.y = this.canvas.height - this.height * 2.5;
        }
    }

    move() {
        if(this.rightPressed) {
            this.x += this.velocity;
        }
        if(this.leftPressed) {
            this.x -= this.velocity;
        }
        if(this.upPressed) {
            this.y -= this.velocity;
        }
        if(this.downPressed) {
            this.y += this.velocity;
        }
    }

    keydown = (event) => {
        //right
        if(event.code == "ArrowRight") {
            this.rightPressed = true;
            this.image.src = rightRickImagePath;
        }
        //left
        if(event.code == "ArrowLeft") {
            this.leftPressed = true;
            this.image.src = leftRickImagePath;
        }
        //up
        if(event.code == "ArrowUp") {
            this.upPressed = true;
            this.image.src = backRickImagePath;
        }
        //down
       if(event.code == "ArrowDown") {
            this.downPressed = true;
            this.image.src = frontRickImagePath;
        }        
        //shoot
        if(event.code == "Space") {
            this.shootPressed = true;
            this.bulletController.shoot(this.x + this.width / 2.5, this.y, 6);

        }
    }

    
    keyup = (event) => {
        //right
        if(event.code == "ArrowRight") {
            this.rightPressed = false;
            this.image.src = backRickImagePath;
        }
        //left
        if(event.code == "ArrowLeft") {
            this.leftPressed = false;
            this.image.src = backRickImagePath;
        }
        //up
        if(event.code == "ArrowUp") {
            this.upPressed = false;
        }
        //down
        if(event.code == "ArrowDown") {
            this.downPressed = false;
            this.image.src = backRickImagePath;
        }
        //shoot
        if(event.code == "Space") {
            this.shootPressed = false;
        }
    }
}