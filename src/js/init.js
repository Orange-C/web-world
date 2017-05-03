import { createEvents } from './keyboard';
import config from './config';
import { createAxis, addV, subtractV } from './utils'
import animate from './animation';
import { initMap } from './initMap';

let canvasBox = document.querySelector('.canvas-box');
let timeDom = document.querySelector('.time');
let timeBox = document.querySelector('.time-box');
let backBtn = document.querySelector('.back-btn');
let resetBtn = document.querySelector('.reset-btn');
let successMask = document.querySelector('.success-mask');
let failMask = document.querySelector('.fail-mask');

let WIDTH = 1000;
let HEIGHT = 600;

export default function init(initType, dom) {
    if(config.id) {
        cancelAnimationFrame(config.id);
    }
    initConfig(initType);
    // 初始化config.renderer
    config.renderer = new THREE.WebGLRenderer({
        antialias:true,
        precision:"highp",
        preserveDrawingBuffer:true
    });
    config.renderer.setSize(WIDTH, HEIGHT);
    canvasBox.innerHTML = '';
    canvasBox.appendChild(config.renderer.domElement);
    config.renderer.setClearColor(0x000000);

    // 初始化config.scene
    config.scene = new THREE.Scene();
    initCamera();

    // createAxis();

    initLight();
    initMap(dom);
    initBall();
    addFunc();    
    createEvents();

    // 计时
    timeDom.textContent = 240;
    timeBox.style.display = 'block';
    config.timeID = setInterval(() => {
        let num = +timeDom.textContent;
        num--;
        if(num == -1) {
            failMask.style.display = 'block';
            backBtn.className = 'back-btn back-btn-mask';
            resetBtn.className = 'reset-btn reset-btn-mask';
            config.isP = true;
        } else {
            timeDom.textContent = num;
        }
    }, 1000)

    config.renderer.render(config.scene, config.camera);

    config.id = requestAnimationFrame(animate);
}

function initConfig(initType) {
    config.renderer = null;
    config.scene = null;
    config.camera = null;
    config.light = null;
    config.ball = [];
    config.plane = [];
    config.id = null; // animation id
    config.goalTotal = 0;
    config.goalGet = 0;
    if(initType === 'double') {
        config.isSingle = false;
        config.FA = 6000 * 3;
    } else {
        config.isSingle = true;
        config.FA = 6000;
    }
}

function initCamera() {
    // 初始化config.camera
    config.camera = new THREE.PerspectiveCamera(45, WIDTH/HEIGHT, 1, 100*config.focalDistance);
    if(config.isSingle) {
        config.camera.position.set(4*config.focalDistance, 3*config.focalDistance, 5*config.focalDistance);
    } else {
        config.camera.position.set(4*config.focalDistance, 9*config.focalDistance, 17*config.focalDistance);
    }

    config.camera.lookAt(new THREE.Vector3(0, 0, 0));
    config.scene.add(config.camera);
}

function initLight() {
    var ambientLight = new THREE.AmbientLight(0xaaaaaa, 0.5);
    config.scene.add(ambientLight);

    config.renderer.shadowMap.enabled = true;
    config.renderer.shadowMapSoft = true;
    
    // var light = new THREE.PointLight(0xffffff, 1, 0, 2);
    // light.position.set(-4*config.focalDistance, 5*config.focalDistance, 5*config.focalDistance);
    // light.castShadow = true;

    var light = new THREE.DirectionalLight( 0xFFFFFF, 1 );
    light.position.set(-8*config.focalDistance, 10*config.focalDistance, 6*config.focalDistance);
    light.castShadow = true;

    light.shadow.camera.near = 1;
    light.shadow.camera.far = 5000;
    light.shadow.camera.left = -24*config.focalDistance;
    light.shadow.camera.right = 24*config.focalDistance;
    light.shadow.camera.bottom = -24*config.focalDistance;
    light.shadow.camera.top = 24*config.focalDistance;

    light.shadow.mapSize.width = 3000;
    light.shadow.mapSize.height = 3000;
    config.light = light;
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

        let r;
        if(config.isSingle) {
            r = subtractV(config.ball[0].position, this.position);
        } else {
            r = subtractV(new THREE.Vector3(0,0,0), this.position);
        }

        r.negate();
        let newR = new THREE.Vector3(r.x * Math.cos(delta) - r.z * Math.sin(delta), r.y, r.z * Math.cos(delta) + r.x * Math.sin(delta)) 
        let newP = addV(this.position, subtractV(newR, r));
        this.position.set(newP.x, newP.y, newP.z);
    }
}

function initBall() {
    let ball = new THREE.Mesh(new THREE.SphereGeometry(config.R, 32, 32),
        new THREE.MeshPhongMaterial({
            color: 0xCD3C3D,
        })
    );
    ball.castShadow = true;
    ball.receiveShadow = true;

    ball.newP = new THREE.Vector3(0, 0, 0);
    ball.v = new THREE.Vector3(0, 0, 0);
    ball.f = new THREE.Vector3(0, 0, 0);
    ball.m = 1;
    ball.R = config.R;
    ball.decrease = true;

    config.ball.push(ball);

    if(config.isSingle) {
        ball.initPos = [0, 18, 0];
        ball.position.set(...ball.initPos);
        ball.keyConf = [32, 87, 83, 65, 68];
    } else {
        let ball2 = new THREE.Mesh(new THREE.SphereGeometry(config.R, 32, 32),
            new THREE.MeshLambertMaterial({
                color: 0x00cccc,
            })
        );
        ball2.castShadow = true;
        ball2.receiveShadow = true;
        ball.keyConf = [67, 87, 83, 65, 68];
        ball2.keyConf = [78, 73, 75, 74, 76];

        ball2.newP = new THREE.Vector3(0, 0, 0);
        ball2.v = new THREE.Vector3(0, 0, 0);
        ball2.f = new THREE.Vector3(0, 0, 0);
        ball2.m = 1;
        ball2.R = config.R;
        ball2.decrease = true;

        ball.initPos = [0, 18, 20];
        ball2.initPos = [20, 18, 0];
        ball.position.set(...ball.initPos);
        ball2.position.set(...ball2.initPos);

        config.ball.push(ball2);
        config.scene.add(ball2);
    }

    config.scene.add(ball);
}