import db from './db'
import { rotateY, move } from './tools'

export default function createEvents() {
    // 摄像机旋转事件
    document.addEventListener('keydown', (e) => {
        switch(e.keyCode) {
            case 90: {
                let newVector = rotateY(db.cx, db.cy, db.cz);
                db.cx = newVector.x;
                db.cy = newVector.y;
                db.cz = newVector.z;
                camera.position.set(newVector.x, newVector.y, newVector.z);
                camera.lookAt(new THREE.Vector3(0, 0, 0)); 
                renderer.render(scene, camera);
                break;
            }
            case 88: {
                let newVector = rotateY(db.cx, db.cy, db.cz, true);
                db.cx = newVector.x;
                db.cy = newVector.y;
                db.cz = newVector.z;
                camera.position.set(newVector.x, newVector.y, newVector.z);
                camera.lookAt(new THREE.Vector3(0, 0, 0)); 
                renderer.render(scene, camera);
                break;
            }
            default:
                break;
        } 
    })

    // 平移事件
    document.addEventListener('keydown', function(ball, e) {
        switch(e.keyCode) {
            case 38: {
                let newVector = move(db.x, db.y, db.z, 'up');
                db.x = newVector.x;
                db.y = newVector.y;
                db.z = newVector.z;
                ball.position.set(newVector.x, newVector.y, newVector.z);
                renderer.render(scene, camera);
                break;
            }
            case 37: {
                let newVector = move(db.x, db.y, db.z, 'left');
                db.x = newVector.x;
                db.y = newVector.y;
                db.z = newVector.z;
                ball.position.set(newVector.x, newVector.y, newVector.z);
                renderer.render(scene, camera);
                break;
            }
            case 39: {
                let newVector = move(db.x, db.y, db.z, 'right');
                db.x = newVector.x;
                db.y = newVector.y;
                db.z = newVector.z;
                ball.position.set(newVector.x, newVector.y, newVector.z);
                renderer.render(scene, camera);
                break;
            }
            case 40: {
                let newVector = move(db.x, db.y, db.z, 'down');
                db.x = newVector.x;
                db.y = newVector.y;
                db.z = newVector.z;
                ball.position.set(newVector.x, newVector.y, newVector.z);
                renderer.render(scene, camera);
                break;
            }
            default:
                break;
        }
        
        console.log(e.keyCode)
    }.bind(this, ball))
}
