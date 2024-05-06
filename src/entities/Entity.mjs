import { Vector2 } from 'three';
import { DIRECTION } from '../consts.mjs';
import { rotateDirection } from '../consts.mjs';
import { loadSprite } from '../UI/loadSprite.mjs';


/**
 * Base class for all entities in the game.
 * Entities are objects that exist in the game world and can move around on the level.
 * Entities and their subclasses are spawned from a config object, a cascading object starting with Entity.
 * Config:
 *  {
 *    assetId: 'player', // id from the level definitions.
 *    x: 0,
 *    y: 0,
 *    direction: DIRECTION.NORTH,
 *  }
 */
export class Entity {
  #level;
  #assetId;
  #config;

  constructor(config, level) {
    this.#level = level;
    this.#assetId = config.assetId;
    // Object.assign(this, {
    //   ...config,
    //   direction: config.direction ?? DIRECTION.NORTH,
    // });
    this.#config = config;

    // Convert the tile position to a Vector2
    this.tilePosition = new Vector2(config.x, config.y);
    // delete this.x; // Remove the x property since we have a Vector2
    // delete this.y; // Remove the y property since we have a Vector2
    // delete this.assetId; // Remove the assetId property since we have a #assetId
  }

  /**
   * Initializes the entity.
   * This follows the same pattern as PIXI.js by using a init method,
   * and works well with the async/await pattern.
   */
  async init() {
    const { config } = this;

    // if (config.sprite) {
    //   const sprite = await loadSprite(config.sprite, DEFAULT_TILE_SIZE);
    //   this.sprite = sprite;
    // }
  }


  /**
   * Returns the asset definition for the entity.
   * This is defined in the level definitions ("defs" in the config)
   * @returns {Object}
   */
  get config() {
    return this.#config;
  }


  // Mark the entity as dirty so it will be updated in the next tick.
  // markDirty() {
  //   this.#level.dirtyEntities.add(this);
  // }

  setPosition(x, y) { 
    this.tilePosition.set(x, y);
  }

  setDirection(direction) {
    this.direction = direction;
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
  /**
   * Returns the position to the right of the entity.
   * @returns {Vector2}
   */
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

  /**
   *  Returns the position to the left of the entity.
   * @returns {Vector2}
   */
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