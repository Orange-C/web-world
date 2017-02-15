import config from './config';
import { createNormalBlock } from './obj';
import { collisionObjs } from './collision';

export function initMap() {
    var obj = createNormalBlock({
        len: [8, 2, 8],
        pos: [-2, 1, 0],
        color: 0xf8f8f8
    });
    collisionObjs.push(obj);
    config.scene.add(obj);

    var obj2 = createNormalBlock({
        len: [8, 2, 8],
        pos: [-8, 3, 0],
        color: 0xf8f8f8
    });
    collisionObjs.push(obj2);
    config.scene.add(obj2);

    var obj3 = createNormalBlock({
        len: [8, 2, 8],
        pos: [-14, 5, 0],
        color: 0xf8f8f8
    });
    collisionObjs.push(obj3);
    config.scene.add(obj3);

    var wall1 = createNormalBlock({
        len: [30, 16, 2],
        pos: [-10, 8, 4.8],
        color: 0xffffff,
        transparent: true,
        shadow: false,
    });
    collisionObjs.push(wall1);
    config.scene.add(wall1);

    var wall2 = createNormalBlock({
        len: [30, 16, 2],
        pos: [-10, 8, -4.8],
        color: 0xffffff,
        transparent: true,
        shadow: false,
    });
    collisionObjs.push(wall2);
    config.scene.add(wall2);
}