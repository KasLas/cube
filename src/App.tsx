import { useEffect } from 'react';
import { render } from 'react-dom';
import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  BoxGeometry,
  Mesh,
  AmbientLight,
  SpotLight,
  MeshNormalMaterial,
} from 'three';

import './App.css';

function App() {
  useEffect(() => {
    // scene
    const scene = new Scene();

    // Camera
    const camera = new PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.z = 96;

    // Renderer
    const canvas = document.getElementById('tree-js') as HTMLCanvasElement;

    const renderer = new WebGLRenderer({
      canvas,
      antialias: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);

    document.body.appendChild(renderer.domElement);

    // Lightning and spotLight are needed to see elements on the canvas
    // add lightning
    const ambientLight = new AmbientLight(0xffffff, 0.5);
    ambientLight.castShadow = true;
    scene.add(ambientLight);

    // SpotLight
    const spotLight = new SpotLight(0xffffff, 1);
    spotLight.castShadow = true;
    spotLight.position.set(0, 64, 32);
    scene.add(spotLight);

    // Adding the basic cube object
    const boxGeometry = new BoxGeometry(16, 16, 16);
    const boxMaterial = new MeshNormalMaterial();
    const boxMesh = new Mesh(boxGeometry, boxMaterial);
    scene.add(boxMesh);

    // The animate function is called on each frame and runs the whole thing
    const animate = () => {
      // animating the box
      boxMesh.rotation.x += 0.01;
      boxMesh.rotation.y += 0.01;

      renderer.render(scene, camera);
      window.requestAnimationFrame(animate);
    };

    animate();
  }, []);

  return (
    <div>
      <h1>hello</h1>
      <canvas id='tree-js' />
    </div>
  );
}

export default App;
