// SINGLETON ALERT!!!!
// This module exports a singleton to manage the THREE.js Application.
// It exports ThreeD, please initalize with the init method before using it.
import { 
  PerspectiveCamera,
  WebGLRenderer,
  Scene,
  HemisphereLight,
  Group,
} from 'three';
import { findMaxDisplaySize } from '../utils/findMaxDisplaySize.mjs';

class ThreeD {
  #elmRoot;
  #scene;

  constructor() {
    // Root Scene
    this.#scene = new Scene();
  }

  /**
   * Initializes the 3D Engine from the level.
   */
  async init(aspectRatio, elmRoot) {
    this.#elmRoot = elmRoot;
    this.aspectRatio = aspectRatio;

    // Camera
    this.camera = new PerspectiveCamera(75, aspectRatio, 0.1, 1000);
    this.camera.position.set(0, 1, 0);
    this.renderer = null;
    this.#scene.add(this.camera);

    // Renderer
    this.renderer = new WebGLRenderer();
    this.renderer.domElement.id = 'main-canvas';
    elmRoot.appendChild(this.renderer.domElement);

    window.addEventListener('resize', this);
  }

  async loadFloorMap(floorMap) {
    // Create the 3D world from the floorMap.
    floorMap.forEach((tileId, index) => {
      const def = level.definitions.get(tileId);
      if (!def) {
        console.warn(`No definition found for tileId: ${tileId}`);
        return;
      }
      const { x, y } = level.indexToXY(index);
      const mesh = def.model.clone();
      mesh.position.set(x, 0, y);
      this.#scene.add(mesh);
    });

    // Add some light
    const light = new HemisphereLight(0xffffff, 0x444444);
    light.position.set(1, 1, 1);
    this.#scene.add(light);
  }

  /**
   * Update is called every Tick
   */
  async update() {
    // Update dirty entities
    // for (const entity of this.#level.dirtyEntities) {
    //   const { x, y } = entity.tilePosition;
    //   const lookPosition = entity.positionInFront();
    //   const { x: lookX, y: lookY } = lookPosition;

    //   // TODO: Hide the camera stuff in the player entity
    //   if (entity.type === 'player') {
    //     this.cameraRig.position.set(x, 0, y);
    //     this.camera.lookAt(lookX, 1, lookY);
    //   }
    // }

    // Render the scene
    this.renderer.render(this.#scene, this.camera);
  }

  /**
   * Render should be called every Tick
   */
  async render() {
    // Render the scene
    this.renderer.render(this.#scene, this.camera);
  }

  /**
   * Resize the 3D Engine when the window is resized.
   */
  async resize() {
    const { width, height } = findMaxDisplaySize(this.aspectRatio);
    this.#elmRoot.style.width = `${width}px`;
    this.#elmRoot.style.height = `${height}px`;
    this.renderer.setSize(width, height);
    this.camera.updateProjectionMatrix();
  }

  handleEvent(event) {
    if (event.type !== 'resize') {
      return;
    }
    // Resize the game when the window is resized
    this.resize();
  }


  addToScene(mesh) {
    this.#scene.add(mesh);
  }
  addCameraTo(who) {
    who.add(this.camera);
  }
  cameraLookAt(x, y, z) {
    this.camera.lookAt(x, y, z);
  }

  async spawnModel(modelUrl) {
    console.log('spawnModel', modelUrl);
  }
}


// Singleton!
const threeD = new ThreeD();
export default threeD;