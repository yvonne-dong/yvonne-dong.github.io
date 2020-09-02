var canvasWidth = window.innerWidth - 50;
var canvasHeight = window.innerHeight - 50;

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, canvasWidth / canvasHeight, 0.1, 1000);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(canvasWidth, canvasHeight);
document.body.appendChild(renderer.domElement);

var controls = new THREE.OrbitControls(camera);
controls.enableDamping = true;
controls.dampingFactor = 0.1;
controls.screenSpacePanning = false;

var frameSize = 50;
var shapeSize = 10;
var step = 15;

var randomDetail = 5;
var randomObjectNum = 50; //50-150

var shapeSize = 1;
var pos = [];
var shapes = [];

var material = new THREE.MeshNormalMaterial({
    wireframe: true
});

//helper function
function getRandomNum(num, min, max) {
    num = min + Math.floor(Math.random() * Math.floor(max));
}

for (var i = -frameSize; i < frameSize; i += step) {
    for (var j = -frameSize; j < frameSize; j += step) {
        for (var k = -frameSize; k < frameSize; k += step) {
            var p = new THREE.Vector3(i, j, k);
            pos.push(p);
        }
    }
}

function drawObjects() {
    // console.log(pos.length);
    scene.remove.apply(scene, scene.children);
    for (var i = 0; i < randomObjectNum; i++) {
        var randomPosId = Math.floor(Math.random() * Math.floor(pos.length));
        //for some reason the helper function didn't work...
        var size = 1 + Math.floor(Math.random() * Math.floor(8));
        var detail = Math.floor(Math.random() * Math.floor(5));
        var shape = new THREE.Mesh(new THREE.OctahedronGeometry(size, detail), material);
        shape.position.set(pos[randomPosId].x, pos[randomPosId].y, pos[randomPosId].z);
        scene.add(shape);
        shapes.push(shape);
    }
}

drawObjects();

document.addEventListener("keydown", onDocumentKeyDown, false);
function onDocumentKeyDown(event) {
    var keyCode = event.which;
    if (keyCode == 32) {
        getRandomNum(randomObjectNum, 50, pos.length);
        drawObjects();
    }
}

camera.position.z = 5;

var animate = function () {
    requestAnimationFrame(animate);
    controls.update();
    for (var i = 0; i < shapes.length; i ++){
        shapes[i].rotation.x += 0.0001 * i;
        shapes[i].rotation.y -= 0.0001 * i;
    }
    renderer.render(scene, camera);
};

animate();