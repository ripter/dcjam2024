import { Camera } from '/libs/three.module.js';
import { Entity } from './Entity.mjs';
import { Level } from './Level.mjs';

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

    switch (event.key) {
      // Forward in the direction the camera is facing
      case 'ArrowUp':
      case 'w':
        event.preventDefault();
        player.moveForward();
        break;
      // Backward from the direction the camera is facing
      case 'ArrowDown':
      case 's':
        event.preventDefault();
        player.moveBackward();
        break;
      // Strafe left
      case 'ArrowLeft':
      case 'a':
        event.preventDefault();
        player.moveLeft();
        break;
      // Strafe right
      case 'ArrowRight':
      case 'd':
        event.preventDefault();
        player.moveRight();
        break;
      // Rotate left
      case 'q':
        event.preventDefault();
        player.rotateLeft();
        break;
      // Rotate right
      case 'e':
        event.preventDefault();
        player.rotateRight();
        break;
    }
  }
}
