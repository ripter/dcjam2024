/**
 * Creates a new Entity Instance based on the typeIdentifier.
 * @param {string} className - File/Class name of the entity to spawn. If the class has an init() method, it will be called asynchonously.
 * @param {object} config - Config object specific to the entity type.
 * @param {Level} level - The current level object.
 * @returns {Entity} The new entity instance.
 */
export async function spawnEntityByClassName(className, config, level) {
	try {
		const moduleName = `/src/entities/${className}.mjs`;
		const module = await import(moduleName);
		if (!module[className]) {
			throw new Error(`Class ${className} not found in ${moduleName}`);
		}
		const instance = new module[className](config, level);
		if (typeof instance.init === 'function') {
			await instance.init();
		}
		return instance;
	} catch (error) {
		console.error(`Failed to spawn entity of type ${className}: ${error.message}`, error);
		throw new Error(`An error occurred while spawning the entity. Ensure the file '${className}.mjs' exists in '/src/entities/' with the class '${className}'.`);
	}
}
