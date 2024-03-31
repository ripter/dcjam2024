import { Vector3 } from 'three';
import { loadModel } from './loadModel.mjs';


// Default values for a tile definitions
const DEFAULT_DEF_VALUES = {
  model: null,
  sprite: null,
  impassable: false,
}

/**
 * The Level is the main data container for an active game.
 * It contains the map, set pieces, and definitions for the game.
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
    // Make sure all the tileIds are strings.
    this.floorMap = config.floorMap.map(tileId => tileId.toString());
    // Create a Map to store the asset definitions
    this.definitions = new Map();
    // Entities that changed during the tick are stored here. 
    this.dirtyEntities = new Set();
  }

  get widthInTiles() {
    return this.#config.gridWidth;
  }
  get heightInTiles() {
    return this.#config.gridHeight;
  }

  get entities() {
    return this.#config.entities;
  }

  getEntitiesByType(type) {
    return this.entities.filter(entity => entity.type === type);
  }
  getRandomEntityByType(type) {
    const entities = this.getEntitiesByType(type);
    return entities[Math.floor(Math.random() * entities.length)];
  }

  indexToXY(index) {
    const { widthInTiles: width } = this;
    const x = index % width;
    const y = Math.floor(index / width);
    return { x, y };
  }

  /**
   * Ends the Tick and clears the dirty entities.
   */
  endTick() {
    this.dirtyEntities.clear();
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
    const loadPromises = defIds.map(async (key) => {
      const assetDefinition = defs[key];
      const model = assetDefinition.model && await loadModel(assetDefinition.model);
      this.definitions.set(key.toString(), {
        // Default Values
        ...DEFAULT_DEF_VALUES,
        // Config Values
        ...assetDefinition,
        // Model Values
        model,
      });
    });

    // Wait for all models to load
    return await Promise.all(loadPromises);
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
