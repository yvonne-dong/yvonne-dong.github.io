// example: https://github.com/mrdoob/three.js/blob/master/examples/webgl_geometry_dynamic.html

var canvasWidth = 640;
var canvasHeight = 640;

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, canvasWidth / canvasHeight, 0.1, 1000);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(canvasWidth, canvasHeight);
document.body.appendChild(renderer.domElement);

var controls = new THREE.OrbitControls(camera);
controls.enableDamping = true;
controls.dampingFactor = 0.1;
controls.screenSpacePanning = false;

var treePosId = [];

function getRandomNum(min, max) {
    var num = min + Math.floor(Math.random() * Math.floor(max));
    return num;
}

function drawObjects() {
    scene.remove.apply(scene, scene.children);
    var light = new THREE.DirectionalLight(0xffffff);
    light.position.set(0, 10, 0).normalize();
    scene.add(light);

    var geometry = new THREE.PlaneBufferGeometry(100, 100, 10, 10);
    geometry.rotateX(-Math.PI / 2);
    var material = new THREE.MeshPhongMaterial({ color: 0x452500, side: THREE.DoubleSide });
    var terrain = new THREE.Mesh(geometry, material);

    var position = geometry.attributes.position;
    position.usage = THREE.DynamicDrawUsage;

    for (var j = 0; j < position.count; j++) {
        treePosId.push(j);
    }
    // //reference: selecting elements from array without repeating https://jsfiddle.net/abdennour/oh3jL82j/
    var randomize = treePosId.sort(function () { return .5 - Math.random() });
    var treePosIdSelected = randomize.slice(0, 50);

    var vector = new THREE.Vector3();

    for (var i = 0; i < position.count; i++) {
        var height = getRandomNum(5, 10);
        var y = height * Math.random();
        position.setY(i, y);
        var treeGeometry = new THREE.ConeGeometry(3, 8, 30);
        var treeMaterial = new THREE.MeshPhongMaterial({ color: 0x00ff00, side: THREE.DoubleSide });
        var cone = new THREE.Mesh(treeGeometry, treeMaterial);
        vector.fromBufferAttribute(position, i);
        // console.log(vect);
        cone.position.set(vector.x, vector.y + 4, vector.z);
        scene.add(cone);
       
    }
    var wireframe = new THREE.WireframeGeometry(geometry);
    var line = new THREE.LineSegments(wireframe);
    line.material.color.r = 0.16;
    line.material.color.g = 0.08;
    line.material.color.b = 0;
    line.material.depthTest = false;
    line.material.transparent = true;
    scene.add(line);
    scene.add(terrain);

}

drawObjects();

document.addEventListener("keydown", onDocumentKeyDown, false);
function onDocumentKeyDown(event) {
    var keyCode = event.which;
    if (keyCode == 32) {
        // getRandomNum(randomObjectNum, 50, pos.length);
        drawObjects();
    }
}

camera.position.z = 5;

var animate = function () {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
};

animate();