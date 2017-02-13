import { cloneV, addV, subtractV, dotV, logV } from './utils'
import config from './config';

export var collisionObjs = [];

export function collisionDetection(target) {
    let len = collisionObjs.length;
    for(let i = 0; i < len; i++) {
        let obj = collisionObjs[i];
        if(obj.geometry.type === 'BoxGeometry') {
            BoxAndBall(obj, target);
        }
    }
}

function BoxAndBall(box, ball) {
    let originV = subtractV(ball.newP, box.position);
    let v = new THREE.Vector3(Math.abs(originV.x), Math.abs(originV.y), Math.abs(originV.z));
    let transV = cloneV(v);
    transV.divide(originV);
    for(let i in transV) {
        if(isNaN(transV[i])) {
            transV[i] = 1;
        }
    }
    let h = box.geometry.vertices[0];
    let u = subtractV(v, h);

    // if(testReset(ball, box)) {
    //     return;
    // }

    let isCollided = false;
    let tempU = new THREE.Vector3(u.x, u.y, u.z);

    if(u.x >= 0 && u.y >= 0 && u.z >= 0) {
        isCollided = u.length() <= ball.R;
    } else {
        if(u.x < 0) tempU.x = 0;
        if(u.y < 0) tempU.y = 0;
        if(u.z < 0) tempU.z = 0;

        let ulen = tempU.length();

        isCollided = ulen == 0 || ulen <= ball.R;
    }

    if(isCollided) {
        handleCollision(ball, u, transV)
    }
}

// function testReset(ball, box) {
//     let h = box.geometry.vertices[0];
//     let currentV = subtractV(ball.position, box.position);
//     let v = new THREE.Vector3(Math.abs(currentV.x), Math.abs(currentV.y), Math.abs(currentV.z));
//     let currentU = subtractV(v, h);
//     let testCollided = false;
//     let ulen = 0;

//     if(currentU.x >= 0 && currentU.y >= 0 && currentU.z >= 0) {
//         testCollided = currentU.length() <= ball.R;
//     } else {
//         if(currentU.x < 0) currentU.x = 0;
//         if(currentU.y < 0) currentU.y = 0;
//         if(currentU.z < 0) currentU.z = 0;

//         ulen = currentU.length();

//         testCollided = ulen == 0 || ulen <= ball.R;
//     }

//     if(testCollided) {
//         // console.log(ulen);

//         ball.position.set(0, 10, 0);
//         ball.v = new THREE.Vector3(0, 0, 0);
//         if(config.isSingle) {
//             config.camera.position.set(4*config.focalDistance, 3*config.focalDistance, 5*config.focalDistance);
//         }
//     }

//     return testCollided;
// }

function handleCollision(ball, u, transV) {
    // 面碰撞
    if(u.z <= 0 && u.y <= 0 && u.x >= 0) {
        ball.v.x = 0;
        ball.f.x = 0;
        return;
    }
    if(u.x <= 0 && u.y <= 0 && u.z >= 0) {
        ball.v.z = 0;
        ball.f.z = 0;
        return;
    }
    if(u.z <= 0 && u.x <= 0 && u.y >= 0) {
        ball.isPlane = true;
        ball.v.y = 0;
        ball.f.y = 0;
        return;
    }
    // 点碰撞 
    // if(u.x >= 0 && u.y >= 0 && u.z >= 0 ) {
    //     divideFV(u, transV);
    //     return;
    // }
    // 对角线碰撞
    if(u.z <= 0 && u.x >= 0 && u.y >= 0) {
        u.z = 0;
        divideFV(ball, u, transV);
        return;
    }
    if(u.y <= 0 && u.x >= 0 && u.z >= 0) {
        u.y = 0;
        divideFV(ball, u, transV);
        return;
    }
    if(u.x <= 0 && u.y >= 0 && u.z >= 0) {
        u.x = 0;
        divideFV(ball, u, transV);
        return;
    }
}

function divideFV(ball, u, trans) {
    let unitU = cloneV(u).normalize();

    // 修复低速情况的bug
    let len = ball.v.length();
    let minV = 0.2;
    if(len < minV) {
        let addV = cloneV(ball.v).normalize().multiplyScalar(minV - len);
        ball.v.add(addV);
    }
    
    ball.f.multiply(trans);
    ball.v.multiply(trans);

    ball.f.sub(cloneV(ball.f).projectOnVector(unitU));
    ball.v.sub(cloneV(ball.v).projectOnVector(unitU));

    ball.f.divide(trans);
    ball.v.divide(trans);
}