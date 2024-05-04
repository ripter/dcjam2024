// SINGLETON ALERT!!!! 
// This module is a singleton. functions exported work on a single instance of a Set object.
// This enables the Entity functions to be used across the entire application.
// This is an alternative to passing the Entity Queue around as a parameter (aka Dependency Injection).
const entityQueue = new Set();
window.entityQueue = entityQueue;

/**
 * Adds an entity to the entity queue.
 * This function allows for entities to be added to a central managed queue,
 * which can be used for processing or tracking entities throughout the game.
 * 
 * @param {Entity} entity - The entity object to add to the queue.
 * 
 * @example
 * // Example of adding a new entity to the queue
 * const newEntity = new Entity(config);
 * addEntity(newEntity);
 */
export function addEntity(entity) {
  entityQueue.add(entity);
}

/**
 * Removes an entity from the entity queue.
 * This function allows for the removal of specific entities from the central
 * managed queue, which is useful for cleaning up or when entities are no longer
 * needed in the game.
 * 
 * @param {Entity} entity - The entity to be removed from the queue. This should
 *                          match an existing entity in the queue.
 * 
 * @example
 * // Example of removing an entity from the queue
 * const entityToRemove = new Entity(config);
 * removeEntity(entityToRemove);
 */
export function removeEntity(entity) {
  entityQueue.delete(entity);
}

/**
 * Clears all entities from the entity queue.
 * This function is used to completely empty the entity queue, which might be necessary
 * during game resets, level changes, or when clearing memory before loading new content.
 * 
 * @example
 * // Example of clearing all entities from the queue
 * clearEntities();
 */
export function clearEntities() {
  entityQueue.clear();
}

/**
 * Generator function that yields each Entity in the entityQueue.
 * This function allows iterating over all entities using a `for...of` loop.
 *
 * @yields {Generator} Yields each Entity in the Queue.
 *
 * @example
 * // Example of using iterateEntities to log each action
 * for (const entity of iterateEntities()) {
 *   console.log('Processing Entity:', entity);
 * }
 */
export function* iterateEntities() {
  for (const entity of entityQueue) {
    yield entity;
  }
}


/**
 * Iterates over entities of a specific type in the entity queue.
 * This generator function yields entities that match the specified type, allowing for
 * easy filtering and processing of entities based on their type attribute.
 * 
 * @param {string} type - The type of the entities to filter by. This should match the
 *                        `type` property of the entities in the queue.
 * 
 * @yields {Entity} Yields entities that are of the specified type.
 * 
 * @example
 * // Example of using iterateEntitiesByType to log each entity of type 'monster'
 * for (const entity of iterateEntitiesByType('monster')) {
 *   console.log('Found a monster:', entity);
 * }
 */
export function* iterateEntitiesByType(type) {
  for (const entity of entityQueue) {
    if (entity.type === type) {
      yield entity;
    }
  }
}


/**
 * Retrieves a random entity of a specified type from the entity queue.
 * This function collects all entities of the given type using `iterateEntitiesByType`, 
 * converts them into an array, and then selects one at random. If no entities of the
 * specified type are found, it returns null.
 * 
 * @param {string} type - The type of the entities to filter and randomly select from.
 *                        This should correspond to the `type` property of the entities.
 * 
 * @returns {Entity|null} Returns a randomly selected entity of the specified type, or null if no entities are found.
 * 
 * @example
 * // Example of using getRandomEntityByType to get a random entity of type 'spawnpoint'
 * const spawnPoint = getRandomEntityByType('spawnpoint');
 * if (spawnPoint) {
 *   console.log('spawnPoint:', spawnPoint);
 * } else {
 *   console.log('No spawnPoints found.');
 * }
 */
export function getRandomEntityByType(type) {
  const entities = Array.from(iterateEntitiesByType(type));
  return entities.length > 0 ? entities[Math.floor(Math.random() * entities.length)] : null;
}


/**
 * Retrieves the first entity of a specified type from the entity queue.
 * This function uses the `iterateEntitiesByType` generator to go through entities
 * and returns the first one that matches the specified type. If no entities match
 * the specified type, it returns null.
 * 
 * @param {string} type - The type of the entities to search for. This should correspond
 *                        to the `type` property of the entities in the queue.
 * 
 * @returns {Entity|null} Returns the first entity of the specified type if one exists, 
 *                        otherwise returns null if no matching entity is found.
 * 
 * @example
 * // Example of using getFirstEntityByType to find the first entity of type 'player'
 * const firstPlayer = getFirstEntityByType('player');
 * if (firstPlayer) {
 *   console.log('First player found:', firstPlayer);
 * } else {
 *   console.log('No player entities found.');
 * }
 */
export function getFirstEntityByType(type) {
  for (const entity of iterateEntitiesByType(type)) {
    return entity;  // Returns the first matching entity
  }
  return null;  // Return null if no entities match
}

