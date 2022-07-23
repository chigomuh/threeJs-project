import type { NextPage } from "next";
import { useEffect, useRef, useState } from "react";
import { renderModel } from "../component/common/funtions/renderModel";

const Home: NextPage = () => {
  const catRef = useRef<HTMLCanvasElement>(null);
  const [deg, setDeg] = useState(0.7);

  useEffect(() => {
    const catRefCurrent = catRef.current;

    if (catRefCurrent) {
      const url = "/threeModel/walkingCat/scene.gltf";
      renderModel(url, catRefCurrent, deg);

      const handleAnimationiteration = () => {
        setDeg((prev) => (prev = -prev));
      };

      catRefCurrent.addEventListener(
        "animationiteration",
        handleAnimationiteration
      );

      return () => {
        catRefCurrent.removeEventListener(
          "animationiteration",
          handleAnimationiteration
        );
      };
    }
  }, [catRef, deg]);

  return (
    <div className="relative w-screen h-screen bg-pink-400 overflow-hidden">
      <canvas
        ref={catRef}
        className="absolute top-0 left-0 animate-walking"
      ></canvas>
    </div>
  );
};

export default Home;
