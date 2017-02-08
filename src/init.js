import { createEvents } from './keyboard';
import { collisionObjs } from './collision';
import config from './config';
import { createAxis, addV, subtractV } from './tools'

export default function init() {
    // 初始化Renderer
    renderer = new THREE.WebGLRenderer({
        antialias:true,
        precision:"highp",
        preserveDrawingBuffer:true
    });
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

function initLight() {
    var ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);

    renderer.shadowMap.enabled = true;
    renderer.shadowMapSoft = true;
    
    var light = new THREE.PointLight(0xffffff, 1, 1000);
    light.position.set(-4*config.focalDistance, 5*config.focalDistance, 5*config.focalDistance);
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

function addFunc() {
    camera.rotateY = function(rad, minus) {
        let delta = rad;

        if(minus) {
            delta = -delta;
        }

        let r = subtractV(ball.position, this.position);
        r.negate();
        let newR = new THREE.Vector3(r.x * Math.cos(delta) - r.z * Math.sin(delta), r.y, r.z * Math.cos(delta) + r.x * Math.sin(delta)) 
        let newP = addV(this.position, subtractV(newR, r));
        this.position.set(newP.x, newP.y, newP.z);
    }

    ball.newP = new THREE.Vector3(0, 0, 0);
    ball.v = new THREE.Vector3(0, 0, 0);
    ball.f = new THREE.Vector3(0, 0, 0);
    ball.m = 1;
    ball.R = config.R;
}

function initBall() {
    ball = new THREE.Mesh(new THREE.SphereGeometry(config.R, 32, 32),
        new THREE.MeshLambertMaterial({
            color: 0x00cccc,
        })
    );
    ball.position.set(0, 10, 0);
    ball.castShadow = true;
    ball.receiveShadow = true;
    scene.add(ball);
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
    scene.add(plane);

    var obj = new THREE.Mesh(new THREE.BoxGeometry(8, 2, 8),
        new THREE.MeshLambertMaterial({
            color: 0xff0000,
        })
    );
    obj.position.setX(0);
    obj.position.setY(1);
    obj.castShadow = true;
    obj.receiveShadow = true;
    collisionObjs.push(obj);
    scene.add(obj);

    // var obj2 = new THREE.Mesh(new THREE.BoxGeometry(4, 2, 4),
    //     new THREE.MeshLambertMaterial({
    //         color: 0x0000ff,
    //     })
    // );
    // obj2.position.setX(2);
    // obj2.position.setY(1);
    // obj2.castShadow = true;
    // obj2.receiveShadow = true;
    // collisionObjs.push(obj2);
    // scene.add(obj2);
}