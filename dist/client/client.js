import * as THREE from '/build/three.module.js';
import { OrbitControls } from '/jsm/controls/OrbitControls';
import Stats from '/jsm/libs/stats.module';
import { GUI } from '/jsm/libs/dat.gui.module';
import '/pixi.js/dist/pixi.min.js';
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
//document.body.appendChild(renderer.domElement)
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);
camera.position.z = 2;
window.addEventListener('resize', onWindowResize, false);
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    render();
}
const stats = Stats();
document.body.appendChild(stats.dom);
const gui = new GUI();
const cubeFolder = gui.addFolder("Cube");
cubeFolder.add(cube.rotation, "x", 0, Math.PI * 2, 0.01);
cubeFolder.add(cube.rotation, "y", 0, Math.PI * 2, 0.01);
cubeFolder.add(cube.rotation, "z", 0, Math.PI * 2, 0.01);
cubeFolder.open();
const cameraFolder = gui.addFolder("Camera");
cameraFolder.add(camera.position, "z", 0, 10, 0.01);
cameraFolder.open();
var opts = { transparent: false, antialias: true, resolution: window.devicePixelRatio };
var pixiScene = new PIXI.Container();
var pixiCanvas = PIXI.autoDetectRenderer(window.innerWidth, window.innerHeight, opts);
document.body.appendChild(pixiCanvas.view);
var threeCanvasTexture = PIXI.Texture.fromCanvas(renderer.domElement);
var threeCanvasSprite = new PIXI.Sprite(threeCanvasTexture);
pixiScene.addChild(threeCanvasSprite);
threeCanvasSprite.x = (window.innerWidth - threeCanvasSprite.width) / 2;
threeCanvasSprite.y = (window.innerHeight - threeCanvasSprite.height) / 2;
var label = new PIXI.Text("PIXI Canvas", { fontSize: 24, fill: 0xffffff });
label.position.set(Math.round(window.innerWidth - label.width) / 2, Math.round(window.innerHeight - label.height) / 2);
pixiScene.addChild(label);
const controls = new OrbitControls(camera, pixiCanvas.view);
var animate = function () {
    requestAnimationFrame(animate);
    controls.update();
    render();
    threeCanvasSprite.texture.update();
    pixiCanvas.render(pixiScene);
    stats.update();
};
function render() {
    renderer.render(scene, camera);
}
animate();
