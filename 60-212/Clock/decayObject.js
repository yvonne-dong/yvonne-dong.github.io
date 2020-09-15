
let poses = [];

function setup() {
    canvas = createCanvas(800, 600, WEBGL);
    for (var i = 0; i < 1440; i ++){
        let pos = createVector(0, 0);
        poses.push(pos);
    }
}

function draw() {
    background(0);
    stroke(255);
    noFill();
    beginShape(TRIANGLE_STRIP);
    vertex(30, 5, 10);
    vertex(10, 20, 30);
    vertex(85, 25, 20);
    vertex(40, 75, 0);
    endShape(CLOSE);
}