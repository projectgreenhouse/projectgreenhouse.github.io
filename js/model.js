import * as THREE from 'https://cdn.skypack.dev/three@0.129.0/build/three.module.js';
import { OrbitControls } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js';

//Código reutilizable

const sizes = {
    width: window.innerWidth/3,  //Código simil diccionario en Python - width (key) / window.innerWidth (value)
    height: window.innerHeight/3
}

const canvas = document.querySelector(".webgl") //Objeto que toma el contenedor de mi modelo
const scene = new THREE.Scene() //Objeto que representa la escena
const camera = new THREE.PerspectiveCamera(60, sizes.width/sizes.height, 0.1, 100) //Objeto que representa la camara
camera.position.set(1, 1, 2.5) //Corrijo la posición de la camara (x,y,z)
scene.add(camera) //Agrego la camara a la escena

const renderer = new THREE.WebGL1Renderer ({
    canvas: canvas                              //Creo el renderizador (duda)
})

renderer.setSize(sizes.width, sizes.height) //Seteo tamaño del renderizador
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)) //Ni idea que hizo acá el señor
renderer.render(scene, camera) //Renderizo la escena y la camara

const loader = new GLTFLoader()     //Declaro el objeto loader que se encargara de subir el modelo
loader.load('../assets/uri.gltf', function(gltf){
    console.log(gltf)
    const root = gltf.scene
    root.scale.set(1.5,1.5,1.5)
    scene.add(root) //Agrego el modelo a la escena
})

const light = new THREE.DirectionalLight(0xFFFFFF, 1) //Creo la luz para iluminar el modelo
light.position.set(2, 2, 5) //Posiciono la luz
scene.add(light) //Agrego luz a la escena

function animate(){
    requestAnimationFrame(animate)  //Ejecuta la funcion animate segun la frecuencia de muestreo de la pantalla
    renderer.render(scene, camera) //Renderizo la escena y la camara
}

animate() //Llamo a la funcion animate
