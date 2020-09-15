
let sPos, mPos, hPos;

function setup() {
    canvas = createCanvas(800, 600);
    angleMode(DEGREES);
    sPos = createVector(100, 0);
    mPos = createVector(50, 0);
    hPos = createVector(25, 0);
}

function draw() {
    background(0);
    let s = second();
    let m = minute();
    let h = hour();

    let sAngle = map(s, 0, 60, 0, 360);
    let mAngle = map(m, 0, 60, 0, 360);
    let hAngle = map(h % 12, 0, 12, 0, 360);

    translate(width / 2, height / 2);
    rotate(-90);
    
    
    stroke(255);
    // triangle(sPos.x, sPos.y, mPos.x, mPos.y, hPos.x, hPos.y);
    
    getRotatedPos(sAngle, 100, sPos);
    getRotatedPos(mAngle, 50, mPos);
    getRotatedPos(hAngle, 25, hPos);
}

function getRotatedPos(angle, len, pos) {
    push();
    rotate(angle);
    // strokeWeight(5);
    pos.x = len;
    pos.y = 0;
    circle(pos.x, pos.y, 5);
    pop();
}