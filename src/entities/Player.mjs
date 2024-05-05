import { Group } from 'three';

import { dispatchAction } from '../actions/index.mjs';
import { Mob } from './Mob.mjs';
import { walkOne } from '../actions/walkOne.mjs';
import ThreeD from '../ThreeD/index.mjs';

export class Player extends Mob {
  constructor(config, level) {
    super(config, level);

    // Player does not have a model, instead it is a camera.
    this.model = new Group();
    ThreeD.addToScene(this.model);
    // Move the Camera into our model.
    ThreeD.addCameraTo(this.model); 

    document.addEventListener('keydown', this);
    window.player = this; // for debugging
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