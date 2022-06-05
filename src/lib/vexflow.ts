import { MusicClef, MusicNote } from "../types/music"
import { Renderer, Stave, StaveNote, Formatter, Accidental, RendererBackends } from "vexflow"

export function drawStaffEffect(
  staffRef: React.RefObject<HTMLDivElement>,
  notes: MusicNote[],
  clef: MusicClef,
  keySignature: MusicNote
): React.EffectCallback {
  return () => {
    const staffElem = staffRef.current
    if (!staffElem) return

    // remove existing elements
    while (staffElem.hasChildNodes() && staffElem.lastChild) {
      staffElem.removeChild(staffElem.lastChild)
    }

    // prepare renderer
    const renderer = new Renderer(staffElem, RendererBackends.SVG)
    renderer.resize(staffElem.offsetWidth, staffElem.offsetHeight)
    const ctx = renderer.getContext()
    ctx.save() // save empty context

    // create the stave
    const stave = new Stave(0, 0, staffElem.offsetWidth)
    stave.addClef(clef).addTimeSignature(`${notes.length}/4`).addKeySignature(keySignature).setContext(ctx).draw()

    // prepare notes
    const stavenotes = notes.map((n: MusicNote) => {
      // octave changes w.r.t clef; treble gets 4 or 5, bass gets 2 or 3
      let octave = clef == "treble" ? 4 : 2
      if (Math.random() < 0.5) octave++
      const note = new StaveNote({
        keys: [`${n}/${octave}`],
        duration: "q", // always quarters cus i got other things to do
        clef,
      })

      // accidentals are assured to be at [1] due to MusicNote type
      if (n.length > 1) note.addModifier(new Accidental(n[1]))

      return note
    })

    Formatter.FormatAndDraw(ctx, stave, stavenotes)

    return () => {
      ctx.restore() // restore the saved context
    }
  }
}
