import { addV, subtractV } from './tools'


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
    let v = subtractV(ball.position, box.position);
    v.x = Math.abs(v.x);
    v.y = Math.abs(v.y);
    v.z = Math.abs(v.z);
    let h = box.geometry.vertices[0];
    let u = subtractV(v, h);

    let isCollided = false

    if(u.x >= 0 && u.y >= 0 && u.z >= 0) {
        isCollided =  u.length() < ball.R;
    } else {
        let tempU = new THREE.Vector3(u.x, u.y, u.z);
        if(u.x < 0) tempU.x = 0;
        if(u.y < 0) tempU.y = 0;
        if(u.z < 0) tempU.z = 0;

        let ulen = tempU.length();
        
        isCollided = ulen == 0 || ulen < ball.R;
    }

    if(isCollided) {
        // if(u.z < 0 && u.y < 0) {
        //     ball.v.x = 0;
        //     ball.f.x = 0;
        // }
        // if(u.x < 0 && u.y < 0) {
        //     ball.v.z = 0;
        //     ball.f.z = 0;
        // }
        // if(u.z < 0 && u.x < 0) {
        //     ball.v.y = 0;
        //     ball.f.y = 0;
        // }
    }
}