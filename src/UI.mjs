import { 
  Application, 
  Assets,
  Sprite,
} from '../libs/pixi.min.mjs';
import { Minimap } from './Minimap.mjs';

export class UI {
  #level;
  #player;

  /**
   * Creates a new UI for the level.
   * @param {Level} level 
   */
  constructor(level, player) {
    this.#level = level;
    this.#player = player;
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
    if (!this.#player || !this.player) { return; }
    // Get the Player's position
    const playerPosition = this.#player.position;
    // Update the player sprite on the mini map
    this.player.position.set(playerPosition.x * this.tileSize, playerPosition.z * this.tileSize);
    // Rotate the player sprite to match the camera
    this.player.rotation = this.#player.rotation.y * -1;
    // move the mini map so the player is always in the center
    // this.miniMap.position.set(
    //   -playerPosition.x * this.tileSize + this.miniMapContainer.width / 2, // Center horizontally
    //   -playerPosition.z * this.tileSize + this.miniMapContainer.height / 2 // Center vertically
    // );
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
