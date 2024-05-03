import { Vector2 } from 'three';
import { loadModel } from './Engine/loadModel.mjs';
import { spawnByType } from './utils/spawnByType.mjs';
import { addEntity } from './entities/index.mjs';

// Default values for a tile definitions
const DEFAULT_DEF_VALUES = {
  model: null,
  sprite: null,
  impassable: false,
}

/**
 * Source of truth for the game state.
 * Create a new level from a config file.
 * ```
 *     const level = await Level.Load(`/pathToLevel/config.json`);
 * ```
 * 
 * Use the query methods to find entities in the level.
 * ```
 *    const player = level.getEntityByType('player');
 *    const enemies = level.getEntitiesByType('enemy');
 * ```
 */
export class Level {
  #config;
  // #entities;

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
    // this.#entities = [];
    // Make sure all the tileIds are strings.
    this.floorMap = config.floorMap.map(tileId => tileId.toString());
    // Create a Map to store the asset definitions
    this.definitions = new Map();
    // Entities that changed during the tick are stored here. 
    this.dirtyEntities = new Set();
    this.addedEntities = new Set();
    this.removedEntities = new Set();
  }

  get widthInTiles() {
    return this.#config.gridWidth;
  }
  get heightInTiles() {
    return this.#config.gridHeight;
  }

  // getEntities() {
  //   return [...this.#entities];
  // }
  // getEntitiesByType(type) {
  //   return this.#entities.filter(entity => entity.type === type);
  // }
  // getRandomEntityByType(type) {
  //   const entities = this.getEntitiesByType(type);
  //   return entities[Math.floor(Math.random() * entities.length)];
  // }
  // getEntityByType(type) {
  //   return this.getEntitiesByType(type)[0] ?? null;
  // }


  // addEntity(entity) {
  //   entity.level = this; // Set the circular reference.
  //   this.#entities.push(entity);
  //   this.addedEntities.add(entity);
  // }
  // removeEntity(entity) {
  //   delete entity.level; // Remove the circular reference.
  //   const index = this.#entities.indexOf(entity);
  //   if (index >= 0) {
  //     this.#entities.splice(index, 1);
  //   }
  //   this.removedEntities.add(entity);
  // }
  // setDirty(entity) {
  //   this.dirtyEntities.add(entity);
  // }

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
   * Ends the Tick and clears the dirty entities.
   */
  endTick() {
    this.dirtyEntities.clear();
    this.addedEntities.clear();
    this.removedEntities.clear();
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

    // Wait for all models to load
    // await Promise.all(loadModelsPromises);

    // Hydrate the entities from the config
    const loadEntitiesPromises = this.#config.entities.map(async (config) => {
      try {
        const entity = await spawnByType(config.type, config, this);
        addEntity(entity);
        return entity;
      } catch (error) {
        console.error(`Failed to spawn entity:`, error);
        return null;
      }
    });
    // await Promise.all(loadEntitiesPromises);
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
