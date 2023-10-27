# NumRange Class

The `NumRange` class is a JavaScript utility for representing and manipulating numeric ranges with specified bounds. It allows you to define numeric ranges and perform operations like checking if a number falls within a range, computing the union and intersection of two ranges, and converting the range to a PostgreSQL compatible string format.

## Table of Contents

- [Usage](#usage)
- [Constructor](#constructor)
- [Methods](#methods)
- [Example](#example)
- [License](#license)

## Usage

To use the `NumRange` class in your JavaScript project, you can follow these steps:

1. Import or require the `NumRange` class in your code.
2. Create `NumRange` objects with the desired range and bounds.
3. Use the class methods to perform range-related operations.

```javascript
const NumRange = require('./NumRange') // Replace with the actual path to NumRange.js

const range1 = new NumRange('[1,5]') // Create a NumRange object with inclusive bounds [1, 5].
const range2 = new NumRange(0, 10, '()') // Create a NumRange object with exclusive bounds (0, 10).

console.log(range1.contains(3)) // Check if 3 is within range1.
const unionRange = range1.union(range2) // Compute the union of range1 and range2.
const intersectionRange = range1.intersection(range2) // Compute the intersection of range1 and range2.
console.log(unionRange.toString()) // Convert the union range to a PostgreSQL compatible string.
```
