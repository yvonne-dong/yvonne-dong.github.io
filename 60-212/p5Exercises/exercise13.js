let fontSize = 15;
let modes = ['two 1D arrays', 'one 2D array', 'array of Point2D objects'];
let currentMode = 0;
// 1. 2 1D arrays
let mouseXposes = [];
let mouseYposes = [];
// 2. 1 2D array
let mouseXYposes = [];
// 3. PVector
let mouseXYvec = [];

function setup() {
    createCanvas(600, 600);
}

function draw() {
    background(0);
    textSize(fontSize);
    noFill();
    stroke(255);
    textAlign(CENTER, CENTER);
    text("Exercise 13", width / 2, fontSize);
    text("Drawn Line, Three Ways", width / 2, fontSize * 2 + 5);
    text("Mode: " + modes[currentMode] + " (press 1, 2, 3 for switching modes)", width / 2, fontSize * 3 + 10);

    if (currentMode == 0) {
        beginShape();
        for (let i = 0; i < mouseXposes.length; i++) {
            curveVertex(mouseXposes[i], mouseYposes[i]);
        }
        endShape();
    }

    if (currentMode == 1) {
        beginShape();
        for (let j = 0; j < mouseXYposes.length; j++) {
            curveVertex(mouseXYposes[j][0], mouseXYposes[j][1]);
        }
        endShape();
    }

    if (currentMode == 2) {
        beginShape();
        for (let k = 0; k < mouseXYvec.length; k++) {
            curveVertex(mouseXYvec[k].x, mouseXYvec[k].y);
        }
        endShape();
    }

}

function keyPressed() {
    if (key == '1') {
        currentMode = 0;
    } else if (key == '2') {
        currentMode = 1;
    } else if (key == '3') {
        currentMode = 2;
    }
}

function mouseDragged() {
    mouseXposes.push(mouseX);
    mouseYposes.push(mouseY);
    mouseXYposes.push([mouseX, mouseY]);
    mouseXYvec.push(createVector(mouseX, mouseY));
}
