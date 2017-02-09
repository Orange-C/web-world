import config from './config';

/**
 * conf {
 *  len: [x,y,z]
 *  pos: [x,y,z]
 *  color: 0xffffff;
 *  shadow: boolean
 * }
 */
export function createNormalBlock(conf) {
    var obj = new THREE.Mesh(new THREE.BoxGeometry(...conf.len),
        new THREE.MeshLambertMaterial({
            color: conf.color,
        })
    );
    obj.position.set(...conf.pos);
    if(conf.shadow !== false) {
        obj.castShadow = true;
        obj.receiveShadow = true;
    }
    return obj;
}