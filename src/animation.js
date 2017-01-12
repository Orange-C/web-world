import {keyboard} from './keyboard';
import config from './config';

export default function animate() {
    // 摄像机旋转
    if(keyboard.z) {
        camera.rotateY(Math.PI/180);
    }
    if(keyboard.x) {
        camera.rotateY(Math.PI/180, true);        
    }
    
    if(ball.position.y <= config.R) {
        // 接触地面
        ball.position.setY(config.R);
        ball.v.setY(0);

        // 地面跳跃
        if(keyboard[' ']) {
            ball.f.y += 1/config.FJ;
        } else {
            // 摩擦力,仅平面存在
            let f = new THREE.Vector3(ball.v.x, ball.v.y, ball.v.z);
            f.negate().divideScalar(f.length() * config.FF);
            if(ball.v.length() <= f.length()) {
                ball.v.x = 0;
                ball.v.y = 0;
                ball.v.z = 0;
            } else {
                ball.v = ball.v.add(f);
            }
        }

        let deltaX = (ball.position.x - camera.position.x) / config.FA;
        let deltaZ = (ball.position.z - camera.position.z) / config.FA;

        if(ball.v.length() < 0.8) { // 最大速度
            // 改变小球速度
            if(keyboard.ArrowUp) {
                ball.f.x += deltaX;
                ball.f.z += deltaZ;
            }
            if(keyboard.ArrowDown) {
                ball.f.x -= deltaX;
                ball.f.z -= deltaZ;
            }
            if(keyboard.ArrowLeft) {
                ball.f.x += deltaZ;
                ball.f.z -= deltaX;
            }
            if(keyboard.ArrowRight) {
                ball.f.x -= deltaZ;
                ball.f.z += deltaX;
            }
        }

        // 支持力
        ball.f.y += 1/config.FG;
    }

    // 重力
    ball.f.y += -1/config.FG;
    
    let a = ball.f.divideScalar(ball.m);
    ball.v.add(a);
    ball.f = new THREE.Vector3(0, 0, 0); 

    // 小球运动
    ball.position.set(ball.position.x + ball.v.x, ball.position.y + ball.v.y, ball.position.z + ball.v.z);
    camera.position.set(camera.position.x + ball.v.x, camera.position.y + ball.v.y, camera.position.z + ball.v.z);

    camera.lookAt(ball.position);
    renderer.render(scene, camera);
    id = requestAnimationFrame(animate);
}
