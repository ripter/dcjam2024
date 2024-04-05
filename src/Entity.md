
Entity Ids follow a naming pattern of root-child-leaf structure so checks can easy check at different granulatirties. Example: `entity` becomes an `Entity()` while `entity-player` becomes `EntityPlayer` which extends from the `Entity` class. This allows update and other methods to handle all entities, or a specific type of entity.

# Entities

Entities are objects that move around on the game board and rendered to the screen.

* `entity`
  * Base entity that can move around.
* `entity-player`
  * Entity for the current player.
* `spawn-player`
  * Location the player could spawn.
  * When there are several spawn-player entities, the player will spawn randomly at a location.