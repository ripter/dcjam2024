import { Vector2 } from 'three';
import { DIRECTION } from './consts.mjs';
import { rotateDirection } from './consts.mjs';

/**
 * Base class for all entities in the game.
 */
export class Entity {
  #level;

  constructor(config) {
    this.#level = null;
    this.direction = config.direction || DIRECTION.NORTH;
    this.tilePosition = new Vector2(config.x, config.y);
    this.type = config.type;
  }

  // Level is a circular reference, so we need to set it after the constructor.
  // it gets set when the entity is added to the level.
  set level(level) {
    this.#level = level;
  }

  markDirty() {
    this.#level.dirtyEntities.add(this);
  }


  moveForward() {
    const newPosition = this.positionInFront();
    this.tilePosition.copy(newPosition);
    this.markDirty();
  }
  moveBackward() {
    const newPosition = this.positionBehind();
    this.tilePosition.copy(newPosition);
    this.markDirty();
  }
  moveLeft() {
    const newPosition = this.positionToTheLeft();
    this.tilePosition.copy(newPosition);
    this.markDirty();
  }
  moveRight() {
    const newPosition = this.positionToTheRight();
    this.tilePosition.copy(newPosition);
    this.markDirty();
  }

  rotateRight() {
    this.direction = rotateDirection(this.direction, 1);
    this.markDirty();
  }
  rotateLeft() {
    this.direction = rotateDirection(this.direction, -1);
    this.markDirty();
  }


  /**
   * Returns the position in front of the entity.
   * @returns {Vector2}
   */
  positionInFront() {
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
  /**
   * Returns the position behind the entity.
   * @returns {Vector2}
   */
  positionBehind() {
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

  positionToTheRight() {
    const { x, y } = this.tilePosition;
    switch (this.direction) {
      case DIRECTION.NORTH: 
        return new Vector2(x+1, y);
      case DIRECTION.SOUTH: 
        return new Vector2(x-1, y);
      case DIRECTION.EAST: 
        return new Vector2(x, y+1);
      case DIRECTION.WEST: 
        return new Vector2(x, y-1);
      default: 
        return new Vector2(x, y);
    }
  }

  positionToTheLeft() {
    const { x, y } = this.tilePosition;
    switch (this.direction) {
      case DIRECTION.NORTH: 
        return new Vector2(x-1, y);
      case DIRECTION.SOUTH: 
        return new Vector2(x+1, y);
      case DIRECTION.EAST: 
        return new Vector2(x, y-1);
      case DIRECTION.WEST: 
        return new Vector2(x, y+1);
      default: 
        return new Vector2(x, y);
    }
  }

}