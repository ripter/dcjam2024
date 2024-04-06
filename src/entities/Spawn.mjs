import { Vector2 } from 'three';

export class Spawn {
  #level;

  constructor(config, level) {
    this.#level = level;
    Object.assign(this, {
      ...config,
      direction: config.direction ?? DIRECTION.NORTH,
    });
    // Convert the tile position to a Vector2
    this.tilePosition = new Vector2(config.x, config.y);
    delete this.x;
    delete this.y;
  }
}