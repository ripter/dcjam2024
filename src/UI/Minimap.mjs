import { Container, Graphics } from '../../libs/pixi.min.mjs';

export class Minimap {
  constructor() {
    this.scene = new Container();
  }

  async init() {
  }

  async loadLevel(level) {
    // Draw the floor map
    level.floorMap.forEach((tileId, index) => {
      console.log('tileId:', tileId, 'index:', index);
    });
  }
}