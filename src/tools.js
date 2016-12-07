// ball move front
export function move(x, y ,z, dir) {
    let dis = 0.3;

    let theta = Math.atan(camera.position.cx / camera.position.cz);
    let moveSin = dis * Math.sin(theta);
    let moveCos = dis * Math.cos(theta);
    if(camera.position.cz < 0) {
        moveSin = -moveSin;
        moveCos = -moveCos;
    }

    switch(dir){
        case 'up':
            return {
                x: x - dis * moveSin,
                y: y,
                z: z - dis * moveCos
            }
        case 'right': 
            return {
                x: x + dis * moveCos,
                y: y,
                z: z - dis * moveSin
            }
        case 'left': 
            return {
                x: x - dis * moveCos,
                y: y,
                z: z + dis * moveSin
            }
        case 'down': 
            return {
                x: x + dis * moveSin,
                y: y,
                z: z + dis * moveCos
            }
        default: 
            return {
                x,
                y,
                z
            }
    }
}