import config from './config';
import { createNormalBlock, createDoor, createBowl, createStairs, createGoal, createWindow } from './obj';
import { collisionObjs } from './collision';
import { speedUp, speedDown, jumpHigh, calcOffset, initName } from './utils';

var objStyle = {
    div: 'stone',
    a: 'gold',
    ul: 'stone',
    li: 'stone',
    input: 'blue',
    img: 'red',
    form: 'stone'
};
var objPos = [
    { x: 40, z: 0},
    { x: 40, z: -40},
    { x: 0, z: -40},
    { x: -40, z: -40},
    { x: -40, z: 0},
    { x: -40, z: 40},
    { x: 0, z: 40},
    { x: 40, z: 40}
];
var pos = 0;
var goalArr = [];

export function initMap(dom) {
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

    if(dom) {
        initWeb(dom);
    } else {
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
    }
}


function initWeb(dom) {
    console.log(dom);
    // 出生台
    createBowl({
        bowlW: 15,
        sideW: 1,
        sideH: 2,
        pos: [0, 0, 0]
    })

    parseDom(dom, 0)

    //goal
    config.initGoal = function() {
        goalArr.forEach((cb) => {cb()});
    }
    config.initGoal();
}

function parseDom(arr, height) {
    arr.forEach((v) => {
        console.log(v.name);
        if(v.name === 'div') {
            var obj = createNormalBlock({
                type: pos%2 ? 'stone' : 'wall',
                len: [30 - height*1.5, 2, 30 - height*1.5],
                pos: [objPos[pos].x, height + 1, objPos[pos].z],
            });
            collisionObjs.push(obj);
            config.scene.add(obj);
        }

        if(v.name === 'form') {
            let xx = objPos[pos].x;
            let zz = objPos[pos].z;
            let hh = height + 9;
            
            createWindow({
                pos: [xx, hh, zz]
            });

            let cb = function () {
                createGoal({
                    pos: [xx, hh - 1.5, zz]
                })
            }

            goalArr.push(cb);
        }

        if(v.name === 'input') {
            let xx = objPos[pos].x;
            let zz = objPos[pos].z;
            let hh = height + 4;

            let cb = function () {
                createGoal({
                    pos: [xx, hh - 1.5, zz]
                })
            }

            goalArr.push(cb);
        }

        if(v.name === 'ul') {
            let conf = {
                stairW: 8,
                count: v.children.length || 1,
                pos: [objPos[pos].x, height + 0.5, objPos[pos].z]
            }
            if(pos === 7 || pos === 0) conf.zz = -1;
            if(pos === 1 || pos === 2) conf.xx = -1;
            if(pos === 3 || pos === 4) conf.zz = 1;
            if(pos === 5 || pos === 6) conf.xx = 1;
            
            createStairs(conf);
        }

        if(v.name === 'span') {
            var speed1 = createNormalBlock({
                type: 'blue',
                len: [8, 8, 1],
                pos: [objPos[pos].x, height + 12, objPos[pos].z],
                transparent: true,
                shadow: false,
            });
            speed1.name = initName();
            speed1.penetrable = true;
            speed1.callback = speedUp;
            collisionObjs.push(speed1);
            config.scene.add(speed1);
        }

        if(v.name === 'p') {
            var speed1 = createNormalBlock({
                type: 'red',
                len: [8, 8, 1],
                pos: [objPos[pos].x, height + 12, objPos[pos].z],
                transparent: true,
                shadow: false,
            });
            speed1.name = initName();
            speed1.penetrable = true;
            speed1.callback = speedDown;
            collisionObjs.push(speed1);
            config.scene.add(speed1);
        }

        if(v.name === 'a') {
             var jump1 = createNormalBlock({
                type: 'gold',
                len: [10, 1, 10],
                pos: [objPos[pos].x, height + 4, objPos[pos].z],
                transparent: true,
                shadow: false,
            });
            jump1.name = initName();
            jump1.penetrable = true;
            jump1.callback = jumpHigh;
            collisionObjs.push(jump1);
            config.scene.add(jump1);
        }

        pos++;
        if(pos === 8) {
            height = height + 5;
            pos = 0
        }

        if(v.children.length && v.name !== 'a' && v.name !== 'ul') {
            parseDom(v.children, height);
        }
    })
}