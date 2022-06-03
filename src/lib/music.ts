import { MusicAccidental, MusicNote, MusicPosition } from "../types/music"

// Interval Matrix of the Major Scale
const MATRIX = [
  [-1, -1, -1, -1, -1, -1, -1, -1, -1], // 0
  [-1, 0, 2, 4, 5, 7, 9, 11, 12], // 1
  [-1, 2, 0, 2, 3, 5, 7, 9, 10], // 2
  [-1, 4, 2, 0, 1, 3, 5, 7, 8], // 3
  [-1, 5, 3, 1, 0, 2, 4, 6, 7], // 4
  [-1, 7, 5, 3, 2, 0, 2, 4, 5], // 5
  [-1, 9, 7, 5, 4, 2, 0, 2, 3], // 6
  [-1, 11, 9, 7, 6, 4, 2, 0, 1], // 7
  [-1, 12, 10, 8, 7, 5, 3, 1, 0], // 8
  //0  1   2   3  4  5  6  7  8
]

/**
 * Check if a given formula is valid. The accidentals must be written before the numbers.
 * @param {string} formula a string such as "1-b3-5" that represents a scale or chord.
 * @returns {boolean} true if formula is valid, false otherwise
 */
export function isValidFormula(formula: string): boolean {
  // check if formula is valid in regex
  let validRegex = /^1(?:-[b|#]?[b|#]?\d\d?)+$/.test(formula)
  if (!validRegex) return false

  // check if numbers are increasing from left to right
  let nums = formula
    .replace(/#/g, "") // use [#b] instead
    .replace(/b/g, "")
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
  if (!isValidFormula(formula)) return []; // @todo throw error

  let ans: number[] = []

  let x: number = 0 // accidental offset
  let f: number = 0 // negative of x, to compensate the offset in next note

  let pos_from: number = 1 // current position in M
  let pos_to: number // next position in M
  let pos_to_backup: number // backup of pos_to, used after interval reduction
  let interval: number
  for (let c of formula.split("-")) {
    // extract modifiers
    pos_to = 0
    for (let c_i of c) {
      if (c_i == "b") {
        x--
      } else if (c_i == "#") {
        x++
      } else {
        // we are sure it is a digit due to regex check
        pos_to = pos_to * 10 + Number(c_i)
      }
    }
    pos_to_backup = pos_to

    // interval reduction
    interval = 0
    while (pos_from > 8 && pos_to > 8) {
      // @todo: test this... what does 1-2-3-4-5-6-7-8-9-10-11-12-13-14-15-16-17-18-19-20-21-22-23-24 result in?
      pos_from -= 7
      pos_to -= 7
    }
    while (pos_to > 8) {
      interval += MATRIX[pos_from][8]
      pos_to -= 7
      pos_from = 1
    }

    interval += MATRIX[pos_from][pos_to] + x + f
    ans.push(interval)

    // update accidentals for next note
    f = -x
    x = 0
    pos_from = pos_to_backup
  }

  return ans
}

const MusicNoteToMusicPosition: { [key in MusicNote]: MusicPosition } = {
  C: 0,
  "C#": 1,
  Db: 1,
  D: 2,
  "D#": 3,
  Eb: 3,
  E: 4,
  F: 5,
  "F#": 6,
  Gb: 6,
  G: 7,
  "G#": 8,
  Ab: 8,
  A: 9,
  "A#": 10,
  Bb: 10,
  B: 11,
}
const MusicPositionToMusicNote: { [key in MusicPosition]: [MusicNote, MusicNote] } = {
  0: ["C", "C"],
  1: ["C#", "Db"],
  2: ["D", "D"],
  3: ["D#", "Eb"],
  4: ["E", "E"],
  5: ["F", "F"],
  6: ["F#", "Gb"],
  7: ["G", "G"],
  8: ["G#", "Ab"],
  9: ["A", "A"],
  10: ["A#", "Bb"],
  11: ["B", "B"],
}

export function intervalsToNotes(intervals: number[], key: MusicNote, accidentals: MusicAccidental = "#"): MusicNote[] {
  let ans: MusicNote[] = []

  let p = MusicNoteToMusicPosition[key]
  let a = accidentals == "#" ? 0 : 1 // accidents index

  for (let i of intervals) {
    p = ((p + i) % 12) as MusicPosition
    ans.push(MusicPositionToMusicNote[p][a])
  }

  return ans
}

export function getRandomNotes(count: number): MusicNote[] {
  let ans: MusicNote[] = []
  for (let i = 0; i < count; i++) {
    ans.push(MusicPositionToMusicNote[Math.floor(Math.random() * 12) as MusicPosition][Math.random() < 0.5 ? 0 : 1])
  }
  return ans
}