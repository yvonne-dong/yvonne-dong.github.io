let position;
let shape;

let poses = [];
let usedPoses = [];
let cornerPoses = [[0, 0, 0, 0]];
let sidePoses = [[0, 0, 0, 0]];
let shapes = [];

let title = ["SHAPE GRAMMAR 1: A + B", "SHAPE GRAMMAR 2: A □ B", "SHAPE GRAMMAR 3: A ⊙ B"];
function setup() {
    canvas = createCanvas(600, 600);
    rectMode(CENTER);
    textAlign(CENTER, CENTER);
    position = createVector(0, 0);


    for (var y = 40; y < height - 20; y += 20) {
        for (var x = 40; x < width - 20; x += 20) {
            poses.push(createVector(x, y));
        }
    }
    let idx = parseInt(random(poses.length));
    position = poses[idx];
    usedPoses.push(position);
    cornerPoses[0][0] = createVector(position.x + 20, position.y + 20);
    cornerPoses[0][1] = createVector(position.x + 20, position.y - 20);
    cornerPoses[0][2] = createVector(position.x - 20, position.y + 20);
    cornerPoses[0][3] = createVector(position.x - 20, position.y - 20);

    sidePoses[0][0] = createVector(position.x + 20, position.y);
    sidePoses[0][1] = createVector(position.x - 20, position.y);
    sidePoses[0][2] = createVector(position.x, position.y + 20);
    sidePoses[0][3] = createVector(position.x, position.y - 20);

    shape = new Shape(position, 40, 0);
    shapes.push(shape);
}

function draw() {
    background(0);
    fill(255);
    text(title[0], width / 2, 25);
    // text(title[1], width / 2, 25);
    // text(title[2], width / 2, 25);
    drawPoses();
    for (var j = 0; j < shapes.length; j++) {
        shapes[j].display();
    }
}

function drawPoses() {
    push();
    stroke(255);
    for (var i = 0; i < poses.length; i++) {
        point(poses[i].x, poses[i].y);
    }
    pop();
}

function Shape(_pos, _size, _mode) {
    this.pos = _pos;
    this.size = _size;
    this.mode = _mode;

    // A + B
    this.display = function () {
        push();
        if (this.mode == 0) {
            stroke(255, 255, 0);
            noFill();
            rect(_pos.x, _pos.y, this.size, this.size);
        } else if (this.mode == 1) {
            stroke(0);
            fill(0);
            rect(_pos.x, _pos.y, this.size * 1.1, this.size * 1.1);
            stroke(255, 255, 0);
            fill(255, 255, 0);
            circle(_pos.x, _pos.y, 2);
        } else if (this.mode == 2.1) {
            stroke(0);
            fill(0);
            // rect(_pos.x, _pos.y, this.size, this.size);
            rect(_pos.x, _pos.y, this.size * 1.1, this.size * 2.1);
            stroke(255, 255, 0);
            fill(255, 255, 0);
            circle(_pos.x, _pos.y - this.size / 2, 2);
            circle(_pos.x, _pos.y + this.size / 2, 2);
        } else if (this.mode == 2.2) {
            stroke(0);
            fill(0);
            // rect(_pos.x, _pos.y, this.size, this.size);
            rect(_pos.x, _pos.y, this.size * 2.1, this.size * 1.1);
            stroke(255, 255, 0);
            fill(255, 255, 0);
            circle(_pos.x - this.size / 2, _pos.y, 2);
            circle(_pos.x + this.size / 2, _pos.y, 2);
        }
        pop();
    }

    // A □ B

    // A ⊙ B
}

function keyPressed(){

}

function mousePressed() {
    let newPos = createVector(0, 0);
    let coverPos = createVector(0, 0);
    if (mouseX < width - 40 && mouseX > 40) {
        if (mouseY < height - 40 && mouseY > 40) {
            for (var m = 0; m < sidePoses.length; m++) {
                for (var n = 0; n < 4; n++) {
                    let s = sidePoses[m][n];
                    dS = dist(mouseX, mouseY, s.x, s.y);
                    if (dS < 10) {
                        let dir = createVector(mouseX - usedPoses[m].x, mouseY - usedPoses[m].y);
                        newPos.x = s.x;
                        newPos.y = s.y;
                        coverPos.x = (usedPoses[m].x + s.x) / 2;
                        coverPos.y = (usedPoses[m].y + s.y) / 2;
                        shapes.push(new Shape(newPos, 40, 0));
                        if (abs(dir.x) < abs(dir.y)) {
                            shapes.push(new Shape(coverPos, 20, 2.2));
                        } else if (abs(dir.x) > abs(dir.y)) {
                            shapes.push(new Shape(coverPos, 20, 2.1));
                        }

                        usedPoses.push(newPos);
                        sidePoses.push(
                            [
                                createVector(newPos.x + 20, newPos.y),
                                createVector(newPos.x - 20, newPos.y),
                                createVector(newPos.x, newPos.y + 20),
                                createVector(newPos.x, newPos.y - 20)
                            ]
                        );
                        cornerPoses.push(
                            [
                                createVector(newPos.x + 20, newPos.y + 20),
                                createVector(newPos.x + 20, newPos.y - 20),
                                createVector(newPos.x - 20, newPos.y + 20),
                                createVector(newPos.x - 20, newPos.y - 20)
                            ]
                        );
                    }
                }
            }
            for (var i = 0; i < cornerPoses.length; i++) {
                for (var j = 0; j < 4; j++) {
                    let p = cornerPoses[i][j];
                    d = dist(mouseX, mouseY, p.x, p.y);
                    if (d < 10) {
                        newPos.x = p.x;
                        newPos.y = p.y;
                        coverPos.x = (usedPoses[i].x + p.x) / 2;
                        coverPos.y = (usedPoses[i].y + p.y) / 2;
                        shapes.push(new Shape(newPos, 40, 0));
                        shapes.push(new Shape(coverPos, 20, 1));
                        usedPoses.push(newPos);
                        cornerPoses.push(
                            [
                                createVector(newPos.x + 20, newPos.y + 20),
                                createVector(newPos.x + 20, newPos.y - 20),
                                createVector(newPos.x - 20, newPos.y + 20),
                                createVector(newPos.x - 20, newPos.y - 20)
                            ]
                        );
                        sidePoses.push(
                            [
                                createVector(newPos.x + 20, newPos.y),
                                createVector(newPos.x - 20, newPos.y),
                                createVector(newPos.x, newPos.y + 20),
                                createVector(newPos.x, newPos.y - 20)
                            ]
                        );
                    }
                }
            }
        }
    }
}