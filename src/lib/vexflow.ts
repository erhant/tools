import { MusicClef, MusicNote, MusicPreparedNote } from "../types/music"
import { Renderer, Stave, StaveNote, Formatter, Accidental, RendererBackends, RenderContext } from "vexflow"

export function drawStaff(
  staffRef: React.RefObject<HTMLDivElement>,
  notes: MusicPreparedNote[],
  clef: MusicClef,
  keySignature: MusicNote
): RenderContext | null {
  const staffElem = staffRef.current
  if (!staffElem) return null

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
  const stavenotes = notes.map((n: MusicPreparedNote) => {
    const note = new StaveNote({
      keys: [`${n.note}/${n.octave}`],
      duration: n.duration, // always quarters cus i got other things to do
      clef,
    })

    // accidentals are assured to be at [1] due to MusicNote type
    if (n.accidental) note.addModifier(new Accidental(n.accidental))

    return note
  })

  Formatter.FormatAndDraw(ctx, stave, stavenotes)

  return ctx
}
