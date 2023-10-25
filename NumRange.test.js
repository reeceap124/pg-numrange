const NumRange = require('./index.js') // Adjust the import path as needed

describe('NumRange', () => {
  describe('Constructor', () => {
    it('should create a valid NumRange from a string', () => {
      const rangeString = '[-3.5, 10)'
      const range = new NumRange(rangeString)
      expect(range.lower).toBe(-3.5)
      expect(range.upper).toBe(10)
      expect(range.lowerInclusive).toBe(true)
      expect(range.upperInclusive).toBe(false)
    })

    it('should create a valid NumRange from two numbers', () => {
      const range = new NumRange(1, 5)
      expect(range.lower).toBe(1)
      expect(range.upper).toBe(5)
      expect(range.lowerInclusive).toBe(false)
      expect(range.upperInclusive).toBe(false)
    })

    it('should create a valid NumRange from two numbers with inclusive bounds', () => {
      const range = new NumRange(1, 5, '[]')
      expect(range.lower).toBe(1)
      expect(range.upper).toBe(5)
      expect(range.lowerInclusive).toBe(true)
      expect(range.upperInclusive).toBe(true)
    })

    it('should throw an error for an invalid input format', () => {
      expect(() => new NumRange('invalid')).toThrow(
        'Invalid input format for Range'
      )
    })

    it('should throw an error if lower value is greater than upper value', () => {
      expect(() => new NumRange(5, 1)).toThrow(
        'Lower value can not be greater than upper value'
      )
    })

    it('should throw an error for an invalid number of arguments', () => {
      expect(() => new NumRange()).toThrow(
        'Invalid number of arguments for Range'
      )
    })
  })

  describe('contains', () => {
    it('should return true if a number is within the range', () => {
      const range = new NumRange(2, 5)
      expect(range.contains(3)).toBe(true)
    })

    it('should return false if a number is outside the range', () => {
      const range = new NumRange(2, 5)
      expect(range.contains(1)).toBe(false)
      expect(range.contains(6)).toBe(false)
    })

    it('should handle inclusive bounds correctly', () => {
      const range = new NumRange(2, 5, '[]')
      expect(range.contains(2)).toBe(true)
      expect(range.contains(5)).toBe(true)
    })
  })

  describe('union', () => {
    it('should compute the union of two ranges', () => {
      const range1 = new NumRange(2, 5)
      const range2 = new NumRange(4, 8)
      const unionRange = range1.union(range2)
      expect(unionRange.lower).toBe(2)
      expect(unionRange.upper).toBe(8)
      expect(unionRange.lowerInclusive).toBe(false)
      expect(unionRange.upperInclusive).toBe(false)
    })
  })

  describe('intersection', () => {
    it('should compute the intersection of two ranges', () => {
      const range1 = new NumRange(2, 5)
      const range2 = new NumRange(4, 8)
      const intersectionRange = range1.intersection(range2)
      expect(intersectionRange.lower).toBe(4)
      expect(intersectionRange.upper).toBe(5)
      expect(intersectionRange.lowerInclusive).toBe(false)
      expect(intersectionRange.upperInclusive).toBe(true)
    })

    it('should return null if ranges do not intersect', () => {
      const range1 = new NumRange(2, 5)
      const range2 = new NumRange(6, 8)
      const intersectionRange = range1.intersection(range2)
      expect(intersectionRange).toBe(null)
    })
  })

  describe('toString', () => {
    it('should convert the range to a string', () => {
      const range = new NumRange(2, 5, '[]')
      const str = range.toString()
      expect(str).toBe('[2,5]')
    })
  })
})
