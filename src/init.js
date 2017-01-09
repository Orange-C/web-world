import {createEvents} from './keyboard';
import config from './config';
import {createAxis} from './tools'

export default function init() {
    // 初始化Renderer
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(600, 450);
    document.getElementsByTagName('body')[0].appendChild(renderer.domElement);
    renderer.setClearColor(0x000000);

    // 初始化scene
    scene = new THREE.Scene();

    // 初始化camera
    camera = new THREE.PerspectiveCamera(45, 4/3, 1, 100*config.focalDistance);
    camera.position.set(4*config.focalDistance, 3*config.focalDistance, 5*config.focalDistance);
    camera.lookAt(new THREE.Vector3(0, 0, 0));
    scene.add(camera);

    createAxis();

    initPlane();
    initBall();
    initLight();
    addFunc();    
    createEvents();

    renderer.render(scene, camera);
}

function addFunc() {
    camera.rotateY = function(rad, minus) {
        let delta = rad;

        if(minus) {
            delta = -delta;
        }

        let x = this.position.x * Math.cos(delta) - this.position.z * Math.sin(delta);
        let z = this.position.z * Math.cos(delta) + this.position.x * Math.sin(delta);
        camera.position.set(x, this.position.y, z);
        camera.lookAt(new THREE.Vector3(0, 0, 0));
    }

    ball.v = new THREE.Vector3(0, 0, 0);
}

function initBall() {
    ball = new THREE.Mesh(new THREE.SphereGeometry(config.R, 16, 16),
        new THREE.MeshLambertMaterial({
            color: 0x00cccc,
        })
    );
    ball.position.set(0, config.R, 0);
    ball.castShadow = true;
    ball.receiveShadow = true;
    scene.add(ball);
}

function initPlane() {
    var plane = new THREE.Mesh(new THREE.CubeGeometry(4*config.focalDistance, 1, 4*config.focalDistance),
        new THREE.MeshLambertMaterial({
            color: 0xe8e8e8,
        })
    );
    plane.position.setY(-0.5);
    plane.receiveShadow = true;
    scene.add(plane);
}

function initLight() {
    var ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);

    renderer.shadowMap.enabled = true;
    renderer.shadowMapSoft = true;
    
    var light = new THREE.PointLight(0xffffff, 1, 1000);
    light.position.set(-4*config.focalDistance, 5*config.focalDistance, -5*config.focalDistance);
    light.castShadow = true;

    light.shadow.camera.near = 1;
    light.shadow.camera.far = 1000;
    light.shadow.camera.fov = 90;

    light.shadow.mapSize.width = 1024;
    light.shadow.mapSize.height = 1024;
    scene.add(light);

    // var lightHelper = new THREE.CameraHelper(light.shadow.camera);
    // scene.add(lightHelper);
}