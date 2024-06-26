import { Vector2 } from 'three';
import { addEntity } from './entities/index.mjs';
import { loadModel } from './ThreeD/loadModel.mjs';
import { spawnEntityByClassName } from './entities/spawnEntityByClassName.mjs';

// Default values for a tile definitions
const DEFAULT_DEF_VALUES = {
  model: null,
  sprite: null,
  impassable: false,
}

/**
 * Create a new level from a config file.
 * floorMap: Array of tileIds that define the floor of the level. Includes walls, floors, other static objects.
 */
export class Level {
  #config;


  /**
   * Loads a level from the given URL.
   * @param {string} url 
   */
  constructor(config) {
    this.#config = {
      ...config,
      gridWidth: parseInt(config.gridWidth, 10),
      gridHeight: parseInt(config.gridHeight, 10),
    };
    // Convert the floorMap to an array of strings
    this.floorMap = this.#config.floorMap.map(tileId => tileId.toString());
    // Configure the minimap
    this.miniMap = {
      widthInTiles: config.minimapWidth,
      heightInTiles: config.minimapHeight,
      tileSize: 24,
    };
    this.definitions = new Map(); // populated by loadAssets
  }

  get widthInTiles() {
    return this.#config.gridWidth;
  }
  get heightInTiles() {
    return this.#config.gridHeight;
  }


  *iterateFloor() {
    for (let idx=0; idx < this.floorMap.length; idx++) {
      const tileId = this.floorMap[idx];
      const definition = this.definitions.get(tileId);
      const position = this.indexToXY(idx);
      yield {
        ...definition,
        tileId,
        tileIdx: idx,
        position,
      };
    }
  }

  /**
   * Converts an XY coordinate to an index. 
   * @param {number} index 
   * @returns {Vector2} 
   */
  indexToXY(index) {
    const { widthInTiles: width } = this;
    const x = index % width;
    const y = Math.floor(index / width);
    return new Vector2(x, y);
  }

  /**
   * Asset Definitions from the config are hydrated with default values.
   * Assets used by Three.JS are loaded and cached here.
   * Assets used by PIXI.js are loaded and cached in the PIXI loader.
   */
  async loadAssets() {
    const { defs } = this.#config;
    const defIds = Object.keys(defs);

    // Create an array of promises for loading all the models
    const loadModelsPromises = defIds.map(async (key) => {
      const assetDefinition = defs[key];
      const model = assetDefinition.model && await loadModel(assetDefinition.model);
      // We don't load sprite here because PIXI has it's own loader.
      // const sprite = assetDefinition.sprite && await loadSprite(assetDefinition.sprite, DEFAULT_TILE_SIZE);
      this.definitions.set(key.toString(), {
        // Default Values
        ...DEFAULT_DEF_VALUES,
        // Config Values
        ...assetDefinition,
        // 3D and 2D assets
        model,
        // sprite,
      });
    });


    // Hydrate the entities from the config
    const loadEntitiesPromises = this.#config.entities.map(async (config) => {
      try {
        const entity = await spawnEntityByClassName(config.className, config, this);
        addEntity(entity);
        return entity;
      } catch (error) {
        console.error(`Failed to spawn entity:`, error);
        return null;
      }
    });

    delete this.#config.entities;
    await Promise.all([...loadModelsPromises, ...loadEntitiesPromises]);
  }


  /**
   * Loads the Level from a config file.
   * @param {string} url 
   * @returns 
   */
  static async Load(url) {
    try {
      // Load the config from the given URL and create the Level.
      const response = await fetch(url);
      const data = await response.json();
      const level = new Level(data);
      
      // Load the assets for the level
      await level.loadAssets();
      return level;
    }
    catch (error) {
      console.error('Failed to load level', error);
    }
  }
}
