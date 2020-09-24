// star function: https://p5js.org/examples/form-star.html

let fontSize = 15;
let count = 0;

function setup() {
    createCanvas(600, 600);
    count = parseInt(random(50, 100));
}

function drawStar(pos, innerR, outerR, points){
    let angle = TWO_PI / points;
    let halfAngle = angle / 2;
    beginShape();
    for (let i = 0; i < TWO_PI; i += angle){
        let x = pos.x + cos(i) * outerR;
        let y = pos.y + sin(i) * outerR;
        vertex(x, y);
        x = pos.x + cos(i + halfAngle) * innerR;
        y = pos.y + sin(i + halfAngle) * innerR;
        vertex(x, y);
    }
    endShape(CLOSE);
}

function draw() {
    noLoop();
    background(0);
    textSize(fontSize);
    noFill();
    stroke(255);
    textAlign(CENTER, CENTER);
    text("Exercise 07", width / 2, fontSize);
    text("Stochastic Elements", width / 2, fontSize * 2 + 5);

    for (let j = 0; j < count; j ++){
        let randomPos = createVector(random(width), random(height));
        let randomInnerR = parseInt(random(5, 20));
        let randomOuterR = parseInt(random(21, 50));
        let randomPts = parseInt(random(3, 10));
        drawStar(randomPos, randomInnerR, randomOuterR, randomPts);
    }
}