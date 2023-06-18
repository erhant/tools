import type { MusicAccidental, MusicNote, MusicPosition } from "../../types/music"
import { MusicNoteToMusicPosition, MusicPositionToMusicNote } from "./base"

// Interval Matrix of the Major Scale
export const IntervalMatrix = [
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

export function intervalsToNotes(intervals: number[], key: MusicNote, accidentals: MusicAccidental = "#"): MusicNote[] {
  const ans: MusicNote[] = []

  let p = MusicNoteToMusicPosition[key]
  const a = accidentals == "#" ? 0 : 1 // accidents index

  for (const i of intervals) {
    p = ((p + i) % 12) as MusicPosition
    ans.push(MusicPositionToMusicNote[p][a])
  }

  return ans
}
