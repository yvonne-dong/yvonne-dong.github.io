let fontSize = 15;
let dir;
let pupilPos;

function setup() {
    createCanvas(600, 600);
    dir = createVector(0, 0);
    pupilPos = createVector(width/2, height/2);
}

function draw() {
    background(0);
    textSize(fontSize);
    noFill();
    stroke(255);
    textAlign(CENTER, CENTER);
    text("Exercise 16", width / 2, fontSize);
    text("Eyes Following Cursor", width / 2, fontSize * 2 + 5);

    fill(255);
    circle(width / 2, height / 2, 300);
    fill(0);
    circle(constrain(mouseX, width / 2 - 50, width / 2 + 50), 
    constrain(mouseY, height / 2 - 50, height / 2 + 50), 150);
    fill(255);
    circle(constrain(mouseX, width / 2 - 50, width / 2 + 50) + 20, 
    constrain(mouseY, height / 2 - 50, height / 2 + 50) - 20, 20);
}