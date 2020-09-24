let fontSize = 15;

function setup(){
    createCanvas(600, 600);
}

function drawFace(pos, faceSize, eyeSize, eyeDir, mouthType){
    circle(pos.x, pos.y, faceSize);
    // eyes
    circle(pos.x - faceSize * 0.2, pos.y - faceSize * 0.15, eyeSize);
    circle(pos.x + faceSize * 0.2, pos.y - faceSize * 0.15, eyeSize);
    fill(255);
    if (eyeDir == 'right'){
        circle(pos.x - faceSize * 0.2 + eyeSize * 0.25, pos.y - faceSize * 0.15, eyeSize * 0.5);
        circle(pos.x + faceSize * 0.2 + eyeSize * 0.25, pos.y - faceSize * 0.15, eyeSize * 0.5);
    } else if (eyeDir == 'left'){
        circle(pos.x - faceSize * 0.2 - eyeSize * 0.25, pos.y - faceSize * 0.15, eyeSize * 0.5);
        circle(pos.x + faceSize * 0.2 - eyeSize * 0.25, pos.y - faceSize * 0.15, eyeSize * 0.5);
    }
    
    // nose
    line(pos.x, pos.y - faceSize * 0.1, pos.x, pos.y + faceSize * 0.05);

    // mouth
    noFill();
    if (mouthType == 'close'){
        arc(pos.x, pos.y + faceSize * 0.15, faceSize * 0.4, faceSize * 0.4, 0, PI, CHORD);
    } else if (mouthType == 'open'){
        arc(pos.x, pos.y + faceSize * 0.15, faceSize * 0.4, faceSize * 0.4, 0, PI);
    }
}

function draw(){
    background(0);
    textSize(fontSize);
    noFill();
    stroke(255);
    textAlign(CENTER, CENTER);
    text("Exercise 05", width / 2, fontSize);
    text("Iteration with Functions", width / 2, fontSize * 2 + 5);

    for (let col = 100; col < width - 50; col += 60){
        for (let row = 100; row < height - 50; row += 60){
            let mouth = '';
            let eye = '';
            if (parseInt(col/60) % 2 == 0){
                mouth = 'close';
                eye = 'left';
            } else {
                mouth = 'open';
                eye = 'right';
            }
            drawFace(createVector(col, row), 50, 10, eye, mouth);
        }
    }
}