let fontSize = 15;
let lines = [];
let longestLen = 0;
let longestId = 0;

function setup() {
    createCanvas(600, 600);
    for (let i = 0; i < 15; i ++){
        lines.push(new li());
    }
}

class li{
    constructor(){
        this.pos1 = createVector(random(100, width-100), random(100, height-100));
        this.pos2 = createVector(random(100, width-100), random(100, height-100));
        this.len = dist(this.pos1.x, this.pos1.y, this.pos2.x, this.pos2.y);
        this.c = color(255);
    }

    display(){
        stroke(this.c);
        line(this.pos1.x, this.pos1.y, this.pos2.x, this.pos2.y);
    }
}

function draw(){
    background(0);
    textSize(fontSize);
    noFill();
    stroke(255);
    textAlign(CENTER, CENTER);
    text("Exercise 15", width / 2, fontSize);
    text("Longest Line Search", width / 2, fontSize * 2 + 5);
    
    for (let i = 0; i < lines.length; i ++){
        if (lines[i].len > longestLen){
            longestId = i;
            longestLen = lines[i].len;
        }
    }
    lines[longestId].c = color(255, 0, 0);
    for (let i = 0; i < lines.length; i ++){
        lines[i].display();
    }
}