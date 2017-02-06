import init from './init'
import animate from './animation'

var renderer;
var scene;
var camera;
var ball;
var id; // animation id

window.renderer = renderer;
window.scene = scene;
window.camera = camera;
window.ball = ball;
window.id = id;
window.isPlane = false; //是否在平面上

init();
id = requestAnimationFrame(animate);
