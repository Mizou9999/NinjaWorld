<h1 align="center"> Online Ninja World Game </h1>

> an online game written JavaScript in which 2 players play each turn to compete.

## Preview

- [ Ninja World](https://mizou9999.github.io/NinjaWorld/)

## User Stories

### Generate the map

- [x] Generate randomly the game map.
- [x] Each box can either Empty or Unaviable.
- [x] On the map, a limited number of weapons (up to 4) will be placed randomly and can be collected by players who pass through.
- [x] Each weapon has a different damage inflicted.
- [x] The default weapon which team players must inflict 10 points of damage.
- [x] Each weapon has a name and associated visual.
- [x] The placement of the two players is also randomly on the map when the game loads.
- [x] They should not touch (they can not be together).

### Movements

- [x] For each turn, a player can move from one to three boxes (horizontally or vertically).
- [x] If a player passes over a box containing a weapon, they leave their current weapon on site and replace it with the new one.
- [x] If a player cross over another player a battle begins.

### Fight

- [x] Each player attacks in turn.
- [x] The damage depends on the player's weapon.
- [x] The player can choose to attack or defend against the next shot.
- [x] If the player chooses to defend themselves, they sustain 50% less damage than normal.
- [x] As soon as the life points of a player (initially 100) falls to 0, they lose. A message appears and the game is over.

## Objectives

> Design reusable JavaScript application architecture.
> Develop an object-oriented JavaScript application.

## Language

- Vanilla JavaScript
- Html/css
- Bootstrap

The build is minified and the filenames include the hashes. Your app is ready to be deployed!

## Contributors

- [Aimen Aounallah](https://github.com/Mizou9999)
