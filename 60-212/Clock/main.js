/*
    reference: Flocking by Coding Train 
    https://thecodingtrain.com/CodingChallenges/124-flocking-boids.html
*/

// draw environment: frame, plants, pond

let pond;
let title = 'Ephemeroptera 朝生暮死';
let sceneTitle = ['Stage 1: Emergence', 'Stage 2: Swarming', 'Stage 3: Mating', 'Stage 4: Death'];
let drawSceneTitle = '';
let fontSize = 18;

// emerge, swarm, mate
let mayflySum = [];
// decay
let eggsSum = [];
let eggCount = 0;

// time values
let s, m, h;


//position
let center;

let sceneState = {
    s1: 0,
    s2: 1,
    s3: 2,
    s4: 3
};

let keyOn = false;
let currentState = sceneState.s1;

function preload() {
    myFont = loadFont("AdobeMingStd-Light.otf");
}

function setup() {

    canvas = createCanvas(800, 600);
    center = createVector(width / 2, height / 2);

    // set up environment
    pond = new Pond(450, center);
    drawSceneTitle = sceneTitle[0];
}

function draw() {
    background(0);
    s = second();
    m = minute();
    h = hour();

    // display environment
    pond.display();

    textFont(myFont);
    push();
    fill(0);
    noStroke();
    textSize(fontSize);
    textAlign(RIGHT, BOTTOM);
    text(title,
        center.x + width / 2 - fontSize,
        center.y + height / 2 - fontSize);

    textAlign(LEFT, TOP);
    text(drawSceneTitle,
        center.x - width / 2 + fontSize,
        center.y - height / 2 + fontSize);
    textAlign(LEFT, BOTTOM);
    text('YANWEN DONG 2020',
        center.x - width / 2 + fontSize,
        center.y + height / 2 - fontSize);
    pop();

    if (h >= 0 && h < 6) {
        eggsSum = [];
        if (s == 0) {
            mayflySum = [];
        }
        let newLen = Math.floor(s / 1);
        if (mayflySum.length < newLen) {
            for (let i = 0; i < newLen - mayflySum.length; i++) {
                setupEmerge(mayflySum,
                    createVector(random(center.x - 100, center.x + 100),
                        random(center.y - 100, center.y + 100)));
            }
        }
        drawSceneTitle = sceneTitle[0];
        drawEmerge(mayflySum);
    } else if (h >= 6 && h < 12) {
        drawSceneTitle = sceneTitle[1];
        if (mayflySum.length < 120) {
            for (let i = 0; i < 120; i++) {
                setupEmerge(mayflySum,
                    createVector(random(center.x - 100, center.x + 100),
                        random(center.y - 100, center.y + 100)));
            }
        }
        drawSwarm(mayflySum);
    } else if (h >= 12 && h < 18) {
        drawSceneTitle = sceneTitle[2];
        if (mayflySum.length < 120) {
            for (let i = 0; i < 120; i++) {
                setupEmerge(mayflySum,
                    createVector(random(center.x - 100, center.x + 100),
                        random(center.y - 100, center.y + 100)));
            }
        }
        drawMate(mayflySum);
    } else if (h >= 18 && h < 24) {
        drawSceneTitle = sceneTitle[3];
        if (s == 0) {
            eggsSum = [];
        }
        let newLen = Math.floor(s / 5);
        if (eggsSum.length < newLen) {
            for (let i = 0; i < newLen - eggsSum.length; i++) {
                addEggSystem(eggsSum,
                    createVector(random(center.x - 100, center.x + 100),
                        random(center.y - 100, center.y + 100)), 100);
            }
        }
        if (mayflySum.length < 5) {
            for (let i = 0; i < newLen - mayflySum.length; i++) {
                setupEmerge(mayflySum,
                    createVector(random(center.x - 100, center.x + 100),
                        random(center.y - 100, center.y + 100)));
            }
        }
        drawEmerge(mayflySum);
        drawDecay(eggsSum);
    }

}


function drawScene(scene) {
    switch (currentState) {
        case sceneState.s1:
            drawSceneTitle = sceneTitle[0];
            drawEmerge(mayflySum);
            break;

        case sceneState.s2:
            drawSceneTitle = sceneTitle[1];
            drawSwarm(mayflySum);
            break;

        case sceneState.s3:
            drawSceneTitle = sceneTitle[2];
            drawMate(mayflySum);
            break;

        case sceneState.s4:
            drawSceneTitle = sceneTitle[3];
            drawDecay(eggsSum);
            break;

        default:
            break;
    }
}

function checkTransition(scene) {
    switch (scene) {
        case sceneState.s1:
            if (keyOn) {
                currentState++;
                mayflySum = [];
                eggsSum = [];
                for (let m = 0; m < 120; m++) {
                    mayflySum.push(new Mayfly(createVector(random(center.x - 100, center.x + 100),
                        random(center.y - 100, center.y + 100))));
                }
                setUpScene(currentState);
            }
            break;

        case sceneState.s2:
            if (keyOn) {
                currentState++;
                mayflySum = [];
                for (let m = 0; m < 120; m++) {
                    mayflySum.push(new Mayfly(createVector(random(center.x - 100, center.x + 100),
                        random(center.y - 100, center.y + 100))));
                }
                setUpScene(currentState);
            }
            break;

        case sceneState.s3:
            if (keyOn) {
                currentState++;
                mayflySum = [];
                eggsSum = [];
                for (let m = 0; m < 120; m++) {
                    mayflySum.push(new Mayfly(createVector(random(-100, 100),
                        random(-100, 100))));
                }
                setUpScene(currentState);
            }
            break;

        case sceneState.s4:
            if (keyOn) {
                currentState++;
                mayflySum = [];
                eggsSum = [];
                setUpScene(currentState);
            }
            if (currentState > 3) {
                currentState = 0;
            }
            break;

        default:
            break;
    }
}

function setUpScene(scene) {
    switch (scene) {
        case sceneState.s1:
            break;
        case sceneState.s2:
            break;
        case sceneState.s3:
            break;
        case sceneState.s4:
            break;
        default:
            break;
    }
}

function keyPressed() {
    if (keyCode === ENTER) {
        keyOn = true;
    }
}

// *only for testing*
function mousePressed() {
    addEggSystem(eggsSum, createVector(random(center.x - 100, center.x + 100),
        random(center.y - 100, center.y + 100)));

    //// *move later*
    // if (currentState == 0) {
    //     setupEmerge(mayflySum,
    //         createVector(random(center.x - 100, center.x + 100),
    //             random(center.y - 100, center.y + 100)));
    // }
    // if (currentState == 3) {
    //     addEggSystem(eggsSum, createVector(random(center.x - 100, center.x + 100),
    //         random(center.y - 100, center.y + 100)));
    // }
}


