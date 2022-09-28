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

## numSpread.js
*Returns the **base** number with a plus or minus random offset applied, to the maximum amount of **spread**, rounded to **round** decimals.*

### Usage: `setup.numSpread(base, spread[, round])` → ***Number***

- `base`(Number): The initial value.
- `spread`(Number): Max offset amount.
- `round`(Integer, optional): Decimals the value is rounded to. Default to 0.

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

## weightedRandom.js
*Returns a random content from an array structured for weightedRandom biased to the content's weight.*

### Usage: `setup.weightedRandom(weightedArray)` → ***any***

- `weightedArray`(Array): An array with each element being an array in the format of `[content, weight]`.
- `content`(any): One of the possible returns.
- `weight`(Number): The weight of the content. Higher weight results in a higher chance of return relative to contents with lower weights.

### Example:
```js
var weightedArray = [["A", 2], ["B", 0.5], ["C": 7.5]];
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

<br>

# Macros

##### There is none.
