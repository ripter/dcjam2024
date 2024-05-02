import { Entity } from './Entity.mjs';

export class EntityPlayer extends Entity {
  constructor(config, level) {
    super(config, level);
    console.log('EntityPlayer constructor', config);
    document.addEventListener('keydown', this);
  }

  testPlayer() {
    return true;
  }

  handleEvent(event) {
    switch (event.key) {
      // Forward in the direction the camera is facing
      case 'ArrowUp':
      case 'w':
        console.log('Move Forward');
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