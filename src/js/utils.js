import config from './config';

let nameCount = 0;

export function initName() {
    return ++nameCount + ''
}

export function cloneV(v) {
    return new THREE.Vector3(v.x, v.y, v.z);
}

export function addV(v1, v2) {
    return new THREE.Vector3(v1.x + v2.x, v1.y + v2.y, v1.z + v2.z);
}

export function subtractV(v1, v2) {
    return new THREE.Vector3(v1.x - v2.x, v1.y - v2.y, v1.z - v2.z);
}

export function dotV(v1, v2) {
    var numX = v1.x * v2.x;
    var numY = v1.y * v2.y;
    var numZ = v1.z * v2.z;
    return numX + numY + numZ;
}

export function logV(v) {
    return 'x: ' + v.x + ' y: ' + v.y + ' z:' + v.z;
}

export function removeObj(obj) {
    var selectedObj = config.scene.getObjectByName(obj.name);
    config.scene.remove(selectedObj);
}

export function speedUp(ball) {
    ball.v.multiplyScalar(2);
}

export function speedDown(ball) {
    ball.v.divideScalar(2);
}

export function jumpHigh(ball) {
    ball.v.y = 1.35/config.FJ;
}

export function calcOffset(len, pos) {
    let offsetX = (pos === 0 || pos === 2) ? -len/2 : len/2 ;
    let offsetZ = (pos === 1 || pos === 2) ? -len/2 : len/2 ;
    return {
        offsetX,
        offsetZ
    }
}

export function createAxis() {
    let len = 100;
    // 生成坐标系
    var xGeometry = new THREE.Geometry();
    xGeometry.vertices.push(
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(len, 0, 0)
    );

    var xAxis = new THREE.Line( xGeometry, new THREE.LineBasicMaterial({
        color: 0xff0000
    }) );
    config.scene.add(xAxis);

    var yGeometry = new THREE.Geometry();
    yGeometry.vertices.push(
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(0, len, 0)
    );

    var yAxis = new THREE.Line( yGeometry, new THREE.LineBasicMaterial({
        color: 0x00ff00
    }) );
    config.scene.add(yAxis);

    var zGeometry = new THREE.Geometry();
    zGeometry.vertices.push(
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(0, 0, len)
    );

    var zAxis = new THREE.Line( zGeometry, new THREE.LineBasicMaterial({
        color: 0x0000ff
    }) );
    config.scene.add(zAxis);
}