import { describe, expect, it } from 'vitest'
import { DEFAULT_PRESENTATION_SLIDES, makeSlide } from './presentationModel'

describe('presentation model', () => {
  it('ships an ordered, editable default deck', () => {
    expect(DEFAULT_PRESENTATION_SLIDES).toHaveLength(16)
    expect(DEFAULT_PRESENTATION_SLIDES[0]).toMatchObject({ title: 'HASHFORGE PRO', kind: 'title', visual: '01' })
    expect(DEFAULT_PRESENTATION_SLIDES.find((slide) => slide.kind === 'avalanche')?.notes).toContain('Hello World')
    expect(new Set(DEFAULT_PRESENTATION_SLIDES.map((slide) => slide.id)).size).toBe(16)
  })

  it('creates a valid new slide with a unique id', () => {
    const slide = makeSlide(10)
    expect(slide.id).toContain('custom-')
    expect(slide.title).toBe('New slide')
    expect(slide.text.length).toBeGreaterThan(0)
    expect(slide.color).toMatch(/^#[0-9a-f]{6}$/i)
  })
})
