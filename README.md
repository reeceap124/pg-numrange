# PG NumRange

The `NumRange` class is a JavaScript implementation for working with numerical ranges, which allows you to define a range with lower and upper bounds and perform various operations on these ranges. This class is designed to be flexible and user-friendly for managing and manipulating numeric intervals.

## Table of Contents

- [Features](#features)
- [Usage](#usage)
- [Properties](#properties)
- [Methods](#methods)

## Features

- Create and manage numerical ranges with ease.
- Check if a number falls within the bounds of a range.
- Calculate the union and intersection of two numerical ranges.
- Convert a range to a PostgreSQL-compatible string.

## Usage

Here are some examples of how to create and work with NumRanges

```javascript
const NumRange = require('./NumRange')
// Create a NumRange object with inclusive bounds.
const range1 = new NumRange(1, 10, true, true)

// Check if a number is within the range.
const number = 5
if (range1.contains(number)) {
  console.log(`${number} is within the range.`)
} else {
  console.log(`${number} is outside the range.`)
}

// Calculate the union of two ranges.
const range2 = NumRange.parse('[5,15]')
const unionRange = range1.union(range2)
console.log('Union Range:', unionRange.toString())

// Calculate the intersection of two ranges.
const intersectionRange = range1.intersection(range2)
if (intersectionRange) {
  console.log('Intersection Range:', intersectionRange.toString())
} else {
  console.log('The ranges do not intersect.')
}
```

## Class Properties

- **lower**: The lower bound of the numerical range. This property represents the lower limit of the range.

- **upper**: The upper bound of the numerical range. This property represents the upper limit of the range.

- **lowerInclusive**: A boolean value indicating whether the lower bound is inclusive when working with ranges. When set to `true`, the lower bound is inclusive, meaning values equal to the lower bound are considered within the range.

- **upperInclusive**: A boolean value indicating whether the upper bound is inclusive when working with ranges. When set to `true`, the upper bound is inclusive, meaning values equal to the upper bound are considered within the range.

## Class Methods

- **constructor(lower, upper, lowerInclusive, upperInclusive)**: Create a `NumRange` object with specified lower and upper bounds, and inclusive/exclusive flags. This method initializes a `NumRange` instance with the provided boundaries and options.

- **parse(rangeString)**: Parse a range string and create a `NumRange` object. This static method is used to create a `NumRange` instance based on a range string in a specific format.

- **contains(number)**: Check if a number falls within the bounds of the range. This method returns `true` if the specified number is within the range, taking into account the inclusive or exclusive bounds.

- **union(otherRange)**: Calculate the union of two `NumRange` objects. This method returns a new `NumRange` object that encompasses both input ranges, combining them into a single range.

- **intersection(otherRange)**: Calculate the intersection of two `NumRange` objects. This method returns a new `NumRange` object representing the common range between the two input ranges. If there is no intersection, it returns `null`.

- **toString()**: Convert the `NumRange` object to a PostgreSQL-compatible string. This method returns a string representing the `NumRange` object in a format suitable for PostgreSQL database operations.
