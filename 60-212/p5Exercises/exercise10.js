let fontSize = 15;
let ball;
let p1, p2;
let p1Score = 0;
let p2Score = 0;
let p1Up = false;
let p1Down = false;
let p2Up = false;
let p2Down = false;

function setup() {
    createCanvas(600, 600);
    ball = new Ball();
    p1 = new Paddle(0);
    p2 = new Paddle(1);
}

function draw() {
    background(0);
    textSize(fontSize);
    stroke(255);
    textAlign(CENTER, CENTER);
    text("Exercise 10", width / 2, fontSize);
    text("One-Person Pong", width / 2, fontSize * 2 + 5);

    drawField();
    p1.move(p1Up, p1Down);
    p2.move(p2Up, p2Down);

    ball.update();
    p1.update();
    p2.update();

    p1.display();
    p2.display();

    ball.display();

    checkCollision(ball, p1);
    checkCollision(ball, p2);
}


function drawField() {
    stroke(255);
    noFill();
    line(width / 2, 0, width / 2, height);

    stroke(255);
    textSize(fontSize);
    textAlign(CENTER, CENTER);
    text(p1Score, width / 4, 70);
    text(p2Score, 3 * width / 4, 70);
}

function checkCollision(ball, other) {
    if (ball.pos.x + ball.width / 2 > other.pos.x &&
        ball.pos.x + ball.width / 2 < other.pos.x + other.width &&
        ball.pos.y + ball.height / 2 > other.pos.y &&
        ball.pos.y + ball.height / 2 < other.pos.y + other.height) {
        other.collided(ball);
    }
}

class Ball {
    constructor() {
        this.pos = createVector(width / 2, height / 2);
        this.vel = createVector(0, 0);
        this.angle = random(TWO_PI);
        this.speed = 3;
        this.vel.x = cos(this.angle) * this.speed;
        this.vel.y = sin(this.angle) * this.speed;
        this.width = 15;
        this.height = 15;
    }

    update() {
        if (this.pos.x < -this.width) {
            p2Score++;
            this.resetPos();
        } else if (this.pos.x > width) {
            p1Score++;
            this.resetPos();
        }

        if (this.pos.y < 0 ||
            this.pos.y > height - this.height) {
            this.vel.y *= -1;
        }

        this.pos.add(this.vel);
    };

    display() {
        strokeWeight(1);
        stroke(255);
        rectMode(CORNER);
        rect(this.pos.x, this.pos.y, this.width, this.height);
    }

    resetPos() {
        this.pos = createVector(width / 2, height / 2);
        this.vel = createVector(0, 0);
        this.speed = 3;
        this.vel.x = this.speed * cos(random(PI));
        this.vel.y = this.speed * sin(random(PI));
    }
}

class Paddle {
    constructor(num) {
        this.num = num;
        this.width = 15;
        this.height = 80;
        if (num == 0) {
            this.pos = createVector(20, height / 2);
        } else {
            this.pos = createVector(width - this.width - 20, height / 2);
        }
        this.vel = createVector(0, 0);
    }


    update() {
        this.pos.add(this.vel);
    }

    display() {
        strokeWeight(1);
        stroke(255);
        rect(this.pos.x, this.pos.y, this.width, this.height);
    }

    move(up, down) {
        this.vel.y = 0;
        if (up) {
            if (this.pos.y > 0) {
                this.vel.y = -5;
            } else {
                this.pos.y = 0;
            }
        }
        if (down) {
            if (this.pos.y + this.height < height) {
                this.vel.y = 5;
            } else {
                this.pos.y = height - this.height;
            }
        }
    }

    collided(other) {
        let diff = (other.pos.y + other.height / 2) - this.pos.y;
        if (this.num === 0) {
            this.angle = map(diff, 0, this.height, -PI / 3, PI / 3);
        }
        if (this.num === 1) {
            this.angle = map(diff, this.height, 0, 4 * PI / 6, 8 * PI / 6);
        }
        other.vel.x = cos(this.angle) * other.speed;
        other.vel.y = sin(this.angle) * other.speed;
    }
}


function keyPressed() {
    if (keyCode === ENTER) {
        keyOn = true;
    }
    if (key === 'w') {
        p1Up = true;
    }
    if (key === 's') {
        p1Down = true;
    }

    if (keyCode === UP_ARROW) {
        p2Up = true;
    }
    if (keyCode === DOWN_ARROW) {
        p2Down = true;
    }
}

function keyReleased() {
    if (key === 'w') {
        p1Up = false;
    }
    if (key === 's') {
        p1Down = false;
    }

    if (keyCode === UP_ARROW) {
        p2Up = false;
    }
    if (keyCode === DOWN_ARROW) {
        p2Down = false;
    }
}