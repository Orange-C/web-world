import {keyboard} from './keyboard';
import _ from 'lodash';
import config from './config';

export default function animate() {
    // 摄像机旋转
    if(keyboard.z) {
        camera.rotateY(Math.PI/180);
    }
    if(keyboard.x) {
        camera.rotateY(Math.PI/180, true);        
    }

    let currentDir = new THREE.Vector3(camera.position.x, 0, camera.position.z);
    let currentDirS = new THREE.Vector3(-camera.position.z, 0, camera.position.x);
    
    if(ball.position.y <= config.R) {
        // 接触地面
        ball.position.setY(config.R);
        ball.v.setY(0);

        // 地面跳跃
        if(keyboard[' ']) {
            let vh = new THREE.Vector3(0, 1, 0);
            let ah = vh.divideScalar(vh.length() * config.VH);
            ball.v = ball.v.add(ah);
        } else {
            // 摩擦力,仅地面存在
            let f = new THREE.Vector3(ball.v.x, 0, ball.v.z);
            let af = f.negate().divideScalar(f.length() * config.VF);
            if(ball.v.length() <= f.length()) {
                ball.v = new THREE.Vector3(0, 0, 0);
            } else {
                ball.v = ball.v.add(f);
            }
        }

        // 改变小球速度
        if(keyboard.ArrowUp) {
            let aUp = _.cloneDeep(currentDir);
            ball.v = ball.v.add(aUp.negate().divideScalar(currentDir.length() * config.VA));
            // console.log(ball.v.length());
        }
        if(keyboard.ArrowDown) {
            let aDown = _.cloneDeep(currentDir);
            ball.v = ball.v.add(aDown.divideScalar(currentDir.length() * config.VA));
            // console.log(ball.v.length());
        }
        if(keyboard.ArrowLeft) {
            let aLeft = _.cloneDeep(currentDirS);
            ball.v = ball.v.add(aLeft.divideScalar(currentDir.length() * config.VA));
        }
        if(keyboard.ArrowRight) {
            let aRight = _.cloneDeep(currentDirS);
            ball.v = ball.v.add(aRight.negate().divideScalar(currentDir.length() * config.VA));
        }
    } else {
        // 重力
        let vg = new THREE.Vector3(0, -1, 0);        
        let ag = vg.divideScalar(vg.length() * config.VG);
        ball.v = ball.v.add(ag);
    }

    // 小球运动
    ball.position.set(ball.position.x + ball.v.x, ball.position.y + ball.v.y, ball.position.z + ball.v.z);
    
    renderer.render(scene, camera);
    id = requestAnimationFrame(animate);
}
