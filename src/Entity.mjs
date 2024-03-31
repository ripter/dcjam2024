import { Vector2 } from 'three';
import { DIRECTION } from './consts.mjs';

/**
 * Base class for all entities in the game.
 */
export class Entity {
  constructor(config) {
    this.direction = config.direction || DIRECTION.NORTH;
    this.tilePosition = new Vector2(config.x, config.y);
    this.type = config.type;
  }

  /**
   * Returns the position in front of the entity.
   * @returns {Vector2}
   */
  positionInFront() {
    // console.log('positionInFront', this.tilePosition, this.direction)
    const { x, y } = this.tilePosition;
    switch (this.direction) {
      case DIRECTION.NORTH: 
        return new Vector2(x, y+1);
      case DIRECTION.SOUTH: 
        return new Vector2(x, y-1);
      case DIRECTION.EAST: 
        return new Vector2(x-1, y);
      case DIRECTION.WEST: 
        return new Vector2(x+1, y);
      default: 
        return new Vector2(x, y);
    }
  }

  positionBehind() {
    // console.log('positionBehind', this.tilePosition, this.direction)
    const { x, y } = this.tilePosition;
    switch (this.direction) {
      case DIRECTION.NORTH: 
        return new Vector2(x, y-1);
      case DIRECTION.SOUTH: 
        return new Vector2(x, y+1);
      case DIRECTION.EAST: 
        return new Vector2(x+1, y);
      case DIRECTION.WEST: 
        return new Vector2(x-1, y);
      default: 
        return new Vector2(x, y);
    }
  }

}