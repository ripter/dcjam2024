import { 
  Assets, 
  Container, 
  Graphics, 
  Sprite, 
} from '../../libs/pixi.min.mjs';

export class Minimap {
  constructor() {
    this.scene = new Container();
    this.floor = new Container();
    this.scene.addChild(this.floor);
    this.mask = new Graphics();
    this.scene.addChild(this.mask);
  }

  async init() {

  }

  async loadLevel(level) {
    // Draw the floor map
    for (const floorTile of level.iterateFloor()) {
      const { spriteUrl } = floorTile;
      if (!spriteUrl) {
        continue;
      }
      // Create the sprite using PIXI's loader.
      const texture = await Assets.load(spriteUrl);
      const sprite = new Sprite(texture);
      sprite.position.set(
        floorTile.position.x * sprite.width, 
        floorTile.position.y * sprite.height
      );
      this.floor.addChild(sprite);
    }
  }


  async resize(tileSize, level) {
    const { widthInTiles, heightInTiles } = level.miniMap;
    const windowWidth = tileSize * widthInTiles;
    const windowHeight = tileSize * heightInTiles;

    // Resize the scene and all the children.
    this.floor.width = level.widthInTiles * tileSize;
    this.floor.height = level.heightInTiles * tileSize;

    // Use mask to clip the scene
    this.mask.clear();
    this.mask.rect(0, 0, windowWidth, windowHeight);
    this.mask.fill({ color: 0xffffff });
    this.scene.mask = this.mask;
  }
}
