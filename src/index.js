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

init();
id = requestAnimationFrame(animate);
