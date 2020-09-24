let fontSize = 15;
let ripples = [];
let bDead;

function setup() {
    createCanvas(600, 600);
}

function draw() {
    background(0);
    textSize(fontSize);
    noFill();
    stroke(255);
    textAlign(CENTER, CENTER);
    text("Exercise 17", width / 2, fontSize);
    text("Ripples in a Pond", width / 2, fontSize * 2 + 5);

    for (let i = 0; i < ripples.length; i++) {
        ripples[i].update();
        ripples[i].display();
        if (ripples[i].bDead()) {
            ripples.splice(i, 1);
        }
    }
}

class ripple {
    constructor(_pos) {
        this.pos = _pos;
        this.size = 5;
        this.vel = random(0.5, 3);
        this.life = 500;
    }
    update() {
        this.size += this.vel;
        this.life -= 5;
    }

    display() {
        stroke(map(this.life, 100, 0, 255, 0));
        circle(this.pos.x, this.pos.y, this.size);
        circle(this.pos.x, this.pos.y, this.size * 1.25);
        circle(this.pos.x, this.pos.y, this.size * 1.5);
    }

    bDead() {
        if (this.life < 0) {
            return true;
        } else {
            return false;
        }
    }
}

function mousePressed() {
    ripples.push(new ripple(createVector(mouseX, mouseY)));
}