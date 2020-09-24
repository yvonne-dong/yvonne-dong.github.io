let fontSize = 15;
let pos1, pos2, pos3;
let center;

function setup() {
    createCanvas(600, 600);
    pos1 = createVector(random(100, width - 100), random(100, height - 100));
    pos2 = createVector(random(100, width - 100), random(100, height - 100));
    pos3 = createVector(random(100, width - 100), random(100, height - 100));
    center = createVector(0, 0);
}

function draw() {
    background(0);
    textSize(fontSize);
    noFill();
    stroke(255);
    textAlign(CENTER, CENTER);
    text("Exercise 20", width / 2, fontSize);
    text("Circle from Three Points (Circumcenter)", width / 2, fontSize * 2 + 5);

    let ma = (pos2.y - pos1.y) / (pos2.x - pos1.x);
    let mb = (pos3.y - pos2.y) / (pos3.x - pos2.x);
    center.x = (ma * mb * (pos1.y - pos3.y) + mb * (pos1.x + pos2.x) - ma * (pos2.x + pos3.x)) / (2 * (mb - ma));
    center.y = -1 * (center.x - (pos1.x + pos2.x) / 2) / ma + (pos1.y + pos2.y) / 2;

    let dx = pos1.x - center.x;
    let dy = pos1.y - center.y;
    let r = sqrt(dx * dx + dy * dy);

    circle(pos1.x, pos1.y, 5);
    circle(pos2.x, pos2.y, 5);
    circle(pos3.x, pos3.y, 5);
    line(pos1.x, pos1.y, pos2.x, pos2.y);
    line(pos1.x, pos1.y, pos3.x, pos3.y);
    line(pos2.x, pos2.y, pos3.x, pos3.y);
    circle(center.x, center.y, 5);
    circle(center.x, center.y, r * 2);
}

function mousePressed() {
    pos1 = createVector(random(100, width - 100), random(100, height - 100));
    pos2 = createVector(random(100, width - 100), random(100, height - 100));
    pos3 = createVector(random(100, width - 100), random(100, height - 100));
}
