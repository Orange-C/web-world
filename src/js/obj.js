import config from './config';

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
        new THREE.MeshPhongMaterial({
            color: conf.color,
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