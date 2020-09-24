/*
    https://cmu.zoom.us/rec/play/vMzA_ZLxmrHSpsNZP-y6Tuq_-_hNhGlDDHAAFy5uloKiXYkywjSZWDWe-u5Ie5i152NXAi1bmsAX3p9S.ZGzqWzlCYYwRbv4f?continueMode=true&_x_zm_rtaid=dxCqDXkgThKoAJy5ZrqMWw.1600839296408.b0e976ce8395bc441869e534e645c76b&_x_zm_rhtaid=125
    pwd: 4Nv2?v17
*/ 

let fontSize = 15;
let squareSize = 20;

function setup() {
    createCanvas(600, 600);
    rectMode(CENTER);
}

function draw(){
    noLoop();
    background(0);
    textSize(fontSize);
    noFill();
    stroke(255);
    textAlign(CENTER, CENTER);
    text("Exercise 08", width / 2, fontSize);
    text("Recoding Schotter", width / 2, fontSize * 2 + 5);

    push();
    translate(width/2 - 5.5 * 20, fontSize * 2 + 50);
    for (let row = 0; row < 22; row ++){
        for (let col = 0; col < 12; col ++){
            let angle = map(row, 0, 22, 0, 0.3 * PI) * random(-1, 1);
            let offset = map(row, 0, 22, 0, 10) * random(-1, 1);
            push();
            translate(col * squareSize, row * squareSize);
            rotate(angle);
            rect(offset, offset, squareSize, squareSize);
            pop();
        } 
    }
    pop();
}