import config from './config';
import { createNormalBlock, createDoor, createBowl, createStairs, createGoal } from './obj';
import { collisionObjs } from './collision';
import { speedUp, speedDown, jumpHigh, calcOffset, initName } from './utils';

export function initMap(dom) {
    if(dom) {
        initBase(dom, 72, 12, 2);
    } else {
        var plane = new THREE.Mesh(new THREE.PlaneGeometry(16*config.focalDistance, 16*config.focalDistance),
            new THREE.MeshLambertMaterial({
                map: config.texture.ground,
                // color: 0xcccccc
            })
        );
        plane.rotateX(-Math.PI/2);
        plane.receiveShadow = true;
        config.plane.push(plane);
        config.scene.add(plane);

        var obj = createNormalBlock({
            type: 'moss',
            len: [5, 5, 5],
            pos: [0, 2.5, 0],
            color: 0xf8f8f8
        });
        collisionObjs.push(obj);
        config.scene.add(obj);

        createDoor({
            pos: [10, 0, 10]
        });

        createBowl({
            pos: [-20, 0, -20]
        })

        createStairs({
            pos: [-20, 0, 20]
        })

        createGoal({
            pos: [20, 1.5, -20]
        })

        // var obj2 = createNormalBlock({
        //     len: [8, 2, 8],
        //     pos: [-8, 3, 0],
        //     color: 0xf8f8f8
        // });
        // collisionObjs.push(obj2);
        // config.scene.add(obj2);

        // var obj3 = createNormalBlock({
        //     len: [8, 2, 8],
        //     pos: [-14, 5, 0],
        //     color: 0xf8f8f8
        // });
        // collisionObjs.push(obj3);
        // config.scene.add(obj3);

        // var wall1 = createNormalBlock({
        //     len: [30, 16, 2],
        //     pos: [-10, 8, 4.8],
        //     color: 0xffffff,
        //     transparent: true,
        //     shadow: false,
        // });
        // collisionObjs.push(wall1);
        // config.scene.add(wall1);

        // var wall2 = createNormalBlock({
        //     len: [30, 16, 2],
        //     pos: [-10, 8, -4.8],
        //     color: 0xffffff,
        //     transparent: true,
        //     shadow: false,
        // });
        // collisionObjs.push(wall2);
        // config.scene.add(wall2);
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
            let objType = 'stone';
            
            // offset calc
            if(height < 3) {
                let planeOffset = -Math.floor(k/4) * 144;
                if(k%4 === 0) {
                    let plane = new THREE.Mesh(new THREE.PlaneGeometry(18*config.focalDistance, 18*config.focalDistance),
                        new THREE.MeshLambertMaterial({
                            map: config.texture.ground,
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
                objType = 'gold';
                objHeight = 1;
                objTransparent = true;
                objShadow = false;
                lenOffset = objLen + lenOffset < 4 ? 4 : 0;
                heightOffset = k%4 ? (k%4) * 5 + 3 : 3;
                // objColor = 0xFC5754; // red
            }

            if(v.name === 'input') {
                objType = type ? 'blue' : 'red';
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
                type: objType,
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

function initWeb(dom) {
    
}