import type { MusicNote, MusicPosition, MusicPreparedNote, MusicClef, MusicAccidental } from "../../types/music"

export const MusicNoteToMusicPosition: { [key in MusicNote]: MusicPosition } = {
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

export const MusicPositionToMusicNote: {
  [key in MusicPosition]: [MusicNote, MusicNote]
} = {
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

export function getRandomNotes(count: number): MusicNote[] {
  const ans: MusicNote[] = []
  for (let i = 0; i < count; i++) {
    ans.push(MusicPositionToMusicNote[Math.floor(Math.random() * 12) as MusicPosition][Math.random() < 0.5 ? 0 : 1])
  }
  return ans
}

/**
 * Given an array of notes, prepare by assigning octaves w.r.t clef.
 * @param notes
 * @param clef
 */
export function prepareNotes(notes: MusicNote[], clef: MusicClef): MusicPreparedNote[] {
  return notes.map((n: MusicNote) => {
    // octave changes w.r.t clef; treble gets 4 or 5, bass gets 2 or 3

    let octave = clef == "treble" ? 4 : 2
    if (Math.random() < 0.5) octave++

    const prepN: MusicPreparedNote = {
      note: n,
      duration: "q",
      octave,
    }
    // accidentals are assured to be at [1] due to MusicNote type
    if (n.length > 1) prepN.accidental = n[1] as MusicAccidental

    return prepN
  })
}
