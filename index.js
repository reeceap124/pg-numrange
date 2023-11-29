const fullMatchPattern =
  /^([\[\(])(-?\d*\.?\d*|null|undefined),(-?\d*\.?\d*|null|undefined)([\]\)])$/

class NumRange {
  #processParameter(input, isLower = false) {
    // Non-zero falsey values return infinity
    if (!!input === false && input !== 0) {
        return isLower ? -Infinity : Infinity
    // all other non-numeric values return undefined
    } else if (isNaN(input)) {
        return undefined
    } else {
        return Number(input)
    }
  }
  constructor(lower, upper, lowerInclusive = false, upperInclusive = true) {
    const lowerVal =  this.#processParameter(lower, true)
    const upperVal = this.#processParameter(upper)
    if (
      typeof lowerInclusive !== 'boolean' ||
      typeof upperInclusive !== 'boolean'
    ) {
      throw new Error('lowerInclusive and upperInclusive must be booleans')
    }
    if (isNaN(lowerVal) || isNaN(upperVal)) {
      throw new Error('Lower and upper bounds must be numbers.')
    }

    if (lowerVal > upperVal) {
      throw new Error('Lower value cannot be greater than upper value.')
    }

    this.lower = lowerVal
    this.upper = upperVal
    this.lowerInclusive = lowerInclusive
    this.upperInclusive = upperInclusive
  }

  static parse(rangeString) {
    if (typeof rangeString !== 'string') {
      throw new Error('Invalid input for Range')
    }
    rangeString = rangeString.replace(/\s/g, '')
    const matches = rangeString.match(fullMatchPattern)
    if (!matches) {
      throw new Error('Invalid input format for Range')
    }

    const lower = matches[2]
    const upper = matches[3]
    const lowerInclusive = matches[1] === '['
    const upperInclusive = matches[4] === ']'

    return new NumRange(lower, upper, lowerInclusive, upperInclusive)
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

    return new NumRange(lower, upper, lowerInclusive, upperInclusive)
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
