import { DIRECTION } from '../consts.mjs';

/**
 * Updates a sprite so that it faces a given direction.
 * @param {Sprite} sprite - The sprite to rotate
 * @param {DIRECTION} direction - The direction the sprite should face.
 */
export function rotateSpriteToDirection(sprite, direction) {
  switch (direction) {
    case DIRECTION.NORTH:
      sprite.rotation = 0;
      break;
    case DIRECTION.EAST:
      sprite.rotation = Math.PI / 2;
      break;
    case DIRECTION.SOUTH:
      sprite.rotation = Math.PI;
      break;
    case DIRECTION.WEST:
      sprite.rotation = 3 * Math.PI / 2;
      break;
    default:
    // nothing
  }
}