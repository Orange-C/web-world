import { cloneV, addV, subtractV, dotV, logV } from './tools'

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

    let isCollided = false;
    let tempU = new THREE.Vector3(u.x, u.y, u.z);

    if(u.x >= 0 && u.y >= 0 && u.z >= 0) {
        isCollided = u.length() <= ball.R;
    } else {
        if(u.x < 0) tempU.x = 0;
        if(u.y < 0) tempU.y = 0;
        if(u.z < 0) tempU.z = 0;

        let ulen = tempU.length();

        // if(ulen <= ball.R) console.log(ulen);
        
        isCollided = ulen == 0 || ulen <= ball.R;
    }

    if(isCollided) {
        // 面碰撞
        if(u.z <= 0 && u.y <= 0 && u.x >= 0) {
            ball.v.x = 0;
            ball.f.x = 0;
        }
        if(u.x <= 0 && u.y <= 0 && u.z >= 0) {
            ball.v.z = 0;
            ball.f.z = 0;
        }
        if(u.z < 0 && u.x < 0 && u.y > 0) {
            ball.isPlane = true;
            ball.v.y = 0;
            ball.f.y = 0;
        }
        // 点碰撞 
        if(u.x > 0 && u.y >0 && u.z >0 ) {
            divideFV(u, transV);
        }
        // 对角线碰撞
        if(u.z < 0 && u.x > 0 && u.y > 0) {
            u.z = 0;
            divideFV(u, transV);
        }
        if(u.y < 0 && u.x > 0 && u.z > 0) {
            u.y = 0;
            divideFV(u, transV);
        }
        if(u.x < 0 && u.y > 0 && u.z > 0) {
            u.x = 0;
            divideFV(u, transV);
        }
    }
}

function divideFV(u, trans) {
    let unitU = cloneV(u).normalize();

    // if(ball.f.length() || ball.v.length()) {
    //     console.log('f: ' + logV(ball.f));
    //     console.log('v: ' + logV(ball.v));
    // }

    ball.f.multiply(trans);
    ball.v.multiply(trans);

    let tV = cloneV(ball.v).projectOnVector(unitU);
    let tF = cloneV(ball.f).projectOnVector(unitU);

    ball.f.sub(tF);
    ball.v.sub(tV);

    ball.f.divide(trans);
    ball.v.divide(trans);

    if(ball.f.length() || ball.v.length()) {
        console.log('after');
        console.log('f: ' + logV(ball.f));
        console.log('v: ' + logV(ball.v));
    }
}