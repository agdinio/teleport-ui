import React, { Suspense, useEffect, useRef, useState } from "react";

import { Box } from "@chakra-ui/react";
import { css } from "@emotion/react";
import { OrbitControls, Stars, useTexture } from "@react-three/drei";
import { Canvas, useLoader, useThree } from "@react-three/fiber";
import _random from "lodash/random";
import Globe from "react-globe.gl";
import * as THREE from "three";
import ThreeGlobe from "three-globe";

import { MenuButton } from "../components/ui/MenuButton";

function Sphere(props) {
  const texture = useTexture("/8k_mars.jpg");
  const textureBump = useTexture(
    "/mars_bump_map_8k_by_slimysomething_dcssy8t.png"
  );
  return (
    <mesh {...props}>
      <sphereBufferGeometry args={[1, 64, 64]} />
      <meshPhysicalMaterial
        envMapIntensity={1}
        map={texture}
        bumpMap={textureBump}
        clearcoat={0}
        clearcoatRoughness={0}
        roughness={0.8}
        metalness={0.5}
      />
    </mesh>
  );
}

function SphereMesh(props) {
  return (
    <mesh {...props}>
      <sphereBufferGeometry args={[1, 80, 80, 100000]} />
    </mesh>
  );
}

function SkyBox() {
  const {
    scene,
    camera,
    invalidate,
    gl: { domElement },
  } = useThree();
  const controlsRef = useRef();

  const textures = ["1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg"];
  // const envMap = useCubeTexture(textures, { path: "/skybox/" });
  const texture = useLoader(THREE.TextureLoader, "/skybox/skybox-4k-zc.jpg");
  // scene.background = envMap;
  // useEffect(() => {
  //   const previous = scene.background;
  //   scene.background = envMap;
  //   return () => {
  //     scene.background = previous;
  //   };
  // }, [envMap, scene]);

  return (
    <group>
      <mesh>
        <sphereBufferGeometry args={[500, 60, 40]} />
        <meshBasicMaterial map={texture} side={THREE.BackSide} />
      </mesh>
    </group>
  );
}

const TILE_MARGIN = 0.35; // degrees

// Gen random data
const GRID_SIZE = [60, 20];
const COLORS = ["yellow"];

const materials = COLORS.map(
  (color) =>
    new THREE.MeshLambertMaterial({ color, opacity: 0.4, transparent: true })
);
const tileWidth = 360 / GRID_SIZE[0];
const tileHeight = 180 / GRID_SIZE[1];
const tilesData = [];
// @ts-ignore
[...Array(GRID_SIZE[0]).keys()].forEach((lngIdx) =>
  // @ts-ignore
  [...Array(GRID_SIZE[1]).keys()].forEach((latIdx) =>
    tilesData.push({
      lng: -180 + lngIdx * tileWidth,
      lat: -90 + (latIdx + 0.5) * tileHeight,
      material: materials[Math.floor(Math.random() * materials.length)],
    })
  )
);

const getTooltip = () => `
      <div style="text-align: center">
        <div><b>Mountains</b> on Magor</div>
        <div>NFT luck: <em>${_random(1, 3)}</em></div>
        <div>TLM power: <em>${_random(1, 3)}</em></div>
        <div>Profit: <em>${_random(1, 20)}%</em></div>
      </div>
    `;

const MyGlobe = new ThreeGlobe()
  .globeImageUrl("/8k_mars.jpg")
  .bumpImageUrl("/mars_bump_map_8k_by_slimysomething_dcssy8t.png");
const GlobeX = (props) => {
  const { scene } = useThree();
  // This reference will give us direct access to the mesh

  useEffect(() => {
    scene.add(MyGlobe);
  }, []);
  // MyGlobe.showGlobe();
  return null;
};

