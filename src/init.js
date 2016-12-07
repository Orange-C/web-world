import {createEvents} from './keyboard'

export default function init() {
    // 初始化Renderer
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(600, 450);
    document.getElementsByTagName('body')[0].appendChild(renderer.domElement);
    renderer.setClearColor(0xffffff);

    // 初始化scene
    scene = new THREE.Scene();

    // 初始化camera
    camera = new THREE.PerspectiveCamera(45, 4/3, 1, 1000);
    camera.position.set(12, 9, 15);
    camera.lookAt(new THREE.Vector3(0, 0, 0));
    scene.add(camera);

    createAxis();

    addFunc();
    initPlane();
    initBall();
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
}

function initBall() {
    ball = new THREE.Mesh(new THREE.SphereGeometry(0.5, 16, 16),
        new THREE.MeshBasicMaterial({
            color: 0x00cccc,
            wireframe: true
        })
    );
    ball.position.set(0, 0.5, 0);
    scene.add(ball);
}

function initPlane() {
    var plane = new THREE.Mesh(new THREE.PlaneGeometry(16, 16, 16, 16),
        new THREE.MeshBasicMaterial({
            color: 0x000000,
            wireframe: true
        })
    );
    plane.rotateX(Math.PI/2);
    scene.add(plane);
}

function createAxis() {
    // 生成坐标系
    var xGeometry = new THREE.Geometry();
    xGeometry.vertices.push(
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(10, 0, 0)
    );

    var xAxis = new THREE.Line( xGeometry, new THREE.LineBasicMaterial({
        color: 0xff0000
    }) );
    scene.add(xAxis);

    var yGeometry = new THREE.Geometry();
    yGeometry.vertices.push(
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(0, 10, 0)
    );

    var yAxis = new THREE.Line( yGeometry, new THREE.LineBasicMaterial({
        color: 0x00ff00
    }) );
    scene.add(yAxis);

    var zGeometry = new THREE.Geometry();
    zGeometry.vertices.push(
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(0, 0, 10)
    );

    var zAxis = new THREE.Line( zGeometry, new THREE.LineBasicMaterial({
        color: 0x0000ff
    }) );
    scene.add(zAxis);
}