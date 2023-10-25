// Should have open parens/square and close parens/square
// Should be string or upper/lower/bounds
// Should be numbers or null
// Lower cannot be greater than the upper
// contains should return bool related to if num in range
// union should merge ranges
// intersection should find overlap of ranges

//Stretch: timestamp

const fullMatchPattern =
  /^([\[\(])(-?\d*\.?\d*|null|undefined),(-?\d*\.?\d*|null|undefined)([\]\)])$/

class NumRange {
  constructor() {
    let rangeString
    if (arguments.length === 1) {
      rangeString = arguments[0]
    } else if (arguments.length === 2 || arguments.length === 3) {
      const lower = arguments[0]
      const upper = arguments[1]
      const bounds = arguments.length === 3 ? arguments[2] : '(]'
      const lowerBound = bounds[0]
      const upperBound = bounds[1]
      rangeString = lowerBound + lower + ',' + upper + upperBound
    } else {
      throw new Error('Invalid number of arguments for Range')
    }

    const matches = rangeString.match(fullMatchPattern)
    console.log({ matches })
    if (matches) {
      const lower = matches[2]
      const upper = matches[3]
      const lowerBound = matches[1]
      const upperBound = matches[4]
      if (lower <= upper) {
        const lowerInclusive = lowerBound === '['
        const upperInclusive = upperBound === ']'
        this.lower = Number(matches[2]) || -Infinity
        this.upper = Number(matches[3]) || Infinity
        this.lowerInclusive = lowerInclusive
        this.upperInclusive = upperInclusive
      } else {
        throw new Error('Lower value can not be greater than upper value')
      }
    } else {
      throw new Error('Invalid input format for Range')
    }
  }

  // Check if a number falls within the bounds of the range.
  contains(number) {
    if (this.lowerInclusive) {
      if (number < this.lowerBound) return false
    } else {
      if (number <= this.lowerBound) return false
    }
    if (this.upperInclusive) {
      if (number > this.upperBound) return false
    } else {
      if (number >= this.upperBound) return false
    }
    return true
  }

  // Compute the union of two numranges.
  union(otherRange) {
    const lower = Math.min(this.lower, otherRange.lower)
    const upper = Math.max(this.upper, otherRange.upper)
    const lowerInclusive =
      this.lower === lower ? this.lowerInclusive : otherRange.lowerInclusive
    const upperInclusive =
      this.upper === upper ? this.upperInclusive : otherRange.upperInclusive
    return new NumRange(lower, upper, lowerInclusive, upperInclusive)
  }

  // Compute the intersection of two numranges.
  intersection(otherRange) {
    const lower = Math.max(this.lower, otherRange.lower)
    const upper = Math.min(this.upper, otherRange.upper)

    if (
      lower > upper ||
      (lower === upper && (!this.lowerInclusive || !otherRange.upperInclusive))
    ) {
      return null // Ranges do not intersect.
    }

    const lowerInclusive =
      this.lower === lower ? this.lowerInclusive : otherRange.lowerInclusive
    const upperInclusive =
      this.upper === upper ? this.upperInclusive : otherRange.upperInclusive
    const boundsString = `${lowerInclusive ? '[' : '('}${
      upperInclusive ? ']' : ')'
    }`
    return new NumRange(lower, upper, boundsString)
  }

  // Convert the range to a PostgreSQL compatible string.
  toString() {
    const lowerBoundString = this.lowerInclusive ? '[' : '('
    const upperBoundString = this.upperInclusive ? ']' : ')'

    return `${lowerBoundString}${this.lower},${this.upper}${upperBoundString}`
  }
}

module.exports = NumRange
