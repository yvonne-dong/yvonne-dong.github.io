
// This is a template for creating a looping animation in p5.js (JavaScript). 
// When you press the 'F' key, this program will export a series of images into
// your default Downloads folder. These can then be made into an animated gif. 
// This code is known to work with p5.js version 0.6.0
// Prof. Golan Levin, 28 January 2018

// INSTRUCTIONS FOR EXPORTING FRAMES (from which to make a GIF): 
// 1. Run a local server, using instructions from here:
//    https://github.com/processing/p5.js/wiki/Local-server
// 2. Set the bEnableExport variable to true.
// 3. Set the myNickname variable to your name.
// 4. Run the program from Chrome, press 'f'. 
//    Look in your 'Downloads' folder for the generated frames.
// 5. Note: Retina screens may export frames at twice the resolution.


/*
  reference: 
    Attractor & mover by Daniel Shiffman: https://natureofcode.com/book/chapter-2-forces/
    https://github.com/golanlevin/Pattern_Master 
*/

//===================================================
// User-modifiable global variables. 
var myNickname = "yanwen";
var nFramesInLoop = 120;
var bEnableExport = false;

// Other global variables you don't need to touch.
var nElapsedFrames;
var bRecording;
var theCanvas;

var cam;
var camD = 0.01;
var theShader;
var shaderTexture;
var movers = [];
var attractor;
//===================================================
function preload() {
  // load the shader
  theShader = loadShader('assets/shader.vert', 'assets/shader.frag');
}

//===================================================
function setup() {
  theCanvas = createCanvas(500, 200, WEBGL);
  shaderTexture = createGraphics(500, 200, WEBGL);

  frameRate(22);
  bRecording = false;
  nElapsedFrames = 0;

  // cam = createCamera();
  // cam.pan(0);
  shaderTexture.noStroke();

  for (var i = 0; i < 20; i++) {
    movers[i] = new Mover(random(0.1, 5), random(width), random(height));
  }
  attractor = new Attractor();
}

//===================================================
function keyTyped() {
  if (bEnableExport) {
    if ((key === 'f') || (key === 'F')) {
      bRecording = true;
      nElapsedFrames = 0;
    }
  }
}

//===================================================
function draw() {

  // Compute a percentage (0...1) representing where we are in the loop.
  var percentCompleteFraction = 0;
  if (bRecording) {
    percentCompleteFraction = float(nElapsedFrames) / float(nFramesInLoop);
  } else {
    percentCompleteFraction = float(frameCount % nFramesInLoop) / float(nFramesInLoop);
  }

  // Render the design, based on that percentage. 
  // This function renderMyDesign() is the one for you to change. 
  renderMyDesign(percentCompleteFraction);

  // If we're recording the output, save the frame to a file. 
  // Note that the output images may be 2x large if you have a Retina mac. 
  // You can compile these frames into an animated GIF using a tool like: 
  if (bRecording && bEnableExport) {
    var frameOutputFilename = myNickname + "_frame_" + nf(nElapsedFrames, 4) + ".png";
    print("Saving output image: " + frameOutputFilename);
    saveCanvas(theCanvas, frameOutputFilename, 'png');
    nElapsedFrames++;

    if (nElapsedFrames >= nFramesInLoop) {
      bRecording = false;
    }
  }
}

//===================================================
function renderMyDesign(percent) {
  //
  // THIS IS WHERE YOUR ART GOES. 
  // This is an example of a function that renders a temporally looping design. 
  // It takes a "percent", between 0 and 1, indicating where we are in the loop. 
  // Use, modify, or delete whatever you prefer from this example. 
  // This example uses several different graphical techniques. 
  // Remember to SKETCH FIRST!

  // cam.pan(camD);
  shaderTexture.shader(theShader);

  theShader.setUniform("u_resolution", [width, height]);
  theShader.setUniform("u_time", millis() / 1000.0);
  theShader.setUniform("u_mouse", [mouseX, map(mouseY, 0, height, height, 0)]);

  shaderTexture.rect(0, 0, width, height);


  background(DoubleQuadraticSigmoid(mouseX));

  texture(shaderTexture);
  // details = parseInt(map(mouseX, 0, width, 3, 20));
  strokeWeight(1);
  stroke(0);
  // sphere(30, details, details);
  // sphere(30, 10, 10);

  attractor.display();
  for (var i = 0; i < movers.length; i++) {
    var force = attractor.attraction(movers[i]);
    movers[i].addForce(force);
    movers[i].update();
    movers[i].display();
  }
}

function DoubleQuadraticSigmoid(x) {
  //function: "Double-Quadratic Sigmoid"
  y = 0;
  if (x <= 0.5) {
    y = sq(2.0 * x) / 2.0;
  }
  else {
    y = 1.0 - sq(2.0 * (x - 1.0)) / 2.0;
  }
  return y;
}

