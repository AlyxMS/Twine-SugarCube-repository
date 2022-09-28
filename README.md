# Twine-SugarCube-repository
Some macros and functions I made for SugarCube projects that have use outside of that particular project.

<br>

# Functions

## printList.js
*Returns an Array of strings as a single string in the format of `a, b and c`.*

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

## numberSpread.js
*Returns a **number** with a plus or minus random offset, to the maximum amount of **spread**, rounded to **round** decimals.*

### Usage: `setup.numberSpread(base, spread[, round])` → ***Number***

- `base`(Number): The initial value.
- `spread`(Number): Max offset amount.
- `round`(Integer, optional): Decimals the value is rounded to. Default to 0.

### Example:
```js
console.log(setup.numberSpread(100, 10));
console.log(setup.numberSpread(100, 10));
console.log(setup.numberSpread(100, 10));
//Output: 95
//Output: 107
//Output: 100
console.log(setup.numberSpread(100, 10, 2));
//Output: 98.97
console.log(setup.numberSpread(0.5, 0.2, 1));
//Output: 0.6
```

<br>

# Macros

##### There is none.
