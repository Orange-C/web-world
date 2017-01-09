export function addV(v1, v2) {
    return new THREE.Vector3(v1.x + v2.x, v1.y + v2.y, v1.z + v2.z);
}

export function subtractV(v1, v2) {
    return new THREE.Vector3(v1.x - v2.x, v1.y - v2.y, v1.z - v2.z);
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
    scene.add(xAxis);

    var yGeometry = new THREE.Geometry();
    yGeometry.vertices.push(
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(0, len, 0)
    );

    var yAxis = new THREE.Line( yGeometry, new THREE.LineBasicMaterial({
        color: 0x00ff00
    }) );
    scene.add(yAxis);

    var zGeometry = new THREE.Geometry();
    zGeometry.vertices.push(
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(0, 0, len)
    );

    var zAxis = new THREE.Line( zGeometry, new THREE.LineBasicMaterial({
        color: 0x0000ff
    }) );
    scene.add(zAxis);
}