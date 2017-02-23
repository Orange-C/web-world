import config from './config';
import { createNormalBlock } from './obj';
import { collisionObjs } from './collision';
import { speedUp, speedDown, jumpHigh, calcOffset, initName } from './utils';

export function initMap(dom) {
    if(dom) {
        var plane = new THREE.Mesh(new THREE.PlaneGeometry(16*config.focalDistance, 16*config.focalDistance),
            new THREE.MeshLambertMaterial({
                color: 0xe8e8e8,
            })
        );
        plane.rotateX(-Math.PI/2);
        plane.receiveShadow = true;
        config.plane.push(plane);
        config.scene.add(plane);

        initBase(dom, 72, 8, 2);
    } else {
        var plane = new THREE.Mesh(new THREE.PlaneGeometry(16*config.focalDistance, 16*config.focalDistance),
            new THREE.MeshLambertMaterial({
                color: 0xe8e8e8,
            })
        );
        plane.rotateX(-Math.PI/2);
        plane.receiveShadow = true;
        config.plane.push(plane);
        config.scene.add(plane);
    }
}

function initBase(arr, len, dis, height, offset) {
    let objLen = len - dis;
    arr.forEach((v, k) => {
        console.log(v.name);
        if(!(k >= 4 && height > 3)) {
            // base config
            let objColor = 0xf8f8f8; // default
            let objOffset = calcOffset(len, k%4);
            if(v.name === 'a') {
                objColor = 0xFDBE41; // yellow
                // objColor = 0xFC5754; // red
                // objColor = 0x35CC4B; // green
            }
            
            // offset calc
            if(height < 3) {
                let planeOffset = -Math.floor(k/4) * 144;
                if(k%4 === 0) {
                    let plane = new THREE.Mesh(new THREE.PlaneGeometry(16*config.focalDistance, 16*config.focalDistance),
                        new THREE.MeshLambertMaterial({
                            color: 0xe8e8e8,
                        })
                    );
                    plane.rotateX(-Math.PI/2);
                    plane.position.setZ(planeOffset);
                    plane.receiveShadow = true;
                    config.plane.push(plane);
                    config.scene.add(plane);
                }
                objOffset.offsetZ += planeOffset;
            }
            if(offset) {
                objOffset.offsetX += offset.offsetX;
                objOffset.offsetZ += offset.offsetZ;
            }

            // init obj
            let obj = createNormalBlock({
                len: [objLen, 4, objLen],
                pos: [objOffset.offsetX, height, objOffset.offsetZ],
                color: objColor,
                // transparent: true,
                // shadow: false,
            });
            obj.name = initName();
            // obj.penetrable = true;
            // obj.callback = jumpHigh;
            collisionObjs.push(obj);
            config.scene.add(obj);
            if(v.children.length) {
                let newDis = dis/2 > 4 ? dis/2 : 4;
                initBase(v.children, objLen/2, newDis, height + 4, objOffset);
            }
        }
    })
}