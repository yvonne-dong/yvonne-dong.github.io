let fontSize = 15;
let center;
let pointCount;

function setup() {
    createCanvas(600, 600);
    center = createVector(width / 2, height / 2);
}

function draw() {
    background(0);
    textSize(fontSize);
    stroke(255);
    textAlign(CENTER, CENTER);
    text("Exercise 03", width / 2, fontSize);
    text("Spiral", width / 2, fontSize * 2 + 5);

    let r = 10;
    let turns = 10;
    pointCount = 100 * turns;

    noFill();
    beginShape();
    for (let i = 0; i < pointCount; i++) {
        let add = map(i, 0, pointCount - 1, 0, TWO_PI * turns);
        let pos = createVector(center.x + r * cos(add), center.y + r * sin(add));
        vertex(pos.x, pos.y);
        r += map(sin((frameCount * 0.01)), -1, 1, 0.1, 0.5);
    }
    endShape();
}