import { Container, Graphics } from '../../libs/pixi.min.mjs';
import { loadSprite } from './loadSprite.mjs';

export class Minimap {
  constructor() {
    this.scene = new Container();
    this.mask = new Graphics();
    this.scene.addChild(this.mask);
  }

  async init() {
    // this.scene.position.set(0, 0);
    // this.mask.clear();
    // this.mask.rect(0, 0, width, height);
    // this.mask.fill({ color: 0xff00ff });
    // this.scene.mask = this.mask;
  }

  async loadLevel(level) {
    const { tileSize } = level.minimap;
    // Draw the floor map
    for (const floorTile of level.iterateFloor()) {
      const { spriteUrl } = floorTile;
      if (!spriteUrl) {
        continue;
      }
      const sprite = await loadSprite(spriteUrl, tileSize);
      sprite.position.set(floorTile.position.x * tileSize, floorTile.position.y * tileSize);
      this.scene.addChild(sprite);
    }
  }

  async resize(level) {
    const { tileSize, widthInTiles, heightInTiles } = level.minimap;
    const width = tileSize * widthInTiles;
    const height = tileSize * heightInTiles;

    this.mask.clear();
    this.mask.rect(0, 0, width, height);
    this.mask.fill({ color: 0xffffff });
    this.scene.mask = this.mask;
  }
}
