let fontSize = 15;
let randomC;
let randomTail;
let randomSize;

function setup() {
    createCanvas(600, 600);
    randomC = color(255, random(170, 200), random(0, 100));
    randomTail = createVector(random(-300, 300), random(-100, 100));
    randomSize = random(150, 220);
}

function draw() {
    background(0);
    textSize(fontSize);
    noFill();
    stroke(255);
    strokeWeight(1);
    textAlign(CENTER, CENTER);
    text("Exercise 18", width / 2, fontSize);
    text("Butt Generator", width / 2, fontSize * 2 + 5);
    text("Click to generate new butt : 3", width / 2, fontSize * 3 + 10);

    drawButt(randomC, randomSize, randomTail);
}

function drawButt(c, s, t) {
    // head
    fill(c);
    strokeWeight(10);
    push();
    translate(width / 2 - 120, height / 2 - 150);
    rotate(-PI * 0.2);
    triangle(0, 0, -50, 80, 50, 80);
    pop();
    push();
    translate(width / 2 + 120, height / 2 - 150);
    rotate(PI * 0.2);
    triangle(0, 0, -50, 80, 50, 80);
    pop();
    stroke(255);
    circle(width / 2, height / 2, 250);

    // body
    beginShape();
    strokeWeight(20);
    fill(255);
    vertex(width / 2 - s, height);
    quadraticVertex(width / 2 - 200, height / 2, width / 2, height / 2);
    vertex(width / 2, height);
    endShape();
    beginShape();
    vertex(width / 2 + s, height);
    quadraticVertex(width / 2 + 200, height / 2, width / 2, height / 2);
    vertex(width / 2, height);
    endShape();

    noStroke();
    beginShape();
    fill(c);
    vertex(width / 2 - s, height);
    quadraticVertex(width / 2 - 200, height / 2, width / 2, height / 2);
    vertex(width / 2, height);
    endShape();
    beginShape();
    vertex(width / 2 + s, height);
    quadraticVertex(width / 2 + 200, height / 2, width / 2, height / 2);
    vertex(width / 2, height);
    endShape();

    strokeWeight(10);
    stroke(255);
    line(width / 2, height - 120, width / 2, height);
    fill(c);
    arc(width / 2, height - 140,
        150, 150,
        HALF_PI - QUARTER_PI, HALF_PI + QUARTER_PI);


    // tail
    noFill();
    strokeWeight(60);
    stroke(255);
    bezier(width / 2, height / 2 + 100,
        width / 2 + t.x, height / 2 + t.y,
        width / 2 - t.x, height / 2 - t.y,
        width / 2, height / 2 - 200);
    strokeWeight(40);
    stroke(c);
    bezier(width / 2, height / 2 + 100,
        width / 2 + t.x, height / 2 + t.y,
        width / 2 - t.x, height / 2 - t.y,
        width / 2, height / 2 - 200);
}

function mousePressed() {
    randomC = color(255, random(170, 200), random(0, 100));
    randomTail = createVector(random(-300, 300), random(-100, 100));
    randomSize = random(150, 220);
}