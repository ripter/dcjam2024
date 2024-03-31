import { 
  PerspectiveCamera,
  WebGLRenderer,
  Scene,
  HemisphereLight,
  Group,
} from 'three';
import { findMaxDisplaySize } from '../utils/findMaxDisplaySize.mjs';

export class Engine {
  #level;
  #elmRoot;

  constructor(level, aspectRatio, elmRoot) {
    this.#level = level;
    this.#elmRoot = elmRoot;
    this.aspectRatio = aspectRatio;
    // Root Scene
    this.scene = new Scene();
    // Camera
    this.camera = new PerspectiveCamera(75, aspectRatio, 0.1, 1000);
    this.cameraRig = new Group();
    this.camera.position.set(0, 1, 0);
    this.cameraRig.add(this.camera);
    this.scene.add(this.cameraRig);
    // Renderer
    this.renderer = new WebGLRenderer();
    this.renderer.domElement.id = 'main-canvas';
    this.#elmRoot.appendChild(this.renderer.domElement);
    window.addEventListener('resize', this);
    this.resize();
  }

  /**
   * Initializes the 3D Engine from the level.
   */
  async init() {
    const level = this.#level;

    // Create the 3D world from the floorMap.
    level.floorMap.forEach((tileId, index) => {
      const def = level.definitions.get(tileId);
      if (!def) {
        console.warn(`No definition found for tileId: ${tileId}`);
        return;
      }
      const { x, y } = level.indexToXY(index);
      const mesh = def.model.clone();
      mesh.position.set(x, 0, y);
      this.scene.add(mesh);
    });

    // Add some light
    const light = new HemisphereLight(0xffffff, 0x444444);
    light.position.set(1, 1, 1);
    this.scene.add(light);

    //
    // Move the Camera to the spawn point
    const spSpawnPoint = level.getRandomEntityByType('spawn-player');
    this.cameraRig.position.set(spSpawnPoint.x, 0, spSpawnPoint.y);
    console.log('spawnPoint', spSpawnPoint);
  }

  /**
   * Update is called every Tick
   */
  async update() {
    // Render the scene
    this.renderer.render(this.scene, this.camera);
  }

  async resize() {
    const { width, height } = findMaxDisplaySize(this.aspectRatio);
    this.#elmRoot.style.width = `${width}px`;
    this.#elmRoot.style.height = `${height}px`;
    this.renderer.setSize(width, height);
    this.camera.updateProjectionMatrix();
  }


  handleEvent(event) {
    // Resize the game when the window is resized
    // resizeGame();
    console.log('handleEvent', event);
    this.resize();
  }

}
