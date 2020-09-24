let fontSize = 15;
let startPoses = [];
let delta;

function setup(){
    createCanvas(600, 600);
    for (let i = 0; i < 7; i ++){
        startPoses.push(createVector(random(200, width-200), random(200, height-200)));
    }
}

function drawQuad(pos, x1, y1, x2, y2, x3, y3, x4, y4, scale){
    push();
    translate(pos.x, pos.y);
    beginShape();
    vertex(x1 * scale, y1 * scale);
    vertex(x2 * scale, y2 * scale);
    vertex(x3 * scale, y3 * scale);
    vertex(x4 * scale, y4 * scale);
    endShape(CLOSE);
    pop();
}

function draw(){
    background(0);
    textSize(fontSize);
    stroke(255);
    textAlign(CENTER, CENTER);
    text("Exercise 02", width / 2, fontSize);
    text("Quadrilateral Zoo", width / 2, fontSize * 2 + 5);
    text("(randomly placed positions)", width / 2, fontSize * 3 + 10);

    noFill();
    delta = map(mouseX, 0, width, 1, 2);
    // 1. quad square
    drawQuad(startPoses[0], 50, 50, 100, 50, 100, 100, 50, 100, delta);
    // 2. quad rect
    drawQuad(startPoses[1], 50, 45, 120, 45, 120, 80, 50, 80, delta);
    // 3. parallelogram
    drawQuad(startPoses[2], 0, 0, 120, 0, 50, 50, -70, 50, delta);
    // 4. rhombus
    drawQuad(startPoses[3], 0, 0, 60, 0, 30, 30 * Math.sqrt(3), -30, 30 * Math.sqrt(3), delta);
    // 5. trapezoid
    drawQuad(startPoses[4], -25, 0, 25, 0, 60, 80, -60, 80, delta);
    // 6. dart
    drawQuad(startPoses[5], 0, 0, 25, 55, 0, 35, -25, 55, delta);
    // 7. kite
    drawQuad(startPoses[6], 0, 0, 25, 30, 0, 80, -25, 30, delta);
}