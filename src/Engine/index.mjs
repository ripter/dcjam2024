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
    // Move the Camera to a random spawn point
    // const spawnPoint = level.getRandomEntityByType('spawn-player');
    // const { x: spawnX, y: spawnY } = spawnPoint.tilePosition;
    // const lookPosition = spawnPoint.positionInFront();
    // const { x: lookX, y: lookY } = lookPosition;
    // this.cameraRig.position.set(spawnX, 0, spawnY);
    // this.cameraRig.lookAt(lookX, 0, lookY);
    this.cameraRig.position.set(0, 0, 0);
  }

  /**
   * Update is called every Tick
   */
  async update() {
    // Update dirty entities
    for (const entity of this.#level.dirtyEntities) {
      console.log('Updating dirty', entity);
    }
    // Move the Camera to the Player's position
    const player = this.#level.getEntityByType('player');
    if (player) {
      const { x, y } = player.tilePosition;
      const lookPosition = player.positionInFront();
      const { x: lookX, y: lookY } = lookPosition;

      if (this._lookAtX !== lookX || this._lookAtY !== lookY) {
        console.log('Moving Camera to look at', player.direction, {lookX, lookY}, 'from', {x, y})
        this._lookAtX = lookX;
        this._lookAtY = lookY;
        this.cameraRig.position.set(x, 0, y);
        this.cameraRig.lookAt(lookX, 0, lookY);
      }
    }

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
