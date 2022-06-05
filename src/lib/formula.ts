import { IntervalMatrix } from "./interval"

/**
 * Check if a given formula is valid. The accidentals must be written before the numbers.
 * @param {string} formula a string such as "1-b3-5" that represents a scale or chord.
 * @returns {boolean} true if formula is valid, false otherwise
 */
export function isValidFormula(formula: string): boolean {
  // check if formula is valid in regex
  const validRegex = /^1(?:-[b|#]?[b|#]?\d\d?)+$/.test(formula)
  if (!validRegex) return false

  // check if numbers are increasing from left to right
  const nums = formula
    .replace(/[#b]/g, "")
    .split("-")
    .map((n) => Number(n))
  for (let i = 0; i < nums.length - 1; i++) {
    if (nums[i] > nums[i + 1]) return false
  }

  return true
}

/**
 * Converts a formula of chord / scale to an array of intervals
 * @param {string} formula a string such as "1-b3-5" that represents a scale or chord.
 * @returns {number[]} corresponding array of semi-tone intervals, such as [0, 3, 4] for "1-b3-5"
 */
export function formulaToIntervals(formula: string): number[] {
  if (!isValidFormula(formula)) return [] // @todo throw error

  // add 0 already because we start from the root
  const ans: number[] = []

  let x = 0 // accidental offset
  let f = 0 // negative of x, to compensate the offset in next note

  let pos_from = 1 // current position in M
  let pos_to: number // next position in M
  let pos_to_backup: number // backup of pos_to, used after interval reduction
  let interval: number

  // start from the next note
  for (const c of formula.split("-")) {
    // extract modifiers
    pos_to = 0
    for (const c_i of c) {
      if (c_i === "b") {
        x--
      } else if (c_i === "#") {
        x++
      } else {
        // we are sure it is a digit due to regex check
        pos_to = pos_to * 10 + Number(c_i)
      }
    }
    pos_to_backup = pos_to

    interval = 0
    // if both positions are greater than 7, they can be reduced
    // e.g. going from 9 to 10 is same as from 2 to 3
    while (pos_from > 7 && pos_to > 7) {
      pos_from -= 7
      pos_to -= 7
    }
    // now if target is at some large position, we can find the interval by first
    // going to octave and then going to the position
    while (pos_to > 7) {
      interval += IntervalMatrix[pos_from][8]
      pos_to -= 7
      pos_from = 1
    }

    interval += IntervalMatrix[pos_from][pos_to]
    interval += x + f // accidental offset
    ans.push(interval)

    // update accidentals for next note
    f = -x
    x = 0
    pos_from = pos_to_backup
  }

  return ans
}
