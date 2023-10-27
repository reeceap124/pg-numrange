const fullMatchPattern =
  /^([\[\(])(-?\d*\.?\d*|null|undefined),(-?\d*\.?\d*|null|undefined)([\]\)])$/

class NumRange {
  constructor() {
    let rangeString

    if (arguments.length === 1) {
      rangeString = arguments[0].replace(/\s/g, '')
    } else if (arguments.length === 2 || arguments.length === 3) {
      const lower = arguments[0] || ''
      const upper = arguments[1] || ''
      const bounds = arguments.length === 3 ? arguments[2] : '(]'
      const lowerBound = bounds[0]
      const upperBound = bounds[1]
      rangeString = lowerBound + lower + ',' + upper + upperBound
    } else {
      throw new Error('Invalid number of arguments for Range')
    }
    const matches = rangeString.match(fullMatchPattern)
    if (matches) {
      const lower = matches[2] ? Number(matches[2]) : -Infinity
      const upper = matches[3] ? Number(matches[3]) : Infinity
      const lowerBound = matches[1]
      const upperBound = matches[4]

      if (lower <= upper) {
        const lowerInclusive = lowerBound === '['
        const upperInclusive = upperBound === ']'
        this.lower = lower
        this.upper = upper
        this.lowerInclusive = lowerInclusive
        this.upperInclusive = upperInclusive
      } else {
        throw new Error(`Lower value can not be greater than upper value.`)
      }
    } else {
      throw new Error('Invalid input format for Range')
    }
  }

  // Check if a number falls within the bounds of the range.
  contains(number) {
    if (this.lowerInclusive && number < this.lower) {
      return false
    }
    if (!this.lowerInclusive && number <= this.lower) {
      return false
    }
    if (this.upperInclusive && number > this.upper) {
      return false
    }
    if (!this.upperInclusive && number >= this.upper) {
      return false
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
    return new NumRange(
      `${lowerInclusive ? '[' : '('}${lower},${upper}${
        upperInclusive ? ']' : ')'
      }`
    )
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
    const lowerValue = isFinite(this.lower) ? this.lower : ''
    const upperValue = isFinite(this.upper) ? this.upper : ''

    return `${lowerBoundString}${lowerValue},${upperValue}${upperBoundString}`
  }
}

module.exports = NumRange
