// config

const config = {
    R: 1, //小球半径 
    focalDistance: 9, //焦距 
    FA: 10000, //加速系数，负相关
    FF: 600, //摩擦系数，负相关
    FJ: 3, //跳跃系数，负相关
    FG: 100, //重力系数，负相关

    renderer: null,
    scene: null,
    camera: null,
    ball: null,
    id: null, // animation id
};

export default config;