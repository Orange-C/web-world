import config from './config';
import { createNormalBlock, createDoor, createBowl, createStairs, createGoal, createWindow } from './obj';
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

        // 出生台
        createBowl({
            bowlW: 15,
            sideW: 1,
            sideH: 2,
            pos: [0, 0, 0]
        })
        createStairs({
            xx: -1,
            stairW: 6,
            count: 3,
            pos: [16.5, 0, 0]
        })
        createDoor({
            xx: 1,
            pos: [20.5, 0, 0]
        });

        //跳窗
        var stone = createNormalBlock({
            type: 'moss',
            len: [10, 4, 10],
            pos: [45, 2, -20],
        });
        collisionObjs.push(stone);
        config.scene.add(stone);
        createWindow({
            pos: [45, 11, -30]
        });

        // jump plat1
        var jump1 = createNormalBlock({
            type: 'gold',
            len: [10, 1, 10],
            pos: [18, 4, -45],
            transparent: true,
            shadow: false,
        });
        jump1.name = initName();
        jump1.penetrable = true;
        jump1.callback = jumpHigh;
        collisionObjs.push(jump1);
        config.scene.add(jump1);
        var jumpPlat1 = createNormalBlock({
            type: 'stone',
            len: [20, 2, 20],
            pos: [0, 7, -45],
        });
        collisionObjs.push(jumpPlat1);
        config.scene.add(jumpPlat1);
        createStairs({
            xx: -1,
            stairW: 8,
            count: 5,
            pos: [-14, 7, -45]
        })
        var jumpPlat2 = createNormalBlock({
            type: 'stone',
            len: [20, 2, 20],
            pos: [-42, 11, -45],
        });
        collisionObjs.push(jumpPlat2);
        config.scene.add(jumpPlat2);


        var wall1 = createNormalBlock({
            type: 'wall',
            len: [20, 22, 3],
            pos: [-42, 11, -10],
        });
        collisionObjs.push(wall1);
        config.scene.add(wall1);

        // speed control
        var jumpPlat3 = createNormalBlock({
            type: 'stone',
            len: [20, 2, 20],
            pos: [-42, 11, 20],
        });
        collisionObjs.push(jumpPlat3);
        config.scene.add(jumpPlat3);
        var speed1 = createNormalBlock({
            type: 'blue',
            len: [8, 8, 1],
            pos: [-42, 16, -38],
            transparent: true,
            shadow: false,
        });
        speed1.name = initName();
        speed1.penetrable = true;
        speed1.callback = speedUp;
        collisionObjs.push(speed1);
        config.scene.add(speed1);
        var speed2 = createNormalBlock({
            type: 'red',
            len: [8, 8, 1],
            pos: [-42, 16, 20],
            transparent: true,
            shadow: false,
        });
        speed2.name = initName();
        speed2.penetrable = true;
        speed2.callback = speedDown;
        collisionObjs.push(speed2);
        config.scene.add(speed2);

        //transparent goal
        createStairs({
            zz: 1,
            stairW: 10,
            count: 5,
            pos: [-42, 11, 35]
        })
        createStairs({
            xx: 1,
            stairW: 10,
            count: 5,
            pos: [-32, 16, 55]
        })
        var wallT1 = createNormalBlock({
            type: 'stone',
            len: [1, 20, 8],
            pos: [-3, 12.5, 55],
            transparent: true,
            shadow: false,
            opacity: 0.2,
        });
        collisionObjs.push(wallT1);
        config.scene.add(wallT1);
        var wallT2 = createNormalBlock({
            type: 'stone',
            len: [1, 20, 8],
            pos: [3, 12.5, 55],
            transparent: true,
            shadow: false,
            opacity: 0.2,
        });
        collisionObjs.push(wallT2);
        config.scene.add(wallT2);
        var wallT3 = createNormalBlock({
            type: 'stone',
            len: [5, 20, 1],
            pos: [0, 12.5, 51.5],
            transparent: true,
            shadow: false,
            opacity: 0.2,
        });
        collisionObjs.push(wallT3);
        config.scene.add(wallT3);
        var wallT4 = createNormalBlock({
            type: 'stone',
            len: [5, 20, 1],
            pos: [0, 12.5, 58.5],
            transparent: true,
            shadow: false,
            opacity: 0.2,
        });
        collisionObjs.push(wallT4);
        config.scene.add(wallT4);

        // fake wall
        var wallF1 = createNormalBlock({
            type: 'wall',
            len: [12, 3, 2],
            pos: [50, 1.5, 40],
        });
        config.scene.add(wallF1);
        var wallF2 = createNormalBlock({
            type: 'wall',
            len: [12, 3, 2],
            pos: [50, 1.5, 54],
        });
        collisionObjs.push(wallF2);
        config.scene.add(wallF2);
        var wallF3 = createNormalBlock({
            type: 'wall',
            len: [2, 3, 16],
            pos: [57, 1.5, 47],
        });
        collisionObjs.push(wallF3);
        config.scene.add(wallF3);
        var wallF4 = createNormalBlock({
            type: 'wall',
            len: [2, 3, 16],
            pos: [43, 1.5, 47],
        });
        collisionObjs.push(wallF4);
        config.scene.add(wallF4);
        var wallF5 = createNormalBlock({
            type: 'wall',
            len: [16, 1, 16],
            pos: [50, 3.5, 47],
        });
        collisionObjs.push(wallF5);
        config.scene.add(wallF5);

        //goal
        config.initGoal = function() {
            createGoal({
                pos: [45, 0, 0]
            })
            createGoal({
                pos: [45, 9.5, -30]
            })
            createGoal({
                pos: [70, 0, 70]
            })
            createGoal({
                pos: [-42, 14, -50]
            })
            createGoal({
                pos: [0, 12.5, 55]
            })
            createGoal({
                pos: [50, 0, 47]
            })
        }
        config.initGoal();

        // createWindow({
        //     pos: [20, 20, 20]
        // });

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