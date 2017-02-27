import config from './config';
import { createNormalBlock } from './obj';
import { collisionObjs } from './collision';
import { speedUp, speedDown, jumpHigh, calcOffset, initName } from './utils';

export function initMap(dom) {
    if(dom) {
        initBase(dom, 72, 12, 2);
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
        if(!(k >= 4 && height > 3)) {
            console.log(v.name);
            // base config
            let objColor = 0xf8f8f8; // default
            let objHeight = 4;
            let objOffset = calcOffset(len, k%4);
            let objTransparent, objShadow;
            let heightOffset = 0;
            let lenOffset = 0;
            
            // offset calc
            if(height < 3) {
                let planeOffset = -Math.floor(k/4) * 144;
                if(k%4 === 0) {
                    let plane = new THREE.Mesh(new THREE.PlaneGeometry(18*config.focalDistance, 18*config.focalDistance),
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

            let type = Date.now() % 2;

            if(v.name === 'a') {
                objColor = 0xFDBE41; // yellow
                objHeight = 1;
                objTransparent = true;
                objShadow = false;
                lenOffset = objLen + lenOffset < 4 ? 4 : 0;
                heightOffset = k%4 ? (k%4) * 5 + 3 : 3;
                // objColor = 0xFC5754; // red
            }

            if(v.name === 'input') {
                objColor = type ? 0x35CC4B : 0xFC5754; // green
                objHeight = 4;
                objTransparent = true;
                objShadow = false;
                lenOffset = objLen + lenOffset < 4 ? 3 : 0;
                heightOffset = 1.2;
            }

            if(v.name === 'ul'|| v.name === 'select') {
                lenOffset = -8;
                objHeight = 4;
            }

            if(v.name === 'li'|| v.name === 'option') {
                lenOffset = 4.1;
                objHeight = 1;
                heightOffset = -1;
            }

            if(v.name === 'option'|| v.name === 'select') {
                objShadow = false;
            }

            if(v.name === 'span') {
                objTransparent = true;
                objShadow = false;
            }

            if(v.name === 'img') {
                objHeight = 1;
                lenOffset = 4;
            }

            // init obj
            let obj = createNormalBlock({
                len: [objLen + lenOffset, objHeight, objLen + lenOffset],
                pos: [objOffset.offsetX, height + heightOffset, objOffset.offsetZ],
                color: objColor,
                transparent: objTransparent,
                shadow: objShadow,
            });
            obj.name = initName();
            
            if(v.name === 'a') {
                obj.penetrable = true;
                obj.callback = jumpHigh;
            }

            if(v.name === 'input') {
                obj.penetrable = true;
                obj.callback = type ? speedUp : speedDown;
            }
            
            if(!(v.name === 'option'|| v.name === 'select')) {
                collisionObjs.push(obj);
            }

            config.scene.add(obj);
            if(v.children.length && v.name !== 'a') {
                let newDis = dis/2 > 4 ? dis/2 : 4;
                initBase(v.children, objLen/2, newDis, height + 4, objOffset);
            }
        }
    })
}