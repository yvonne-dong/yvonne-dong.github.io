let fontSize = 15;

function setup() {
    createCanvas(600, 600);
}

function draw() {
    noLoop();
    background(0);
    textSize(fontSize);
    noFill();
    stroke(255);
    textAlign(CENTER, CENTER);
    text("Exercise 06", width / 2, fontSize);
    text("Random Splat", width / 2, fontSize * 2 + 5);

    beginShape();
    for (let i = 0; i < TWO_PI; i += 0.1) {
        let r = 100 + noise(random(100)) * 50;
        curveVertex(width/2 + cos(i) * r,
            height/2 + sin(i) * r);
    }
    endShape(CLOSE);
}
