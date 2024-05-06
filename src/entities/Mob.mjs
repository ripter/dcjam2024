import { Object3D } from 'three';

import { Entity } from './Entity.mjs';
import { loadSprite } from '../UI/loadSprite.mjs';
import { DEFAULT_TILE_SIZE } from '../consts.mjs';
import UI from '../UI/index.mjs';
import threeD from '../ThreeD/index.mjs';

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
    if (config.spriteUrl) {
      this.sprite = await UI.spawnEntity(config.spriteUrl);
    }
    // Create a 3D model for the MOB.
    if (config.modelUrl) {
      this.model = await threeD.spawnModel(config.modelUrl);
    } else {
      this.model = new Object3D();
    }


    this.setPosition(this.tilePosition.x, this.tilePosition.y);
    this.setDirection(config.direction);
  }

  setPosition(x, y) {
    super.setPosition(x, y);
    if (this.sprite) {
      this.sprite.position.set(x * DEFAULT_TILE_SIZE, y * DEFAULT_TILE_SIZE);
    }
    if (this.model) {
      this.model.position.set(x, 0, y);
    }
  }

  setDirection(direction) {
    super.setDirection(direction);
    const lookPosition = this.positionInFront();
    const { x: lookX, y: lookY } = lookPosition;
    this.model.lookAt(lookX, 0, lookY);
  }
}