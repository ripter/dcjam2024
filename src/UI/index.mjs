import { 
  Application, 
  Assets,
  Sprite,
} from '../../libs/pixi.min.mjs';
import { Minimap } from './Minimap.mjs';

export class UI {
  #level;
  #player;

  /**
   * Creates a new UI for the level.
   * @param {Level} level 
   */
  constructor(level) {
    this.#level = level;
    this.app = new Application();
    this.miniMap = new Minimap(level);
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

    // Initalize the minimap and add it to the UI
    await this.miniMap.init();
    this.app.stage.addChild(this.miniMap.scene);

    // Resize and Render the UI
    this.resizeAndRerender();
  }

  async loadPlayerSprite() {
    const srcTexture = this.#level.defs.get('player').sprite;
    const texture = await Assets.load(srcTexture);
    const player = new Sprite(texture);
    const scale = this.tileSize / player.width; // TODO: move this to resizeAndRerender

    player.anchor.set(0.5, 0.5);
    player.scale.set(scale, scale);
    return player;
  }


  async update() {
    // Clear removed entities
    for (const entity of this.#level.removedEntities) {
      await this.miniMap.removeEntity(entity);
    }
    // Add new entities
    for (const entity of this.#level.addedEntities) {
      await this.miniMap.addEntity(entity);
    }
    // Pass the dirty entities to our sub-components.
    for (const entity of this.#level.dirtyEntities) {
      await this.miniMap.updateEntity(entity);
    }
  }

  /**
   * Resizes the UI and re-renders the UI.
   */
  resizeAndRerender() {
    console.log('Resize and Rerender the UI')
    // tell Pixi to resize
    this.app.resize();

    const miniMapWidth = 0|(this.screenWidth / 5);
    const miniMapHeight = 0|(this.screenHeight / 5);
    const miniMapPadding = Math.min(miniMapWidth, miniMapHeight) / 10;

    this.miniMap.resize(miniMapWidth, miniMapHeight);
    this.miniMap.position.set(
      this.screenWidth - miniMapWidth - miniMapPadding, 
      miniMapPadding
    );
  }

}
