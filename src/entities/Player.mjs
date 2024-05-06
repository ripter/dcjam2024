import { Object3D } from 'three';

import { dispatchAction } from '../actions/index.mjs';
import { Mob } from './Mob.mjs';
import { walkOne } from '../actions/walkOne.mjs';
import ThreeD from '../ThreeD/index.mjs';

const PLAYER_HEIGHT = 1.8;

export class Player extends Mob {
  constructor(config, level) {
    super(config, level);

    document.addEventListener('keydown', this);
    window.player = this; // for debugging
  }

  async init() {
    await super.init();
    const { tilePosition } = this;

    ThreeD.addToScene(this.model);
    // Move the Camera into our model.
    ThreeD.addCameraTo(this.model); 
    // Make sure the camera and the model are looking in the same direction.
    const lookPosition = this.positionInFront();
    const { x: lookX, y: lookY } = lookPosition;
    ThreeD.cameraLookAt(lookX, 1, lookY);
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