import * as THREE from "three";
import { OffscreenCanvas } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

export const renderModel = (
  url: string,
  ref: HTMLCanvasElement | OffscreenCanvas | undefined,
  deg: number
) => {
  const scene = new THREE.Scene();
  const renderer = new THREE.WebGLRenderer({
    canvas: ref,
    antialias: true,
    alpha: true,
  });
  const light = new THREE.AmbientLight(0x404040, 6);
  scene.add(light);

  renderer.outputEncoding = THREE.sRGBEncoding;
  renderer.setClearColor(0x000000, 0);
  renderer.setSize(500, 500);

  const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 10000);
  camera.position.set(0, 100, 1300);

  const loader = new GLTFLoader();
  loader.load(
    url,
    (gltf) => {
      const clock = new THREE.Clock();
      const mixer = new THREE.AnimationMixer(gltf.scene);

      gltf.scene.rotation.x += 0.3;
      gltf.scene.rotation.y += deg;

      mixer.clipAction(gltf.animations[0]).play();
      scene.add(gltf.scene);

      const animate = () => {
        requestAnimationFrame(animate);

        const delta = clock.getDelta();

        mixer.update(delta);

        renderer.render(scene, camera);
      };

      animate();
    },
    undefined,
    (error) => {
      console.error(error);
    }
  );
};
