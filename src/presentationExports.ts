import pptxgen from 'pptxgenjs'
import jsPDF from 'jspdf'
import type { PresentationSlide } from './presentationModel'

export function downloadJson(slides: PresentationSlide[]) {
  const blob = new Blob([JSON.stringify({ app: 'HashForge Pro', exportedAt: new Date().toISOString(), slides }, null, 2)], { type: 'application/json' })
  downloadBlob(blob, 'hashforge-presentation.json')
}

export async function downloadPptx(slides: PresentationSlide[]) {
  const deck = new pptxgen()
  deck.layout = 'LAYOUT_WIDE'
  deck.author = 'HashForge Pro'
  deck.subject = 'Interactive Cryptographic & Malware Analysis Laboratory'
  deck.title = 'HashForge Pro Presentation'
  deck.company = 'HashForge Pro'
  slides.forEach((slide, index) => {
    const page = deck.addSlide()
    page.background = { color: '091116' }
    page.addText('HASHFORGE PRO  /  CLASSROOM MODE', { x: 0.65, y: 0.42, w: 5, h: 0.25, fontFace: 'Aptos', fontSize: 8, color: '6C8C91', charSpacing: 1.8, bold: true })
    page.addText(`${String(index + 1).padStart(2, '0')} / ${String(slides.length).padStart(2, '0')}`, { x: 11.65, y: 0.42, w: 1, h: 0.25, fontFace: 'Aptos', fontSize: 8, color: '6C8C91', align: 'right' })
    page.addText(slide.kicker ?? 'HASHFORGE PRO', { x: 0.65, y: 1.35, w: 5.4, h: 0.3, fontFace: 'Aptos', fontSize: 9, color: slide.color.replace('#', ''), charSpacing: 1.5, bold: true })
    page.addText(slide.title, { x: 0.65, y: 1.75, w: 6.2, h: 1.05, fontFace: 'Aptos Display', fontSize: 30, color: 'E8F1F2', bold: true, margin: 0, breakLine: false, fit: 'shrink' })
    const body = [slide.subtitle, slide.text, ...(slide.bullets ?? []).map((bullet) => `• ${bullet}`)].filter(Boolean).join('\n')
    page.addText(body, { x: 0.65, y: 3.0, w: 5.8, h: 1.65, fontFace: 'Aptos', fontSize: 13, color: '94ABB0', margin: 0, breakLine: false, fit: 'shrink' })
    page.addShape(deck.ShapeType.ellipse, { x: 8.0, y: 1.25, w: 3.4, h: 3.4, line: { color: slide.color.replace('#', ''), transparency: 35, width: 1 }, fill: { color: '0D1A20', transparency: 5 } })
    page.addShape(deck.ShapeType.ellipse, { x: 8.65, y: 1.9, w: 2.1, h: 2.1, line: { color: slide.color.replace('#', ''), transparency: 10, width: 1 }, fill: { color: '0D1A20', transparency: 100 } })
    page.addText(slide.visual, { x: 8.25, y: 2.45, w: 2.9, h: 0.6, fontFace: 'Aptos Mono', fontSize: 22, color: slide.color.replace('#', ''), bold: true, align: 'center', margin: 0, fit: 'shrink' })
    page.addText('Interactive Cryptographic & Malware Analysis Laboratory', { x: 0.65, y: 6.85, w: 7, h: 0.2, fontFace: 'Aptos', fontSize: 7, color: '5F797F' })
  })
  await deck.writeFile({ fileName: 'hashforge-presentation.pptx' })
}

export function downloadPdf(slides: PresentationSlide[]) {
  const pdf = new jsPDF({ orientation: 'landscape', unit: 'pt', format: 'a4' })
  const width = pdf.internal.pageSize.getWidth(); const height = pdf.internal.pageSize.getHeight()
  slides.forEach((slide, index) => {
    if (index) pdf.addPage()
    pdf.setFillColor('#091116'); pdf.rect(0, 0, width, height, 'F')
    pdf.setTextColor('#6C8C91'); pdf.setFontSize(8); pdf.text('HASHFORGE PRO  /  CLASSROOM MODE', 44, 35); pdf.text(`${String(index + 1).padStart(2, '0')} / ${String(slides.length).padStart(2, '0')}`, width - 80, 35)
    pdf.setTextColor(slide.color); pdf.setFontSize(9); pdf.text(slide.kicker ?? 'HASHFORGE PRO', 44, 115)
    pdf.setTextColor('#E8F1F2'); pdf.setFontSize(31); pdf.setFont('helvetica', 'bold'); pdf.text(slide.title, 44, 175, { maxWidth: 370 })
    pdf.setFont('helvetica', 'normal'); pdf.setFontSize(13); pdf.setTextColor('#94ABB0'); const body = [slide.subtitle, slide.text, ...(slide.bullets ?? []).map((bullet) => `• ${bullet}`)].filter(Boolean).join('\n'); pdf.text(pdf.splitTextToSize(body, 360), 44, 230, { lineHeightFactor: 1.5 })
    pdf.setDrawColor(slide.color); pdf.setLineWidth(1); pdf.circle(width - 190, height / 2, 105); pdf.setLineDashPattern([4, 4], 0); pdf.circle(width - 190, height / 2, 65); pdf.setLineDashPattern([], 0)
    pdf.setFont('courier', 'bold'); pdf.setFontSize(25); pdf.setTextColor(slide.color); pdf.text(slide.visual, width - 190, height / 2 + 8, { align: 'center' })
  })
  pdf.save('hashforge-presentation.pdf')
}

function downloadBlob(blob: Blob, filename: string) {
  const link = document.createElement('a'); link.href = URL.createObjectURL(blob); link.download = filename; link.click(); URL.revokeObjectURL(link.href)
}
