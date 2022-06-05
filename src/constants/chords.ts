const chords: Readonly<{ [key: string]: string }> = {
  Power: "1-5",

  Sus2: "1-2-5",
  Sus4: "1-4-5",
  Add9: "1-3-5-9",
  MinAdd9: "1-b3-5-9",
  Add11: "1-3-5-11",
  Add13: "1-3-5-13",

  Maj: "1-3-5",
  Maj6: "1-3-5-6",
  "Maj6-9": "1-3-5-6-9",
  Maj7: "1-3-5-7",
  Maj9: "1-3-5-7-9",
  Maj11: "1-3-5-7-9-11",
  Maj13: "1-3-5-7-9-11-13",

  Aug: "1-3-#5",
  Aug7: "1-3-#5-b7",

  Min: "1-b3-5",
  Min6: "1-b3-5-6",
  Min7: "1-b3-5-b7",
  Min7b5: "1-b3-b5-b7",
  Min9: "1-b3-5-b7-9",
  Min9b5: "1-b3-b5-b7-9",
  Min11: "1-b3-5-b7-9-11",
  Min13: "1-b3-5-b7-9-11-13",
  MinMaj7: "1-b3-5-7",

  Dom7: "1-3-5-b7",
  Dom7s5: "1-3-#5-b7",
  Dom7s9: "1-3-5-b7-#9",
  Dom7s11: "1-3-5-b7-#11",
  Dom11: "1-3-5-b7-9-11",
  Dom13: "1-3-5-b7-9-11-13",

  Dim: "1-b3-b5",
  HalfDim: "1-b3-b5-b7",
}

export default chords
