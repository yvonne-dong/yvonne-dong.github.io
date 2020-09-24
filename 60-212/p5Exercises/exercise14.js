let fontSize = 15;
let mouseXYvec = [];

function setup() {
    createCanvas(600, 600);
}

function draw() {
    background(0);
    textSize(fontSize);
    noFill();
    stroke(255);
    textAlign(CENTER, CENTER);
    text("Exercise 14", width / 2, fontSize);
    text("Calligraphic Polyline", width / 2, fontSize * 2 + 5);

    push();
    for (let k = 0; k < mouseXYvec.length; k++) {
        if (k > 0){
            let d = dist(mouseXYvec[k-1].x, mouseXYvec[k-1].y, mouseXYvec[k].x, mouseXYvec[k].y);
            strokeWeight(15-d);
            line(mouseXYvec[k-1].x, mouseXYvec[k-1].y, mouseXYvec[k].x, mouseXYvec[k].y);
            // beginShape();
            

            // endShape(CLOSE);
        }
    }
    pop();
}

function mouseDragged() {
    mouseXYvec.push(createVector(mouseX, mouseY));
}

function perp(vec){

}