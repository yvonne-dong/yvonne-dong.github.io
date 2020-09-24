/*
    https://cmu.zoom.us/rec/play/vMzA_ZLxmrHSpsNZP-y6Tuq_-_hNhGlDDHAAFy5uloKiXYkywjSZWDWe-u5Ie5i152NXAi1bmsAX3p9S.ZGzqWzlCYYwRbv4f?continueMode=true&_x_zm_rtaid=dxCqDXkgThKoAJy5ZrqMWw.1600839296408.b0e976ce8395bc441869e534e645c76b&_x_zm_rhtaid=125
    pwd: 4Nv2?v17
*/ 

// CAUTION: will take a while to load!!

let fontSize = 15;
let zoom = 115;
let randNum = 0;

function setup() {
    createCanvas(600, 600);
    randNum = random(1000);
}

function draw(){
    background(0);
    

    noStroke();
    for (let row = 0; row < height; row ++){
        for (let col = 0; col < width; col ++){
            let fillC = 255 * noise((randNum + row)/zoom, col/zoom);
            if (fillC < 127){
                fillC = 0;
            } else {
                fillC = 255;
            }
            fill(fillC, 237, 163);
            rect(row, col, 1, 1);
        }
    }

    textSize(fontSize);
    noFill();
    stroke(255);
    textAlign(CENTER, CENTER);
    text("Exercise 12", width / 2, fontSize);
    text("Imaginary Islands", width / 2, fontSize * 2 + 5);
}
