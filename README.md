# Twine-SugarCube-repository
Some macros and functions I made for SugarCube projects that have use outside of that particular project.

<br>

# Index

- [Functions](#Functions)
    - [printList](#function_printListjs) Array of string to a single string in the format of `A, B and C`.
    - [numSpread](#function_numSpreadjs) A number ±spread, optionally rounded.
    - [weightedRandom](#function_weightedRandomjs) Random element from array, biased by weight.
    - [inventory](#functions_inventoryjs) A basic inventory system, still in prototype stage.
- [Macros](#Macros)

<hr><br>

# Functions

## function_printList.js
*Returns an Array of strings as a single string in the format of `A, B and C`.*

### Usage: `setup.printList(Array)` → ***String***
### Example:
```js
console.log(setup.printList(["Cowboy"]));
//Output: "Cowboy"
console.log(setup.printList(["Cowboy", "Marine"]));
//Output: "Cowboy and Marine"
console.log(setup.printList(["Cowboy", "Marine", "Harry"]));
//Output: "Cowboy, Marine and Harry"
console.log(setup.printList(["Cowboy", "Marine", "Harry", "Trucks"]));
//Output: "Cowboy, Marine, Harry and Trucks"
```

----

## function_numSpread.js
*Returns the **base** number with a plus or minus random offset applied, to the maximum amount of **spread**, rounded to **round** decimals.*

### Usage: `setup.numSpread(base, spread[, round])` → ***Number***

- `base`(Number): The initial value.
- `spread`(Number): Max offset amount.
- `round`(Integer, optional): Decimals the value is rounded to. Defaults to 0.

### Example:
```js
console.log(setup.numSpread(100, 10));
//Output: 95
console.log(setup.numSpread(100, 10));
//Output: 107
console.log(setup.numSpread(100, 10));
//Output: 100
console.log(setup.numSpread(100, 10, 2));
//Output: 98.97
console.log(setup.numSpread(0.5, 0.2, 1));
//Output: 0.6
```
----

## function_weightedRandom.js
*Returns a random content from an array structured for weightedRandom biased to the content's weight.*

### Usage: `setup.weightedRandom(weightedArray)` → ***any***

- `weightedArray`(Array): An array with each element being an array in the format of `[content, weight]`.
- `content`(any): One of the possible returns.
- `weight`(Number): The weight of the content. Higher weight results in a higher chance of return relative to contents with lower weights.

### Example:
```js
var weightedArray = [["A", 2], ["B", 0.5], ["C", 7.5]];
/* As all weights add up to 10. "A" has a chance of 2/10(20%), B has a chance of 0.5/10(5%), C has a chance of 7.5/10(75%). */
console.log(setup.weightedRandom(weightedArray));
//Output: "C"
console.log(setup.weightedRandom(weightedArray));
//Output: "A"
console.log(setup.weightedRandom(weightedArray));
//Output: "C"
weightedArray.pop(); //Removes the last element
/* As all weights add up to 2.5. "A" has a chance of 2/2.5(80%), B has a chance of 0.5/2.5(20%). */
```

----

## functions_inventory.js
*A simple inventory system with item stacking. Inventories are basic arrays and items are saved as `Item` class objects, which allows items with unique properties(such as equipment with durability, weapon with modification, item with special name) but not space-efficient. Copied straight from a project, not easy to adopt for existing projects. Will be reworked for general use eventually.*

### Usage: `setup.sortInventory([targetInventory])`
*A basic function to sort an array based on the uid property of its elements, from small to large.*
- `targetInventory`(Array): An array with `Item` class objects. Defaults to `$inventory`

### Usage: `setup.addItem(item[, amount[, targetInventory]])`
*Add items to an array.*
- `item`(Item): `Item` class object, to be added to array.
- `amount`(Integer): Amount of items to add, defaults to 1. Overwrites the amount of `item` if `item` is stackable.
- `targetInventory`(Array): An array with `Item` class objects. Defaults to `$inventory`.

### Usage: `setup.removeItem(item[, amount[, targetInventory]])`
*Remove item from an array. If item is stackable and the amount exceeds the amount avaialble in the array, removes all. If item is unstackable, removes the first one. ←Needs to be fixed to remove the amount appropriate*
- `item`(Item): `Item` class object with uid matching to the item to be removed.
- `amount`(Integer): Amount of items to remove, defaults to 1. Overwrites the amount of `item` if `item` is stackable.
- `targetInventory`(Array): An array with `Item` class objects. Defaults to `$inventory`.

### Usage: `setup.countItem(item[, targetInventory])`
*Returns the amount of items with matching uid to the item provided in an Array.*
- `item`(Item): `Item` class object with uid matching to the item to be counted.
- `targetInventory`(Array): An array with `Item` class objects. Defaults to `$inventory`.

### Item class object default properties:
- `name`(String): Intended as the name of the item. Not recommended to be changable if the item is stackable.
- `description`(String): Intended as the description of the item.
- `type`(String): Intended to help identifying the type of the item(I.E. weapon, armor, consumable, junk).
- `stackable`(Boolean): Defines if the item is stackable. Stackable item will make use of its `amount` property and will not repeat in the inventory array.
- `value`(Number): Not used by the system. Intended as the price/value of the item. To be used to calculate buy/sell price.
- `tags`(Array): Similar to type, but intended as a place to put markers on a specifc type(I.E. type: "weapon", tags: ["one-handed", "sword"])

### Example:
```js
//Define a new unstackable item
setup.pistol = new Item({
    name: "9mm Pistol",
    description: "A small handgun.",
    type: "weapon",
    stackable: false,
    value: 200,
    tags: ["handgun", "ranged"],
    /* Custom properties can be added */
    damage: 10,
    ammo: 0,
    ammoMax: 15
});

//Add 1 pistol $inventory, which is an empty array
setup.addItem(setup.pistol);

//Add 3 pistols to $shopInventory, which is an empty array
setup.addItem(setup.pistol, 2, State.variables.shopInventory);

console.log(State.variables.shopInventory);
//Output: Array[Item, Item, Item]
/* 3 objects are added as pistol is unstackable. This means if one of the pistol's property changed(increased damage, reduced ammo etc...), the other pistols will not be affected. */

//Count the amount of pistols in $shopInventory
setup.countItem(setup.pistol, State.variables.shopInventory);
//Output: 3

//Define a new stackable item
setup.bullet = new Item({
    name: "9mm bullet",
    description: "9mm Parabellum.",
    type: "consumable"
    //stackable: true is redundant, as stackable defaults to true
});

//Add 100 bullets to $inventory
setup.addItem(setup.bullet, 100)

console.log(State.variables.inventory);
//Output: Array[Item, Item]
/* Only 1 item is added because bullet is stackable. */

//Count the amount of bullets in $inventory
setup.countItem(setup.bullet);
//Output: 100

/* Warning: The functions will not adapt to unexpected scenarios. I.E. a stackable item is pushed/unshifted while the same item already exists within the array. countItem will only return the amount of the first item with matching UID. This is planned to be gated off with the Inventory Class */
```
<br>

# Macros

##### There is none.
