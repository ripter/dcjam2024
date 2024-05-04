import { Entity } from './Entity.mjs';
import { loadSprite } from '../UI/loadSprite.mjs';
import { DEFAULT_TILE_SIZE } from '../consts.mjs';
import UI from '../UI/index.mjs';

/**
 * Mob (or Moving Object) class.
 * Keeps its position in 3D and 2D space in sync with entity position.
 * Config:
 * {
 *   spriteUrl: 'path/to/sprite.png', // Any image format supported by PIXI.js
 *   modelUrl: 'path/to/model.gltf', // Only GLTF models are supported
 * } 
 */
export class Mob extends Entity {
  constructor(config, level) {
    super(config, level);
    // Mob specific properties
    this.sprite = null;
    this.model = null;
  }

  async init() {
    await super.init();
    const { config } = this;

    // Create a UI sprite for the MOB.
    if (!config.spriteUrl) {
      throw new Error('Mob requires a spriteUrl in the config.');
    }
    this.sprite = await UI.spawnEntity(config.spriteUrl);
    if (!this.sprite) {
      throw new Error('Failed to create sprite for Mob.');
    }
  }

}