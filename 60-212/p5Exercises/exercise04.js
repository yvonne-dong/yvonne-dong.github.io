// easing function reference: https://github.com/IDMNYU/p5.js-func/blob/master/lib/p5.func.js

let fontSize = 15;
let step = 50;

function setup() {
    createCanvas(600, 600);
}

function draw() {
    background(0);
    textSize(fontSize);
    noFill();
    stroke(255);
    textAlign(CENTER, CENTER);
    text("Exercise 04", width / 2, fontSize);
    text("Transitioning Rectangles", width / 2, fontSize * 2 + 5);

    let fromC = color(0);
    let toC = color(255);
    for (let i = step; i < width - step; i += step) {
        // let interC = lerpColor(fromC, toC, map(i, step, width - step, 0, 1));
        let mapStep = map(i, step, width - step, 0, 1);
        // cubic in-out lerp color
        let interC = lerpColor(fromC, toC, cubicInOut(mapStep));
        fill(interC);
        rect(i, height - step - i, step, step + i);
    }
}

function DoubleQuadraticSigmoid(_x) {
    y = 0;
    if (_x <= 0.5) {
        y = sq(2.0 * _x) / 2.0;
    }
    else {
        y = 1.0 - sq(2.0 * (_x - 1.0)) / 2.0;
    }
    return y;
}

function cubicInOut(_x) {
    if(_x < 0.5)
    {
        return(4 * _x * _x * _x);
    }
    else
    {
        var _v = ((2 * _x) - 2);
        return(0.5 * _v * _v * _v + 1);
    }
}

