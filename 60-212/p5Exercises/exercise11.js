/*
    https://cmu.zoom.us/rec/play/vMzA_ZLxmrHSpsNZP-y6Tuq_-_hNhGlDDHAAFy5uloKiXYkywjSZWDWe-u5Ie5i152NXAi1bmsAX3p9S.ZGzqWzlCYYwRbv4f?continueMode=true&_x_zm_rtaid=dxCqDXkgThKoAJy5ZrqMWw.1600839296408.b0e976ce8395bc441869e534e645c76b&_x_zm_rhtaid=125
    pwd: 4Nv2?v17
*/ 

let fontSize = 15;
let cols = [];
let rows = [];
let count = 20;

function setup() {
    createCanvas(600, 600);
    for (let i = 0; i < count; i++) {
        let rCol = 0;
        let rRow = 0;
        if (random(0, 1) < 0.5) {
            rCol = 0;
            rRow = 0;
        } else {
            rCol = 1;
            rRow = 1;
        }
        cols.push(rCol);
        rows.push(rRow);
    }
}

function draw() {
    background(0);
    textSize(fontSize);
    noFill();
    stroke(255);
    textAlign(CENTER, CENTER);
    text("Exercise 11", width / 2, fontSize);
    text("Hitomezashi Sashiko Stitching", width / 2, fontSize * 2 + 5);

    push();
    translate(100, 100);
    let gap = 20;
    for (let j = 0; j < count; j++) {
        let x = j * gap;
        for (let k = 0; k < count; k++) {
            if ((k + 1) % 2 == cols[j]) {
                y1 = (k + 0) * gap;
                y2 = (k + 1) * gap;
                line(x, y1, x, y2);
            }
        }
    }

    for (let j = 0; j < count; j++) {
        let y = j * gap;
        for (let k = 0; k < count; k++) {
            if ((k + 1) % 2 == cols[j]) {
                x1 = (k + 0) * gap;
                x2 = (k + 1) * gap;
                line(x1, y, x2, y);
            }
        }
    }
    pop();
}