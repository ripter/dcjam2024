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
    this.scene.addChild(this.mask);
    this.scene.addChild(this.tileMap);
    this.scene.addChild(this.background);

  }

  get width() {
    return this.scene.width;
  }
  set width(value) {
    this.scene.width = value;
  }
  get height() {
    return this.scene.height;
  }
  set height(value) {
    this.scene.height = value;
  }

  get position() {
    return this.scene.position;
  }

  async init() {
    // Read the level and create the minimap tiles
    await this.addTiles();
  }

  /**
   * Resizes the minimap.
   * @param {number} width 
   * @param {number} height 
   */
  resize(width, height) {
    const widthInTiles = 4;
    const tileSize = Math.ceil(Math.min(width, height) / widthInTiles);

    // Resise the tiles
    this.tileMap.children.forEach((sprite) => {
      const { x, y } = sprite.tilePosition;
      sprite.width = tileSize;
      sprite.height = tileSize;
      sprite.position.set(x * tileSize, y * tileSize);
    });

    // Resize the background
    this.background.clear();
    this.background.rect(0, 0, width, height);
    this.background.stroke({ width: 1, color: 0xffffff });

    // Resize the mask
    this.mask.clear();
    this.mask.rect(0, 0, width, height);
    this.mask.fill({ color: 0xff00ff });
    this.tileMap.mask = this.mask;
  }


  /**
   * Adds the tiles from level to tileMap.
   * 
   */
  async addTiles() {
    const level = this.#level;
    // Add each tile in the level to the mini map
    for (let x = 0; x < level.widthInTiles; x++) {
      for (let y = 0; y < level.heightInTiles; y++) {
        const tile = level.getTileBy2DPosition(x, y);
        const texture = await Assets.load(tile.sprite); // PIXI.JS says this is the correct way to load a texture. They handle cache.
        const sprite = new Sprite(texture);
        // sprite.pivot.set(sprite.width / 2, sprite.height / 2);
        // Save the tile position for later
        sprite.tilePosition = { x, y };
        this.tileMap.addChild(sprite);
      }
    }
  }
}
