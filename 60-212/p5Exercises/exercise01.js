let fontSize = 15;
let centerPoses = [];

function setup() {
    createCanvas(600, 600);
    for (let x = width / 6; x < width; x += width / 3) {
        for (let y = height / 6; y < height; y += height / 3) {
            centerPoses.push(createVector(x, y));
        }
    }
    rectMode(CENTER);
}

function draw() {
    background(0);
    textSize(fontSize);
    stroke(255);
    textAlign(CENTER, CENTER);
    text("Exercise 01", width / 2, fontSize);
    text("2D Primitives", width / 2, fontSize * 2 + 5);

    for (let col = 0; col < width; col += width / 3) {
        line(col, 0, col, height);
    }
    for (let row = 0; row < height; row += height / 3) {
        line(0, row, width, row);
    }

    noFill();
    // 1. arc
    angleMode(RADIANS);
    arc(centerPoses[0].x, centerPoses[0].y, 100, 100, 0, HALF_PI+QUARTER_PI, PIE);
    // 2. ellipse
    push();
    translate(centerPoses[1].x, centerPoses[1].y);
    angleMode(DEGREES);
    rotate(30);
    ellipse(0, 0, 50, 100);
    pop();
    // 3. cicle
    circle(centerPoses[2].x, centerPoses[2].y, 100);
    // 4. line
    line(centerPoses[3].x - 30, centerPoses[3].y - 40,
        centerPoses[3].x + 50, centerPoses[3].y + 60);
    // 5. point
    strokeWeight(5);
    point(centerPoses[4].x - 15, centerPoses[4].y - 80);
    point(centerPoses[4].x + 5, centerPoses[4].y);
    point(centerPoses[4].x + 20, centerPoses[4].y + 30);
    point(centerPoses[4].x - 26, centerPoses[4].y + 79);
    // 6. quad
    strokeWeight(1);
    quad(centerPoses[5].x - 68, centerPoses[5].y - 36,
        centerPoses[5].x + 50, centerPoses[5].y - 20,
        centerPoses[5].x + 35, centerPoses[5].y + 55,
        centerPoses[5].x - 10, centerPoses[5].y + 70);
    // 7. rounded rect
    rect(centerPoses[6].x, centerPoses[6].y, 150, 80, 15);
    // 8. rounded square
    square(centerPoses[7].x, centerPoses[7].y, 100, 
           5, 15, 25, 35);
    // 9. triangle
    triangle(centerPoses[8].x, centerPoses[8].y - 50,
            centerPoses[8].x + 50, centerPoses[8].y + 50,
            centerPoses[8].x - 50, centerPoses[8].y + 50);
}