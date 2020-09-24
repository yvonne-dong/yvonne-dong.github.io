let fontSize = 15;
let pos;
let r = 50;
let vel, acc;

function setup() {
    createCanvas(600, 600);
    pos = createVector(0, 0);
    vel = createVector(random(1, 3), random(1, 3));
    acc = createVector(1, 1);
    pos = createVector(width/2, height/2);
}

function draw(){
    background(0);
    textSize(fontSize);
    noFill();
    stroke(255);
    textAlign(CENTER, CENTER);
    text("Exercise 09", width / 2, fontSize);
    text("Billiard Ball", width / 2, fontSize * 2 + 5);

    pos.add(vel.mult(acc));

    if (pos.x > width - r / 2 || pos.x < r / 2){
        acc.x *= -1;
    }
    if (pos.y > height - r / 2|| pos.y < r / 2){
        acc.y *= -1;
    }

    ellipse(pos.x, pos.y, r, r);
}