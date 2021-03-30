
var storedEmotions = [];
// var visualToggle = false;
var visualToggle = true;


function setup() {
    loadCamera();
    loadTracker();
    loadCanvas(400,300);
}
      
function draw() {
    fill(255);

    getPositions();
    getEmotions();
    
    clear();
    
    noStroke();
    fill(0,150);
    rect(0,0,width,height);
    
    if (visualToggle){
        drawPoints();
        if (emotions) {
            // angry=0, sad=1, surprised=2, happy=3
            for (var i = 0;i < predictedEmotions.length;i++) {
                rect(i * 110+20, height-80, 30, -predictedEmotions[i].value * 30);    
            }
        }
        text("ANGRY", 20, height-40);
        text("SAD", 130, height-40);
        text("SURPRISED", 220, height-40);
        text("HAPPY", 340, height-40); 
    }    
}

function keyPressed(){
    if (key == "s"){
        var current = [predictedEmotions[0], predictedEmotions[1], predictedEmotions[2], predictedEmotions[3]];
        storedEmotions.push(current);
        console.log("saved!");
    } else if (key == "r"){
        if (storedEmotions.length > 0){
            for (var i = 0; i < storedEmotions.length; i++){
                var message = `angry:"${ storedEmotions[i][0]["value"] }", 
                        sad:"${ storedEmotions[i][1]["value"] }", 
                        surprised:"${ storedEmotions[i][2]["value"] }", 
                        happy:"${ storedEmotions[i][3]["value"] }"`;
                console.log(message);
            }
        } else {
            console.log("no saved emotions yet!");
        }
    } else if (key == " "){
        visualToggle = !visualToggle;
    }
}

function drawPoints() {
    fill(255);
    for (var i=0; i<positions.length -3; i++) {
        ellipse(positions[i][0], positions[i][1], 2, 2);
    }
}