import { cloneV, addV, subtractV, dotV, logV, removeObj, decreaseV } from './utils'
import config from './config';

export var collisionObjs = [];

var refreshObjs = {};

export function collisionDetection(target) {
    let len = config.plane.length;
    
    for(let i = 0; i < len; i++) {
        PlaneAndBall(config.plane[i], target);
    }

    collisionObjs.forEach((obj, i) => {
        if(obj.geometry.type === 'BoxGeometry') {
            BoxAndBall(obj, target, i);
        }
    })

    let oldF = new THREE.Vector3(target.f.x, target.f.y, target.f.z);
    let a = oldF.divideScalar(target.m);
    let newV = addV(target.v, a);

    target.newP.x = target.position.x + newV.x;
    target.newP.y = target.position.y + newV.y;
    target.newP.z = target.position.z + newV.z;
}

export function BallCollision(first, second) {
    let X = (first.newP.x -  second.newP.x)*(first.newP.x -  second.newP.x);
    let Y = (first.newP.y -  second.newP.y)*(first.newP.y -  second.newP.y);
    let Z = (first.newP.z -  second.newP.z)*(first.newP.z -  second.newP.z);

    if((X + Y + Z) <= ((first.R + second.R) * (first.R + second.R))) {
        first.f = new THREE.Vector3(0,0,0);
        second.f = new THREE.Vector3(0,0,0);
        let tempV = cloneV(first.v);
        first.v = second.v;
        second.v = tempV;

        calcNewP(first);
        calcNewP(second);
    }
}

function calcNewP(ball) {
    ball.newP.x = ball.position.x + ball.v.x;
    ball.newP.y = ball.position.y + ball.v.y;
    ball.newP.z = ball.position.z + ball.v.z;
}

function PlaneAndBall(plane, ball) {
    let deltaX = 0 - plane.position.x;
    let deltaZ = 0 - plane.position.z;

    let ballX = ball.newP.x + deltaX;
    let ballZ = ball.newP.z + deltaZ;

    let planeX = Math.abs(plane.geometry.vertices[0].x);
    let planeZ = Math.abs(plane.geometry.vertices[0].y);

    let isOut = (Math.abs(ballX) >= planeX) || (Math.abs(ballZ) >= planeZ)
    if(ball.newP.y <= ball.R && ball.newP.y >= 0 && !isOut) {
        ball.f.y = 0;
        if(ball.decrease && ball.v.y) {
            ball.v.y = decreaseV(ball.v.y)
        } else {
            ball.v.y = 0;
        }
    }
}

function BoxAndBall(box, ball, key) {
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

    // 穿透后消失的物体判定
    if(box.penetrable) {
        if(u.x < 0 && u.y < 0 && u.z < 0) {
            removeObj(box);
            collisionObjs.splice(key, 1);
            box.callback(ball);
            if(box.refresh !== -1) {
                refreshObjs[box.name] = box;
                setTimeout(function(name) {
                    collisionObjs.push(refreshObjs[name]);
                    config.scene.add(refreshObjs[name]);
                    refreshObjs[name] = null;
                }.bind(this, box.name), box.refresh ? box.refresh : 5000);
            }
        }
    } else {
        let isCollided = false;
        let tempU = new THREE.Vector3(u.x, u.y, u.z);

        if(u.x >= 0 && u.y >= 0 && u.z >= 0) {
            isCollided = u.length() <= ball.R;
        } else {
            if(u.x < 0) tempU.x = 0;
            if(u.y < 0) tempU.y = 0;
            if(u.z < 0) tempU.z = 0;

            let ulen = tempU.length();

            isCollided = ulen === 0 || ulen <= ball.R;
        }

        if(isCollided) {
            handleCollision(ball, u, transV)
        }
    }
}

function handleCollision(ball, u, transV) {
    // 面碰撞
    if(u.z <= 0 && u.y <= 0 && u.x >= 0) {
        if(ball.decrease && ball.v.x) {
            ball.v.x = decreaseV(ball.v.x)
        } else {
            ball.v.x = 0;
        }
        ball.f.x = 0;
        return;
    }
    if(u.x <= 0 && u.y <= 0 && u.z >= 0) {
        if(ball.decrease && ball.v.z) {
            ball.v.z = decreaseV(ball.v.z)
        } else {
            ball.v.z = 0;
        }
        ball.f.z = 0;
        return;
    }
    if(u.z <= 0 && u.x <= 0 && u.y >= 0) {
        if(ball.decrease && ball.v.y) {
            ball.v.y = decreaseV(ball.v.y)
        } else {
            ball.v.y = 0;
        }
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

    ball.f.multiply(trans);
    ball.v.multiply(trans);
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