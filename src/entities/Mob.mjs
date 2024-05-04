import { Entity } from './Entity.mjs';
import { loadSprite } from '../UI/loadSprite.mjs';
import { DEFAULT_TILE_SIZE } from '../consts.mjs';

/**
 * Mob (or Moving Object) class.
 * Keeps its position in 3D and 2D space in sync with entity position.
 */
export class Mob extends Entity {
  constructor(config, level) {
    super(config, level);
    this.speed = 1;
  }

  async init() {
    await super.init();
    const { config } = this;
    const sprite = await loadSprite(config.sprite, DEFAULT_TILE_SIZE);
    this.sprite = sprite;
  }

}