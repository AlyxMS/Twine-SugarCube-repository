# Twine-SugarCube-repository
Some macros and functions I made for SugarCube projects that have use outside of that particular project.

<br>

# Index

- [Functions](#Functions)
    - [printList](#function_printListjs) Array of string to a single string in the format of `A, B and C`.
    - [numSpread](#function_numSpreadjs) A number ±spread, optionally rounded.
    - [weightedRandom](#function_weightedRandomjs) Random element from array, biased by weight.
    - [numTransition](#function_numTransitionjs) Smoothly transition a DOM element containing number to another number.
- [Macros](#Macros)
    - [redraw](#macro_redrawjs) Redraws the current passage without passage navigation.

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
/* As all weights add up to 10. "A" has a chance of 2/10(20%), B has a chance of 0.5/10(5%), 
C has a chance of 7.5/10(75%). */
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

## function_numTransition.js
*Makes a DOM element containing a number smoothly transition to another number.*

### Usage: `setup.numTransition(target, targetNumber[, duration, curve, decimal])` → ***Element***

- `target`(Element | String): If string, target will be the first match using of the string as selector.
- `targetNumeber`(Number): The number that the element should change to.
- `duration`(Number, optional): Duration of the transition, in milliseconds. Defaults to 1000(1 second).
- `curve`(Number, optional): Lower than 1 have an ease out effect, higher than 1 have an ease in effect. Defaults to 0.3.
- `decimal`(Integer, optional): The amount of decimals the number should have. Defaults to 0.

### Example
```js
<span id="numberDisplay">64</span>
<<run setup.numTransition("#numberDisplay", 256)>>

<span id="health">50</span>
//Using the returned element
setup.numTransition(document.getElementById("health"), 100, 2500).style.color = "red";
```

### Note
The HTML element must only contain a number with no addtional item. I.E. `<span>22</span>` or `<div>-253.38</div>`.

----

# Macros

## macro_redraw.js
*A macro that re-renders the current passage, as well as `StoryCaption` or passages defined in `StoryInterface`. Allowing for changes to the passage content to be seen without passage navigation or having to set up a `<<replace>>`.*
### Usage: `<<redraw [config] [PassageReady Boolean] [PassageDone Boolean] [Interface Boolean] [Time Boolean]>>`

- `config`(case insensitive): Keyword for changing default behavior. If present, will only change the default behavior and not redraw. Default behavior is stored in the setup object and not saved, therefore the keyword is ideally only be used in `StoryInit` or `init` tagged passages. 
- `PassageReady`(case insensitive): If false, will not run PassageReady on redraw. Defaults to true.
- `PassageDone`(case insensitive): If false, will not run PassageDone on redraw. Defaults to true.
- `Interface`(case insensitive): If false, will not redraw StoryCaption or StoryInterface related passages. Defaults to true.
- `Time`(case insensitive): If true, will log time used for each passage and overall time in console. Defaults to false.
- `Boolean`: `true` or `false`

### Example:
```js
:: StoryInit
<<set $number = 0>>
<<redraw config time true>>

:: Start
$number
<<link "Add">>
    <<set $number++>>
    <<redraw>>
<</link>>
```

### Behavior
1. If PassageReady is found, runs PassageReady.
2. Prepending PassageHeader and appending PassageFooter if found, then re-renders the current passage.
3. If PassageDone is found, runs PassageDone.
4. If StoryInterface is found, updates all elements with attribute `data-passage` that does not contain `macro-` in its class list(I.E. the `<<link>>` macro) and does not have the `passage` class(the main passage). If not, and `StoryCaption` is found, updates StoryCaption.