import config from './config';

export default function texture() {
    let loader = new THREE.TextureLoader();
    let textures = ['ground', 'stone', 'moss', 'red', 'blue', 'gold', 'wall', 'light', 'wood', 'dirt'];
    textures.forEach((v) => {
        loader.load(
            'src/img/' + v + '.png',
            // Function when resource is loaded
            function ( texture ) {
                config.texture[v] = texture;
            }
            // // // Function called when download progresses
            // function ( xhr ) {
            //     console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
            // },
            // // Function called when download errors
            // function ( xhr ) {
            //     console.log( 'An error happened' );
            // }
        );
    })
}
