import {keyboard} from './keyboard';
import _ from 'lodash';

export default function animate() {
    // 摄像机旋转
    if(keyboard.z) {
        camera.rotateY(Math.PI/180);
    }
    if(keyboard.x) {
        camera.rotateY(Math.PI/180, true);        
    }

    let currentDir = new THREE.Vector3(camera.position.x, 0, camera.position.z);
    // 改变小球速度
    if(keyboard.ArrowUp) {
        let aUp = _.cloneDeep(currentDir);
        ball.v = ball.v.add(aUp.negate().divideScalar(currentDir.length() * 50));
        // console.log(ball.v.length());
    }
    if(keyboard.ArrowDown) {
        let aDown = _.cloneDeep(currentDir);
        ball.v = ball.v.add(aDown.divideScalar(currentDir.length() * 50));
        // console.log(ball.v.length());
    }
    // if(keyboard.ArrowLeft) {
    //     let currentDir = new THREE.Vector3(camera.position.x, 0, camera.position.z);
    //     ball.v = ball.v.add(currentDir.negate().divideScalar(currentDir.length() * 10));
    // }
    // if(keyboard.ArrowRight) {
    //     let currentDir = new THREE.Vector3(camera.position.x, 0, camera.position.z);
    //     ball.v = ball.v.add(currentDir.negate().divideScalar(currentDir.length() * 10));
    // }
    
    // 摩擦力
    let f = _.cloneDeep(ball.v);
    let af = f.negate().divideScalar(f.length() * 200);
    if(ball.v.length() <= f.length()) {
        ball.v = new THREE.Vector3(0, 0, 0);
    } else {
        ball.v = ball.v.add(f);
    }

    // 小球运动
    let currentP = new THREE.Vector3(ball.position.x, ball.position.y, ball.position.z);
    let dis = _.cloneDeep(ball.v);
    let newP = currentP.add(dis.divideScalar(ball.v.length() * 10));
    ball.position.set(newP.x, newP.y, newP.z);
    
    renderer.render(scene, camera);
    id = requestAnimationFrame(animate);
}
