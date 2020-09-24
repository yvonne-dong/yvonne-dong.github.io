let fontSize = 15;
let pos1, pos2;
let vec1, vec2;

function setup() {
    createCanvas(600, 600);
    pos1 = createVector(random(100, width - 100), random(100, height - 100));
    pos2 = createVector(random(100, width - 100), random(100, height - 100));
}

function draw() {
    background(0);
    textSize(fontSize);
    noFill();
    stroke(255);
    textAlign(CENTER, CENTER);
    text("Exercise 19", width / 2, fontSize);
    text("Angle between Three Points", width / 2, fontSize * 2 + 5);
    text("Click to regenerate positions", width / 2, fontSize * 3 + 10);

    circle(pos1.x, pos1.y, 5);
    circle(pos2.x, pos2.y, 5);
    textSize(12);
    text('pos1', pos1.x - fontSize, pos1.y - fontSize);
    line(pos1.x, pos1.y, mouseX, mouseY);
    text('pos2', pos2.x - fontSize, pos2.y - fontSize);
    line(pos2.x, pos2.y, mouseX, mouseY);

    vec1 = createVector(pos1.x - mouseX, pos1.y - mouseY);
    vec2 = createVector(pos2.x - mouseX, pos2.y - mouseY);
    text('Angle: ' + degrees(vec1.angleBetween(vec2)), mouseX - fontSize, mouseY - fontSize);
}

function mousePressed() {
    pos1 = createVector(random(100, width - 100), random(100, height - 100));
    pos2 = createVector(random(100, width - 100), random(100, height - 100));
}