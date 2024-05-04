# Entities

What the heck are Entities? Entities are objects in the game. Next Qustion!

Entities are Classes (or Subclasses of Entity) that have functionality in the game world. If you know E.C.S. modle, this is not the same kind of Entity. In ECS, the Entity is just an ID or refrence, all logic happens in the Sytems. This is closer to GoDot in that the Entity Classes have the methods to perform work instead of setting properties and waiting for someone else to do the work.

## Entity API
* addEntity()
* removeEntity()
* clearEntites()
* iter