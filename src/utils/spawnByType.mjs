import { snakeToCamel } from './snakeToCamel.mjs';

/**
 * Creates a new Entity Instance based on the typeIdentifier.
 * @param {string} typeIdentifier - entity-id. Used to determine the class to spawn. 
 * @param {object} config - config object specific to the entity type.
 * @param {Level} level - The current level object.
 * @returns 
 */
export async function spawnByType(typeIdentifier, config, level) {
    try {
        const EntityClass = await tryImportClassFromIdentifier(`entity-${typeIdentifier}`);
        if (!EntityClass) {
            throw new Error(`No class found for type ${typeIdentifier}`);
        }
        // Constructors can not be async, so call init method if it exists
        const instance = new EntityClass(config, level);
        if (typeof instance.init === 'function') {
            await instance.init();
        }
        return instance;
    } catch (error) {
        console.error(`Failed to spawn type ${typeIdentifier}:`, error);
        throw error; // Re-throw or handle as needed
    }
}

// Utility to try importing different class names based on decreasing specificity
async function tryImportClassFromIdentifier(baseIdentifier) {
  let parts = baseIdentifier.split('-');
  while (parts.length > 0) {
      let currentIdentifier = parts.join('-');
      let className = snakeToCamel(currentIdentifier);
      let moduleName = `/src/entities/${className}.mjs`;
      console.log('tryImportClassFromIdentifier', moduleName, className);
      try {
          const module = await import(moduleName);
          if (module[className]) {
              return module[className];
          }
      } catch (error) {
          // Log errors if you need to track failures for each module import
          console.log(`Failed to import ${moduleName}:`, error);
      }
      parts.pop(); // Reduce specificity by removing the last segment
  }
  throw new Error(`No valid class found for base type ${baseIdentifier}`);
}
