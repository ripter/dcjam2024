import { Vector2 } from 'three';

/**
 * Base class for all entities in the game.
 */
class Entity {
  constructor() {
    this.tilePosition = new Vector2();
  }
}