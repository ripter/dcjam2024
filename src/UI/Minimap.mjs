import { Vector2 } from 'three';
import { 
  Container,
  Graphics,
} from '../../libs/pixi.min.mjs';
import { loadSprite } from './loadSprite.mjs';
import { rotateSpriteToDirection } from './rotateSpriteToDirection.mjs';

export class Minimap {
  #level;
  constructor(level) {
    this.#level = level;
    this.tileSize = 32;
    this.scene = new Container(); // root container for the minimap
    this.background = new Graphics(); // background/chrome for the minimap
    this.tileMap = new Container(); // container for the minimap tiles
    this.mask = new Graphics(); // mask for the minimap
    this.entities = new Container(); // container for the entities
    this.scene.addChild(this.mask);
    this.scene.addChild(this.tileMap);
    this.scene.addChild(this.background);
    this.scene.addChild(this.entities);
  }

  get position() {
    return this.scene.position;
  }

  async init() {
    // Create Sprites for each floor tile
    const loadPromises = this.#level.floorMap.map(async (tileId, index) => {
      const definition = this.#level.definitions.get(tileId);
      const { x, y } = this.#level.indexToXY(index);
      const sprite = await loadSprite(definition.sprite, this.tileSize);
      sprite.tilePosition = new Vector2(x, y);
      this.tileMap.addChild(sprite);
      return sprite;
    });

    // Wait for all models to load
    return await Promise.all(loadPromises);
  }


  async update(entity) {
    const { x, y } = entity.tilePosition;

    // Entities are drawn on the minimap as Sprites
    if (entity.type.includes('entity')) {
      if (entity.sprite == null) {
        const asset = this.#level.definitions.get(entity.assetId);
        entity.sprite = await loadSprite(asset.sprite, this.tileSize);
        this.entities.addChild(entity.sprite);
      }
      // Move the Sprite
      entity.sprite.position.set(
        x * this.tileSize,
        y * this.tileSize
      );
      // entity.sprite.tilePosition = new Vector2(x, y);
      // Rotate the Sprite
      rotateSpriteToDirection(entity.sprite, entity.direction);
    }

    // If the entity is the player, update the minimap position
    if (entity.type === 'entity-player') {
      this.centerOnPosition(entity.sprite.position.x, entity.sprite.position.y);
    }

  }


  centerOnPosition(x, y) {
    const centerX = this.mask.width / 2;
    const centerY = this.mask.height / 2;
    // Calculate the offset to keep the player in the center of the minimap
    const offsetX = centerX - x;
    const offsetY = centerY - y;

    // Apply the offset to the tileMap position
    // This effectively moves the tileMap in the opposite direction of the player's movement,
    // keeping the player centered on the minimap.
    this.tileMap.position.set(
      offsetX,
      offsetY
    );
    this.entities.position.set(
      offsetX,
      offsetY
    );
  }

  /**
   * Resizes the minimap.
   * @param {number} width 
   * @param {number} height 
   */
  resize(width, height) {
    const widthInTiles = 5;
    const tileSize = Math.ceil(Math.min(width, height) / widthInTiles);
    this.tileSize = tileSize;

    // Resise the tiles
    this.tileMap.children.forEach((sprite) => {
      const { x, y } = sprite.tilePosition;
      sprite.width = tileSize;
      sprite.height = tileSize;
      sprite.position.set(x * tileSize, y * tileSize);
    });
    
    // Resize the Entities
    this.entities.children.forEach((sprite) => {
      const { x, y } = sprite.tilePosition;
      sprite.width = tileSize;
      sprite.height = tileSize;
      sprite.position.set(x * tileSize, y * tileSize);
    });

    // Resize the background
    this.background.clear();
    this.background.rect(0, 0, width, height);
    this.background.stroke({ width: 1, color: 0xffffff });

    // Resize the mask
    this.mask.clear();
    this.mask.rect(0, 0, width, height);
    this.mask.fill({ color: 0xff00ff });
    this.tileMap.mask = this.mask;
  }


}
