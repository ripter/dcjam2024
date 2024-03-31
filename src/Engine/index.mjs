import { 
  PerspectiveCamera,
  WebGLRenderer,
  Scene,
  HemisphereLight,
} from 'three';
import { findMaxDisplaySize } from '../utils/findMaxDisplaySize.mjs';

export class Engine {
  #level;

  constructor(level, aspectRatio) {
    this.#level = level;
    this.aspectRatio = aspectRatio;
    // Root Scene
    this.scene = new Scene();
    // Camera
    this.camera = new PerspectiveCamera(75, aspectRatio, 0.1, 1000);
    // Renderer
    this.renderer = new WebGLRenderer();
    this.renderer.domElement.id = 'main-canvas';
    window.gameBody.appendChild(this.renderer.domElement);
    window.addEventListener('resize', this);
  }

  /**
   * Initializes the Engine to run the Level.
   */
  async init() {
    // Add the Level to the scene.
    // level.scene.position.set(0, 0, 0);
    // scene.add(level.scene);

    //TODO: Load world lighting from level
    // Add some light
    const light = new HemisphereLight(0xffffff, 0x444444);
    light.position.set(1, 1, 1);
    this.scene.add(light);
  }

  /**
   * Update is called every Tick
   */
  async update() {

  }

  async resize() {

  }


  handleEvent(event) {
    // Resize the game when the window is resized
    // resizeGame();
    console.log('handleEvent', event);
  }

}
