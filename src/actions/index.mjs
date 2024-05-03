// SINGLETON ALERT!!!! 
// This module is a singleton. functions exported work on a single instance of a Set object.
// This enables the Action functions to be used across the entire application.
const actionQueue = new Set();


/**
 * Generator function that yields each action in the action queue.
 * This function allows iterating over all actions using a `for...of` loop,
 * facilitating operations like logging or modifying actions in a sequential manner.
 *
 * @yields {Generator} Yields each action, which is a generator function.
 *
 * @example
 * // Example of using iterateActions to log each action
 * for (const action of iterateActions()) {
 *   console.log('Processing action:', action);
 * }
 */
export function* iterateActions() {
  for (const action of actionQueue) {
    yield action;
  }
}

/**
 * Adds an action to the action queue. 
 * @param {Generator} action - generator function that yields promises. 
 */
export function dispatchAction(action) {
  actionQueue.add(action);
}

/**
 * Removes an action from the action queue. 
 * @param {Generator} action - generator function that yields promises.
 */
export function deleteAction(action) {
  actionQueue.delete(action);
}

export function clearActions() {
  actionQueue.clear();
}
