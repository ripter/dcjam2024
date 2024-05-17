// SINGLETON ALERT!!!!
// This module exports a singleton to manage the PIXI.js Application.
// It exports UI, please initalize the UI with the init method before using it.
import { 
  Application, 
  Container,
  Graphics,
} from '../../libs/pixi.min.mjs';
import { Minimap } from './Minimap.mjs';
import { DEFAULT_TILE_SIZE } from '../consts.mjs';
import { loadSprite } from './loadSprite.mjs';




/**
 * Manages the PIXI.js Application and the UI for the game.
 * This class is a singleton and should be initalized with the init method at the start of the game.
 */
class UI {
  #level
  /**
   * Creates a new UI for the level.
   */
  constructor() {
    // Create the PIXI Application!
    this.app = new Application();
    // Create a group to hold all the Entities
    this.entityContainer = new Container();
    // Create a Minimap
    this.miniMap = new Minimap();
    // Event listeners
    window.addEventListener('resize', this.resizeAndRerender.bind(this));
  }

  get screenWidth() {
    return this.app.screen.width;
  }
  get screenHeight() {
    return this.app.screen.height;
  }

  /**
   * Initializes the UI.
   * This follows the same pattern as PIXI.js by using a init method.
   */
  async init() {
    const mainContext = document.getElementById('main-canvas');
    // Init the PIXI Application
    await this.app.init({
      resizeTo: mainContext,
      backgroundAlpha: 0,
    });
    this.app.canvas.id = 'ui-canvas';
    window.gameBody.appendChild(this.app.canvas);

    // Calculate the dimensions for the rectangle
    const rectWidth = this.app.screen.width / 4; // Right fourth of the width
    const rectHeight = this.app.screen.height;   // Full height
    const rectX = this.app.screen.width - rectWidth; // Starting X position

    const graphics = new Graphics();
    graphics.beginFill(0xFFFFFF, 0.5);
    graphics.drawRect(rectX, 0, rectWidth, rectHeight);
    graphics.endFill();

    this.app.stage.addChild(graphics);

    // Initalize the minimap and add it to the UI
    await this.miniMap.init();
    this.app.stage.addChild(this.miniMap.scene);
    this.miniMap.scene.position.set(100, 0);
  }

  async loadLevel(level) {
    this.#level = level;
    await this.miniMap.loadLevel(level);
  }

  /**
   * Creates a new sprite and adds it to the entity container.
   * @param {Mob} entity 
   */
  async spawnEntity(url) {
    const sprite = await loadSprite(url, DEFAULT_TILE_SIZE);
    this.entityContainer.addChild(sprite);
    return sprite;
  }

  /**
   * Resizes the UI based on the screen size.
   */
  async resize() {
    const level = this.#level;
    if (!level) { return; }
    // tell Pixi to resize
    this.app.resize();
    // Calculate the Minimap tile size based on the screen size
    const miniMapTileSize = Math.min(this.screenWidth, this.screenHeight) / 28;
    this.miniMap.resize(miniMapTileSize, level);
  }


}

// Singleton!
export const ui = new UI();
export default ui;
