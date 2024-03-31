import { Camera, Vector3 } from '/libs/three.module.js';
import { Entity } from './Entity.mjs';
import { Level } from './Level.mjs';
import { rotateDirection, DIRECTION } from './consts.mjs';

/**
 * Main class for handling user input.
 */
export class UserInput {
  #level;

  /**
   * Creates a new Player in the Level.
   * @param {Camera} camera 
   * @param {Level} level 
   */
  constructor(level) {
    this.#level = level;
    document.addEventListener('keydown', this);
  }

  async init() {
    const spawnPoint = this.#level.getRandomEntityByType('spawn-player');
    const { x, y } = spawnPoint.tilePosition;

    // Create a Player Entity
    const player = new Entity({
      type: 'player',
      x, y,
      direction: spawnPoint.direction,
    });
    this.#level.addEntity(player);
  }


  handleEvent(event) {
    const player = this.#level.getEntityByType('player');
    let newPosition = null;
    // const facindDirection = player.direction;
    // const 

    // const camera = this.#camera
    // const { position } = this;
    // // Clone the current position so we don't alter the camera's actual position
    // const newPosition = position.clone();
    // // Get the direction the camera is facing
    // const direction = new Vector3();
    // camera.getWorldDirection(direction);

    switch (event.key) {
      // Forward in the direction the camera is facing
      case 'ArrowUp':
      case 'w':
        console.log('Forward in', player.direction)
        newPosition = player.positionInFront();
        break;
      // Backward from the direction the camera is facing
      case 'ArrowDown':
      case 's':
        console.log('Backward in', player.direction)
        // player.direction = DIRECTION.SOUTH;
        newPosition = player.positionBehind();
        // if ([DIRECTION.NORTH, DIRECTION.SOUTH].includes(player.direction)) {
        //   newPosition.y -= 1;
        // } else if ([DIRECTION.EAST, DIRECTION.WEST].includes(player.direction)) {
        //   newPosition.x -= 1;
        // }
        break;
      // Strafe left
      case 'ArrowLeft':
      case 'a':
        newPosition = player.tilePosition;
        newPosition.x -= 1;
        break;
      // Strafe right
      case 'ArrowRight':
      case 'd':
        newPosition = player.tilePosition;
        newPosition.x += 1;
        break;
      // Rotate left
      case 'q':
        // Rotate left
        player.direction = rotateDirection(player.direction, -1);
        console.log('new direction', player.direction)
        break;
      // Rotate right
      case 'e':
        // Rotate right
        player.direction = rotateDirection(player.direction, 1);
        console.log('new direction', player.direction)
        break;
    }

    if (newPosition) {
      console.log('New Position', newPosition)
      player.tilePosition = newPosition;
      event.preventDefault();
    }

    // Round the new position to the nearest whole number
    // newPosition.x = Math.round(newPosition.x);
    // newPosition.z = Math.round(newPosition.z);
    // Attempt to move to the new position.
    // this.attemptMove(newPosition);
  }

  /**
   * Attempt to move the Player to the new position.
   * Will stop if moving to an impassable position.
   * @param {Vector3} newPosition 
   */
  attemptMove(newPosition) {
    // const level = this.#level;
    // // Check if the new positon is impassable
    // const tile = level.getTileBy3DPosition(newPosition);
    // // Nope, can't move there. We are tile-locked.
    // if (!tile) { return; }
    // // Tile not passable, can't move there.
    // if (tile.impassable) { return; }

    // // Move to the new position.
    // return this.position.copy(newPosition);
  }
}
