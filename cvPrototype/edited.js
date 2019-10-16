// https://kylemcdonald.github.io/cv-examples/
// https://github.com/kylemcdonald/AppropriatingNewTechnologies/wiki/Week-2
// pixel sampling: https://www.youtube.com/watch?v=rNqaw8LT2ZU&t=574s

var capture;
var tracker
var w = 640,
    h = 480;
var face = [];
var faceCutout;
var bg;

function setup() {
    bg = loadImage('sun.png'); //load bg
    capture = createCapture({
        audio: false,
        video: {
            width: w,
            height: h
        }
    }, function() {
        console.log('capture ready.')
    });
    capture.elt.setAttribute('playsinline', '');
    createCanvas(w, h);
    pixelDensity(1);
    capture.size(w, h);
    capture.hide();

    colorMode(HSB);

    tracker = new clm.tracker();
    tracker.init();
    tracker.start(capture.elt);   

    // set up face outline
    for (var i = 0; i < 19; i ++){
        let k = createVector(0, 0);
        face.push(k);
    }
    // set up face cutout mask
    faceCutout = createGraphics(capture.width, capture.height);
}

function draw() {
    background(0);
    image(bg, 0, 0, w, h);
    var positions = tracker.getCurrentPosition();
    faceCutout.clear();
    noFill();
    stroke(255);
    for (var i = 0; i < positions.length; i++) {
        vertex(positions[i][0], positions[i][1]);
        if (i < 20){
            face[i] = createVector(positions[i][0], positions[i][1]);
        }
    }

    faceCutout.beginShape();
    for (var i = 0; i < face.length; i++){
        faceCutout.vertex(face[i].x, face[i].y);
    }
    faceCutout.endShape(CLOSE);

    capture.loadPixels();
    faceCutout.loadPixels();
    for (let y = 0; y < h; y++) {
        for (let x = 0; x < w; x++) {
            let i = (x + y * faceCutout.width) * 4;
            capture.pixels[i + 3] = faceCutout.pixels[i + 3];
        }
    }
    faceCutout.updatePixels();
    capture.updatePixels();

    image(capture, 0, 0, w, h);
}
