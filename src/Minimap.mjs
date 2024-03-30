import { 
  Assets,
  Container,
  Graphics,
  Sprite,
} from '../libs/pixi.min.mjs';

export class Minimap {
  #level;
  constructor(level) {
    this.#level = level;
    this.scene = new Container(); // root container for the minimap
    this.background = new Graphics(); // background/chrome for the minimap
    this.tileMap = new Container(); // container for the minimap tiles
    this.mask = new Graphics(); // mask for the minimap
    this.scene.addChild(this.background);
    this.scene.addChild(this.tileMap);

  }

  async init(width, height) {
    // Read the level and create the minimap tiles
    await this.addTiles();

    // Resize/Initsize the minimap size calculations.
    this.resize(width, height); 

    // Create the chrome for the minimap
    const { background, lineWidth } = this;
    background.rect(0, 0, width, height);
    background.stroke({ width: lineWidth, color: 0xffffff });
    background.fill({ color: 0xff00ff });
  }

  /**
   * Resizes the minimap.
   * @param {number} width 
   * @param {number} height 
   */
  resize(width, height) {
    this.width = width;
    this.height = height;
    this.padding = (width * 0.055);
    this.lineWidth = 0|(width * 0.025),
    this.tileSize = Math.min(width, height) / 4;

    this.scene.width = width;
    this.scene.height = height;

    this.resizeTiles();
  }

  resizeTiles() {
    this.tileMap.children.forEach((sprite) => {
      const { x, y } = sprite.tilePosition;
      const scale = this.tileSize / sprite.width; // This assumes a square texture for simplicity
      sprite.scale.set(scale, scale);
      sprite.position.set(x * this.tileSize, y * this.tileSize);
    });
  }

  /**
   * Adds the tiles from level to tileMap.
   * 
   */
  async addTiles() {
    const level = this.#level;
    console.log('Adding Tiles')
    // Add each tile in the level to the mini map
    for (let x = 0; x < level.widthInTiles; x++) {
      for (let y = 0; y < level.heightInTiles; y++) {
        const tile = level.getTileBy2DPosition(x, y);
        const texture = await Assets.load(tile.sprite); // PIXI.JS says this is the correct way to load a texture. They handle cache.
        const sprite = new Sprite(texture);
        // Save the tile position for later
        sprite.tilePosition = { x, y };
        this.tileMap.addChild(sprite);
      }
    }
  }
}
