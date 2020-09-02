// inspired by this example: https://github.com/mrdoob/three.js/blob/master/examples/webgl_geometry_dynamic.html

var canvasWidth = 640;
var canvasHeight = 640;

//terrain
var terrainSize = 100;
var terrainDetails = 10;

//trees
var coneRadius = 5; //1-5
var bushRadius = 5;
var coneHeight = 8; //3-10
var coneDetails = 32;
var treePos = []; //store tree positions

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, canvasWidth / canvasHeight, 0.1, 1000);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(canvasWidth, canvasHeight);
renderer.setClearColor(0xffd980, 1);
document.body.appendChild(renderer.domElement);

var controls = new THREE.OrbitControls(camera);
controls.enableDamping = true;
controls.dampingFactor = 0.1;
controls.screenSpacePanning = false;

//get random number between min & max
function getRandomNum(min, max) {
    var num = min + Math.floor(Math.random() * Math.floor(max));
    return num;
}

function drawTerrain() {
    scene.remove.apply(scene, scene.children);
    var light = new THREE.PointLight(0xffffff);
    light.position.set(-100, 350, 10);
    scene.add(light);

    var terrainGeometry = new THREE.PlaneBufferGeometry(terrainSize, terrainSize, terrainDetails, terrainDetails);

    terrainGeometry.rotateX(-Math.PI / 2);
    var material = new THREE.MeshPhongMaterial({ color: 0x754a00, side: THREE.DoubleSide });
    var terrain = new THREE.Mesh(terrainGeometry, material);

    var position = terrainGeometry.attributes.position;
    position.usage = THREE.DynamicDrawUsage;
    for (var i = 0; i < position.count; i++) {
        var vector = new THREE.Vector3();
        var height = getRandomNum(5, 10);
        var y = height * Math.random();
        position.setY(i, y);
        treePos.push(vector.fromBufferAttribute(position, i));
    }

    //get random elements from array, reference: https://jsfiddle.net/abdennour/oh3jL82j/
    var randomize1 = treePos.sort(function () { return .5 - Math.random() });
    var conePos = randomize1.slice(0, 20);

    var randomize2 = treePos.sort(function () { return .5 - Math.random() });
    var bushPos = randomize2.slice(0, 20);

    for (var j = 0; j < conePos.length; j++) {
        coneRadius = getRandomNum(2, 5);
        coneHeight = getRandomNum(4, 15);
        bushRadius = getRandomNum(3, 7);
        var coneGeometry = new THREE.ConeGeometry(coneRadius, coneHeight, coneDetails);
        var coneMaterial = new THREE.MeshPhongMaterial({ color: 0x319c00, side: THREE.DoubleSide });
        var cone = new THREE.Mesh(coneGeometry, coneMaterial);

        var trunkGeometry = new THREE.CylinderGeometry(1, 1, 10, 32);
        var trunkMaterial = new THREE.MeshPhongMaterial({ color: 0x240e00, side: THREE.DoubleSide });
        var trunk1 = new THREE.Mesh(trunkGeometry, trunkMaterial);
        var trunk2 = new THREE.Mesh(trunkGeometry, trunkMaterial);

        var treeGeometry2 = new THREE.SphereGeometry(bushRadius, 5, 5);
        var bushMaterial = new THREE.MeshPhongMaterial({ color: 0x42d100, side: THREE.DoubleSide });
        var bush = new THREE.Mesh(treeGeometry2, bushMaterial);
        
        trunk1.position.set(conePos[j].x, conePos[j].y + 2.5, conePos[j].z);
        trunk2.position.set(bushPos[j].x, bushPos[j].y + 2.5, bushPos[j].z);
        scene.add(trunk1);
        scene.add(trunk2);

        cone.position.set(conePos[j].x, conePos[j].y + 7.5, conePos[j].z);
        bush.position.set(bushPos[j].x, bushPos[j].y + 7.5, bushPos[j].z);        
        scene.add(bush);
        scene.add(cone);
    }
    scene.add(terrain);
}

drawTerrain();

document.addEventListener("keydown", onDocumentKeyDown, false);
function onDocumentKeyDown(event) {
    var keyCode = event.which;
    if (keyCode == 32) {
        drawTerrain();
    }
}

camera.position.z = 5;

var animate = function () {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
};

animate();