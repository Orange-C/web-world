import { cloneV, addV, subtractV, dotV, logV } from './tools'
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

    // 修复低速情况下的bug
    if(config.ball.v.length() < 0.2) {
        let addV = cloneV(config.ball.v).normalize().multiplyScalar(0.05);
        config.ball.v.add(addV);
    }
    
    config.ball.f.multiply(trans);
    config.ball.v.multiply(trans);

    let tV = cloneV(config.ball.v).projectOnVector(unitU);
    let tF = cloneV(config.ball.f).projectOnVector(unitU);

    config.ball.f.sub(tF);
    config.ball.v.sub(tV);

    config.ball.f.divide(trans);
    config.ball.v.divide(trans);
}