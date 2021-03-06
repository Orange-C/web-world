import config from './config';
import { collisionObjs } from './collision';
import { initName } from './utils';

let backBtn = document.querySelector('.back-btn');
let resetBtn = document.querySelector('.reset-btn');
let successMask = document.querySelector('.success-mask');
let goalGetBox = document.querySelector('.goal-get');
let goalTotalBox = document.querySelector('.goal-total');

/**
 * conf {
 *  len: [x,y,z]
 *  pos: [x,y,z]
 *  color: 0xffffff;
 *  shadow: boolean,
 *  transparent: boolean,
 *  opacity: number,
 * }
 */


export function createNormalBlock(conf) {
    var obj = new THREE.Mesh(new THREE.BoxGeometry(...conf.len),
        new THREE.MeshLambertMaterial({
            map: config.texture[conf.type],
            transparent: conf.transparent || false,
            opacity: conf.opacity || 0.45,
        })
    );
    obj.position.set(...conf.pos);
    if(conf.shadow !== false) {
        obj.castShadow = true;
        obj.receiveShadow = true;
    }
    return obj;
}

export function createDoor(conf) {
    let objs = [];
    let xx = conf.pos[0];
    let yy = conf.pos[1];
    let zz = conf.pos[2];

    let doorH = conf.doorH || 10;
    let doorW = conf.doorW || 10;
    let doorT = conf.doorT || 2;
    
    objs[0] = new THREE.Mesh(new THREE.BoxGeometry(doorT, doorH, doorT),
        new THREE.MeshLambertMaterial({
            map: config.texture.wood,
        })
    );
    if(conf.zz) {
        objs[0].position.set(xx + (doorW/2 - doorT/2), yy + doorH/2, zz);
    } else {
        objs[0].position.set(xx, yy + doorH/2, zz  + (doorW/2 - doorT/2));
    }
    

    objs[1] = new THREE.Mesh(new THREE.BoxGeometry(doorT, doorH, doorT),
        new THREE.MeshLambertMaterial({
            map: config.texture.wood,
        })
    );
    if(conf.zz) {
        objs[1].position.set(xx - (doorW/2 - doorT/2), yy + doorH/2, zz);
    } else {
        objs[1].position.set(xx, yy + doorH/2, zz  - (doorW/2 - doorT/2));
    }

    if(conf.zz) {
        objs[2] = new THREE.Mesh(new THREE.BoxGeometry(doorW, doorT, doorT),
            new THREE.MeshLambertMaterial({
                map: config.texture.wood,
            })
        );
    } else {
        objs[2] = new THREE.Mesh(new THREE.BoxGeometry(doorT, doorT, doorW),
            new THREE.MeshLambertMaterial({
                map: config.texture.wood,
            })
        );
    }
    objs[2].position.set(xx, yy + doorH - doorT/2, zz);

    collisionObjs.push(...objs);

    objs.forEach((v) => {
        v.castShadow = true;
        v.receiveShadow = true;
        config.scene.add(v);
    })
}

export function createWindow(conf) {
    let objs = [];
    let xx = conf.pos[0];
    let yy = conf.pos[1];
    let zz = conf.pos[2];

    let WinL = conf.WinL || 10;
    let WinT = conf.WinT || 2;
    
    let offset = WinL/2 - WinT/2;
    objs[0] = new THREE.Mesh(new THREE.BoxGeometry(WinT, WinL, WinT),
        new THREE.MeshLambertMaterial({
            map: config.texture.wood,
        })
    );
    objs[0].position.set(xx + offset, yy, zz);
    

    objs[1] = new THREE.Mesh(new THREE.BoxGeometry(WinT, WinL, WinT),
        new THREE.MeshLambertMaterial({
            map: config.texture.wood,
        })
    );
    objs[1].position.set(xx - offset, yy, zz);
    

    objs[2] = new THREE.Mesh(new THREE.BoxGeometry(WinL, WinT, WinT),
        new THREE.MeshLambertMaterial({
            map: config.texture.wood,
        })
    );
    objs[2].position.set(xx, yy + offset, zz);

    objs[3] = new THREE.Mesh(new THREE.BoxGeometry(WinL, WinT, WinT),
        new THREE.MeshLambertMaterial({
            map: config.texture.wood,
        })
    );
    objs[3].position.set(xx, yy - offset, zz);

    collisionObjs.push(...objs);

    objs.forEach((v) => {
        v.castShadow = true;
        v.receiveShadow = true;
        config.scene.add(v);
    })
}


