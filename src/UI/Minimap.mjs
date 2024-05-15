import { Container, Graphics } from '../../libs/pixi.min.mjs';
import { DEFAULT_TILE_SIZE } from '../consts.mjs';
import { loadSprite } from './loadSprite.mjs';

export class Minimap {
  constructor() {
    this.scene = new Container();
  }

  async init() {
    this.scene.position.set(0, 0);
  }

  async loadLevel(level) {
    // Draw the floor map
    for (const floorTile of level.iterateFloor()) {
      const { spriteUrl } = floorTile;
      if (!spriteUrl) {
        continue;
      }
      const sprite = await loadSprite(spriteUrl, DEFAULT_TILE_SIZE);
      sprite.position.set(floorTile.position.x * DEFAULT_TILE_SIZE, floorTile.position.y * DEFAULT_TILE_SIZE);
      this.scene.addChild(sprite);
    }
  }
}
