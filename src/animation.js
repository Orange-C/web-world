import {keyboard} from './keyboard'

export default function animate() {
    // 摄像机旋转
    if(keyboard.z) {
        camera.rotateY(Math.PI/180);
    }
    if(keyboard.x) {
        camera.rotateY(Math.PI/180, true);        
    }
    
    renderer.render(scene, camera);
    id = requestAnimationFrame(animate);
}
