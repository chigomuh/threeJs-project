import type { NextPage } from "next";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const Home: NextPage = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [deg, setDeg] = useState(0.7);

  useEffect(() => {
    const ref = canvasRef.current;

    if (ref) {
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
      renderer.setSize(100, 100);

      const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 10000);
      camera.position.set(0, 100, 1300);

      const loader = new GLTFLoader();
      loader.load(
        "/threeModel/walkingCat/scene.gltf",
        (gltf) => {
          const clock = new THREE.Clock();
          const mixer = new THREE.AnimationMixer(gltf.scene);

          mixer.clipAction(gltf.animations[0]).play();

          gltf.scene.rotation.x += 0.3;
          gltf.scene.rotation.y += deg;
          gltf.scene.rotation.z += 0;

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

      const handleAnimationiteration = () => {
        setDeg((prev) => (prev = -prev));
      };

      ref.addEventListener("animationiteration", handleAnimationiteration);

      return () => {
        ref.removeEventListener("animationiteration", handleAnimationiteration);
      };
    }
  }, [canvasRef, deg]);

  return (
    <div className="relative w-screen h-screen bg-pink-400">
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 animate-walking"
      ></canvas>
    </div>
  );
};

export default Home;
