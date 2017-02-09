import { createEvents } from './keyboard';
import { collisionObjs } from './collision';
import config from './config';
import { createAxis, addV, subtractV } from './utils'
import animate from './animation';
import { createNormalBlock } from './obj';

export default function init() {
    // 初始化config.renderer
    config.renderer = new THREE.WebGLRenderer({
        antialias:true,
        precision:"highp",
        preserveDrawingBuffer:true
    });
    config.renderer.setSize(600, 450);
    document.getElementById('canvas-box').appendChild(config.renderer.domElement);
    config.renderer.setClearColor(0x000000);

    // 初始化config.scene
    config.scene = new THREE.Scene();

    // 初始化config.camera
    config.camera = new THREE.PerspectiveCamera(45, 4/3, 1, 100*config.focalDistance);
    config.camera.position.set(4*config.focalDistance, 3*config.focalDistance, 5*config.focalDistance);
    config.camera.lookAt(new THREE.Vector3(0, 0, 0));
    config.scene.add(config.camera);

    createAxis();

    initPlane();
    initBall();
    initLight();
    addFunc();    
    createEvents();

    config.renderer.render(config.scene, config.camera);

    config.id = requestAnimationFrame(animate);
}

function initLight() {
    var ambientLight = new THREE.AmbientLight(0x404040);
    config.scene.add(ambientLight);

    config.renderer.shadowMap.enabled = true;
    config.renderer.shadowMapSoft = true;
    
    var light = new THREE.PointLight(0xffffff, 1, 1000);
    light.position.set(-4*config.focalDistance, 5*config.focalDistance, 5*config.focalDistance);
    light.castShadow = true;

    light.shadow.camera.near = 1;
    light.shadow.camera.far = 1000;
    light.shadow.camera.fov = 90;

    light.shadow.mapSize.width = 1024;
    light.shadow.mapSize.height = 1024;
    config.scene.add(light);

    // var lightHelper = new THREE.config.cameraHelper(light.shadow.config.camera);
    // config.scene.add(lightHelper);
}

function addFunc() {
    config.camera.rotateY = function(rad, minus) {
        let delta = rad;

        if(minus) {
            delta = -delta;
        }

        let r = subtractV(config.ball.position, this.position);
        r.negate();
        let newR = new THREE.Vector3(r.x * Math.cos(delta) - r.z * Math.sin(delta), r.y, r.z * Math.cos(delta) + r.x * Math.sin(delta)) 
        let newP = addV(this.position, subtractV(newR, r));
        this.position.set(newP.x, newP.y, newP.z);
    }
}

function initBall() {
    config.ball = new THREE.Mesh(new THREE.SphereGeometry(config.R, 32, 32),
        new THREE.MeshLambertMaterial({
            color: 0x00cccc,
        })
    );
    config.ball.position.set(0, 10, 0);
    config.ball.castShadow = true;
    config.ball.receiveShadow = true;

    config.ball.newP = new THREE.Vector3(0, 0, 0);
    config.ball.v = new THREE.Vector3(0, 0, 0);
    config.ball.f = new THREE.Vector3(0, 0, 0);
    config.ball.m = 1;
    config.ball.R = config.R;

    config.scene.add(config.ball);
}

function initPlane() {
    var plane = new THREE.Mesh(new THREE.BoxGeometry(16*config.focalDistance, 1, 16*config.focalDistance),
        new THREE.MeshLambertMaterial({
            color: 0xe8e8e8,
        })
    );
    plane.position.setY(-0.5);
    plane.receiveShadow = true;
    collisionObjs.push(plane);
    config.scene.add(plane);

    var obj = createNormalBlock({
        len: [8, 2, 8],
        pos: [-2, 1, 0],
        color: 0xff0000
    });
    collisionObjs.push(obj);
    config.scene.add(obj);

    var obj2 = createNormalBlock({
        len: [8, 2, 8],
        pos: [-8, 3, 0],
        color: 0x00ff00
    });
    collisionObjs.push(obj2);
    config.scene.add(obj2);

    var obj3 = createNormalBlock({
        len: [8, 2, 8],
        pos: [-14, 5, 0],
        color: 0x0000ff
    });
    collisionObjs.push(obj3);
    config.scene.add(obj3);

    var wall1 = createNormalBlock({
        len: [30, 16, 2],
        pos: [0, 8, 5],
        color: 0xffffff,
        shadow: false,
    });
    collisionObjs.push(wall1);
    config.scene.add(wall1);

    var wall2 = createNormalBlock({
        len: [30, 16, 2],
        pos: [0, 8, -5],
        color: 0xffffff,
        shadow: false,
    });
    collisionObjs.push(wall2);
    config.scene.add(wall2);
}