const Missions = () => {
  const [grid, showGrid] = useState(false);
  const [hoverD, setHoverD] = useState();

  const globeEl = useRef();
  // @ts-ignore
  const controls = globeEl?.current?.controls();
  const N = 20;
  // @ts-ignore
  const arcsData = [...Array(N).keys()].map(() => ({
    startLat: (Math.random() - 0.5) * 180,
    startLng: (Math.random() - 0.5) * 360,
    endLat: (Math.random() - 0.5) * 180,
    endLng: (Math.random() - 0.5) * 360,
    color: [
      ["red", "white", "orange", "green"][Math.round(Math.random() * 3)],
      ["red", "white", "orange", "green"][Math.round(Math.random() * 3)],
    ],
  }));

  // function animate() {
  //   tbControls.update();
  //   Globe.rotation.y += 0.005;
  //   renderer.render(scene, camera);
  //   requestAnimationFrame(animate);
  // }

  return (
    <Box
      css={css`
        height: 100vh;
        left: 0;
        min-height: 100vh;
        min-width: 100vw;
        position: fixed;
        top: 0;
        width: 100vw;
        z-index: 1;

        canvas {
          height: 100%;
          min-width: 100%;
          width: 100%;
          z-index: 1;
        }
      `}
    >
      <Box position="fixed" top={0} right={0} w="200px" h="full" zIndex={1000}>
        <Box position="relative" width="100%" height="100%">
          <MenuButton
            position="absolute"
            top="100px"
            right="50px"
            zIndex={1000}
            onClick={() => showGrid(!grid)}
          >
            {!grid ? "Show" : "Hide"} Lands
          </MenuButton>
        </Box>
      </Box>

      {/*  <Suspense fallback={null}> */}
      <Globe
        ref={globeEl}
        globeImageUrl="/2k_mars.jpg"
        bumpImageUrl="https://unpkg.com/three-globe/example/img/earth-topology.png"
        backgroundImageUrl="/skybox/skybox-4k-zc.jpg"
        tilesData={grid ? tilesData : []}
        tileWidth={tileWidth - TILE_MARGIN}
        tileHeight={tileHeight - TILE_MARGIN}
        tileMaterial="material"
        tileLabel={() => ` 
        <div style="text-align: center"> 
          <div><b>Mountains</b> on Magor</div> 
          <div>NFT luck: <em>${_random(1, 3)}</em></div> 
          <div>TLM power: <em>${_random(1, 3)}</em></div> 
          <div>Profit: <em>${_random(1, 20)}%</em></div> 
        </div> 
       `}
        arcsData={grid ? [] : arcsData}
        arcColor="color"
        arcDashLength={() => Math.random()}
        arcDashGap={() => Math.random()}
        arcDashAnimateTime={() => Math.random() * 4000 + 500}
        tileAltitude={(d) => (d === hoverD ? 0.06 : 0.02)}
        onTileHover={setHoverD}
      />
      {/*  </Suspense> */}

      {/* <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 5], fov: 45 }}> */}
      {/*  /!* <pointLight *!/ */}
      {/*  /!*  intensity={0.8} *!/ */}
      {/*  /!*  angle={0.2} *!/ */}
      {/*  /!*  penumbra={0} *!/ */}
      {/*  /!*  position={[5, 15, 10]} *!/ */}
      {/*  /!* /> *!/ */}
      {/*  /!* <pointLight position={[-20, -5, -10]} color="white" intensity={0.8} /> *!/ */}
      {/*  /!* <pointLight position={[10, 15, -10]} color="white" intensity={0.8} /> *!/ */}
      {/*  /!* <pointLight position={[-1, -15, 10]} color="white" intensity={0.8} /> *!/ */}
      {/*  <ambientLight intensity={0.8} /> */}
      {/*  <Suspense fallback={null}> */}
      {/*    <GlobeX /> */}
      {/*    /!* <Sphere /> *!/ */}
      {/*    <SkyBox /> */}
      {/*    /!* <Stars saturation={0.7} depth={10} count={10000} /> *!/ */}

      {/*    /!* <Environment preset="studio" files={["terazo.png"]} /> *!/ */}
      {/*  </Suspense> */}
      {/*  /!* @ts-ignore *!/ */}
      {/*  <OrbitControls autoRotate autoRotateSpeed={0.4} /> */}
      {/* </Canvas> */}
    </Box>
  );
};

export default Missions;