export function createBowl(conf) {
    let objs = [];
    let xx = conf.pos[0];
    let yy = conf.pos[1];
    let zz = conf.pos[2];

    let bowlW = conf.bowlW || 20;
    let sideW = conf.sideW || 2;
    let bottomH = conf.bottomH || 1;
    let sideH = conf.sideH || 3;
    
    objs[0] = new THREE.Mesh(new THREE.BoxGeometry(bowlW, bottomH, bowlW),
        new THREE.MeshLambertMaterial({
            map: config.texture.dirt,
        })
    );
    objs[0].position.set(xx, yy + bottomH/2, zz);
    

    objs[1] = new THREE.Mesh(new THREE.BoxGeometry(sideW, sideH, bowlW),
        new THREE.MeshLambertMaterial({
            map: config.texture.dirt,
        })
    );
    objs[1].position.set(xx + (bowlW/2 - sideW/2), yy + bottomH + sideH/2, zz);
    objs[2] = new THREE.Mesh(new THREE.BoxGeometry(sideW, sideH, bowlW),
        new THREE.MeshLambertMaterial({
            map: config.texture.dirt,
        })
    );
    objs[2].position.set(xx - (bowlW/2 - sideW/2), yy + bottomH + sideH/2, zz);
    

    objs[3] = new THREE.Mesh(new THREE.BoxGeometry(bowlW, sideH, sideW),
        new THREE.MeshLambertMaterial({
            map: config.texture.dirt,
        })
    );
    objs[3].position.set(xx, yy + bottomH + sideH/2, zz + (bowlW/2 - sideW/2));
    objs[4] = new THREE.Mesh(new THREE.BoxGeometry(bowlW, sideH, sideW),
        new THREE.MeshLambertMaterial({
            map: config.texture.dirt,
        })
    );
    objs[4].position.set(xx, yy + bottomH + sideH/2, zz - (bowlW/2 - sideW/2));

    collisionObjs.push(...objs);

    objs.forEach((v) => {
        v.castShadow = true;
        v.receiveShadow = true;
        config.scene.add(v);
    })
}

export function createStairs(conf) {
    let objs = [];
    let xx = conf.pos[0];
    let yy = conf.pos[1];
    let zz = conf.pos[2];

    let stairW = conf.stairW || 8;
    let stairH = conf.stairH || 1;
    let count = conf.count || 5;

    for(let i = 0;i < count;i++) {
        objs[i] = new THREE.Mesh(new THREE.BoxGeometry(stairW, stairH, stairW),
            new THREE.MeshLambertMaterial({
                map: config.texture.stone,
            })
        );
        if(conf.xx){
            objs[i].position.set(xx + conf.xx*i*stairW/2, yy + stairH/2 + i*stairH, zz);
        } else if(conf.zz) {
            objs[i].position.set(xx, yy + stairH/2 + i*stairH, zz + conf.zz*i*stairW/2);
        }
    }

    collisionObjs.push(...objs);

    objs.forEach((v) => {
        v.castShadow = true;
        v.receiveShadow = true;
        config.scene.add(v);
    })
}

export function createGoal(conf) {
    var obj = new THREE.Mesh(new THREE.BoxGeometry(3, 3, 3),
        new THREE.MeshLambertMaterial({
            map: config.texture.light,
            transparent: true,
            opacity: 0.6,
        })
    );

    config.goalTotal++;
    goalTotalBox.textContent = config.goalTotal;

    obj.position.set(conf.pos[0], conf.pos[1] + 1.5, conf.pos[2]);
    obj.name = initName();

    obj.penetrable = true;
    obj.refresh = -1;
    obj.callback = function() {
        config.goalGet++;
        goalGetBox.textContent = config.goalGet;
        if(config.goalGet === config.goalTotal) {
            clearInterval(config.timeID);
            successMask.style.display = 'block';
            backBtn.className = 'back-btn back-btn-mask';
            resetBtn.className = 'reset-btn reset-btn-mask';
            config.isP = true;
        }
    };

    collisionObjs.push(obj);

    config.scene.add(obj);
}