var button;
 
function setup() {
  createCanvas(500,500);
 
   button = createButton('GO TO URL');
   button.position(100,100);
   button.size(100,100);
   button.mousePressed(greet);
 
  function greet() {
    window.location.href = "http://www.google.com";
}
}