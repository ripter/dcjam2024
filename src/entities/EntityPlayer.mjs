import { Entity } from './Entity.mjs';
import { walkOne } from '../actions/walkOne.mjs';
import { dispatchAction } from '../actions/actionQueue.mjs';

export class EntityPlayer extends Entity {
  constructor(config, level) {
    super(config, level);
    document.addEventListener('keydown', this);
  }

  handleEvent(event) {
    switch (event.key) {
      // Forward in the direction the camera is facing
      case 'ArrowUp':
      case 'w':
        console.log('Move Forward');
        dispatchAction(walkOne(this, 'north'));
        break;
      // Backward from the direction the camera is facing
      case 'ArrowDown':
      case 's':
        console.log('Move Backward');
        break;
      // Strafe left
      case 'ArrowLeft':
      case 'a':
        console.log('Strafe Left');
        break;
      // Strafe right
      case 'ArrowRight':
      case 'd':
        console.log('Strafe Right');
        break;
      // Rotate left
      case 'q':
        console.log('Rotate Left');
        break;
      // Rotate right
      case 'e':
        console.log('Rotate Right');
        break;
    }
  }

}