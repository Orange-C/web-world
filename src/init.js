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
    camera = new THREE.PerspectiveCamera(45, 4/3, 1, 10*config.focalDistance);
    camera.position.set(4*config.focalDistance, 3*config.focalDistance, 5*config.focalDistance);
    camera.lookAt(new THREE.Vector3(0, 0, 0));
    scene.add(camera);

    createAxis();

    initPlane();
    initBall();
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
        new THREE.MeshBasicMaterial({
            color: 0x00cccc,
            wireframe: true
        })
    );
    ball.position.set(0, config.R, 0);
    scene.add(ball);
}

function initPlane() {
    var plane = new THREE.Mesh(new THREE.PlaneGeometry(4*config.focalDistance, 4*config.focalDistance, 8, 8),
        new THREE.MeshBasicMaterial({
            color: 0xffffff,
            wireframe: true
        })
    );
    plane.rotateX(Math.PI/2);
    scene.add(plane);
}

