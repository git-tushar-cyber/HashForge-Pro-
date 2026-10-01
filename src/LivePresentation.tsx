import { useEffect, useMemo, useState } from 'react'
import { ArrowLeft, ArrowRight, FileCheck2, Maximize2, MonitorPlay, Network, StickyNote, X } from 'lucide-react'
import { hashText, hammingDistance, merkleLevels } from './crypto'
import type { PresentationSlide } from './presentationModel'

type Props = { slides: PresentationSlide[]; setPage: (page: 'dashboard' | 'presentation-editor') => void }

export default function LivePresentation({ slides, setPage }: Props) {
  const [slide, setSlide] = useState(0)
  const [showNotes, setShowNotes] = useState(false)
  const [controls, setControls] = useState(true)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const currentIndex = Math.min(slide, Math.max(0, slides.length - 1))
  const current = slides[currentIndex]
  const go = (direction: -1 | 1) => setSlide((value) => Math.min(slides.length - 1, Math.max(0, value + direction)))
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => { if (event.key === 'ArrowRight') go(1); if (event.key === 'ArrowLeft') go(-1); if (event.key === 'Escape') setPage('dashboard') }
    const onMouse = () => { setControls(true); window.clearTimeout((onMouse as typeof onMouse & { timer?: number }).timer); (onMouse as typeof onMouse & { timer?: number }).timer = window.setTimeout(() => setControls(false), 3000) }
    window.addEventListener('keydown', onKey); window.addEventListener('mousemove', onMouse); onMouse()
    return () => { window.removeEventListener('keydown', onKey); window.removeEventListener('mousemove', onMouse) }
  }, [slides.length])
  const fullscreen = async () => { if (!document.fullscreenElement) { await document.documentElement.requestFullscreen?.(); setIsFullscreen(true) } else { await document.exitFullscreen?.(); setIsFullscreen(false) } }
  return <div className="live-presentation" onMouseMove={() => setControls(true)}><div className={`live-slide ${controls ? 'controls-visible' : ''}`} key={current.id} style={{ '--slide-color': current.color } as React.CSSProperties}><div className="live-top"><span className="live-brand">HASHFORGE PRO <i /> PROJECT DEMO</span><span className="live-counter">{String(currentIndex + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}</span></div><SlideBody slide={current} /><div className="live-footer"><span className="live-hint">ARROW KEYS TO NAVIGATE · ESC TO EXIT</span><div className="live-controls"><button onClick={() => go(-1)} disabled={currentIndex === 0} title="Previous slide"><ArrowLeft size={16} /></button><button onClick={() => go(1)} disabled={currentIndex === slides.length - 1} title="Next slide"><ArrowRight size={16} /></button><button onClick={() => setShowNotes((value) => !value)} className={showNotes ? 'control-active' : ''} title="Show presenter notes"><StickyNote size={16} /></button><button onClick={() => void fullscreen()} title="Fullscreen"><Maximize2 size={16} /></button><button onClick={() => setPage('presentation-editor')} title="Edit presentation"><FileCheck2 size={16} /></button><button onClick={() => setPage('dashboard')} title="Exit presentation"><X size={16} /></button></div></div>{showNotes && <aside className="notes-drawer"><div className="eyebrow">PRESENTER NOTES</div><p>{current.notes || 'No notes for this slide yet.'}</p></aside>}</div></div>
}

function CyberBackground() { const nodes = useMemo(() => Array.from({ length: 17 }, (_, index) => ({ left: `${(index * 47) % 97}%`, top: `${(index * 31) % 92}%`, delay: `${(index % 6) * .8}s` })), []); return <div className="cyber-background" aria-hidden="true"><div className="grid-plane" />{nodes.map((node, index) => <span className="cyber-node" key={index} style={{ left: node.left, top: node.top, animationDelay: node.delay }} />)}<div className="data-stream stream-one">0101 · HASH · 1010 · ROOT ·</div><div className="data-stream stream-two">SHA-256 / HMAC / PBKDF2 /</div></div> }

function SlideBody({ slide }: { slide: PresentationSlide }) {
  const [inputA, setInputA] = useState('Hello World')
  const [inputB, setInputB] = useState('Hello World!')
  const [hashes, setHashes] = useState({ a: '', b: '' })
  const [blocks, setBlocks] = useState(['Block A', 'Block B', 'Block C', 'Block D'])
  const [levels, setLevels] = useState<string[][]>([])
  const [fileChanged, setFileChanged] = useState(false)
  const [fileHashes, setFileHashes] = useState({ original: '', modified: '' })
  useEffect(() => { let active = true; void Promise.all([hashText(inputA), hashText(inputB)]).then(([a, b]) => active && setHashes({ a, b })); return () => { active = false } }, [inputA, inputB])
  useEffect(() => { let active = true; void merkleLevels(blocks).then((value) => active && setLevels(value)); return () => { active = false } }, [blocks])
  useEffect(() => { let active = true; void Promise.all([hashText('HashForge synthetic report v1'), hashText('HashForge synthetic report v2')]).then(([original, modified]) => active && setFileHashes({ original, modified })); return () => { active = false } }, [])
  const distance = hashes.a && hashes.b ? hammingDistance(hashes.a, hashes.b) : 0
  const bullets = slide.bullets ?? []
  if (slide.kind === 'avalanche') return <div className="demo-slide-body"><SlideHeading slide={slide} /><div className="avalanche-demo"><label>Input A<input value={inputA} onChange={(event) => setInputA(event.target.value)} /></label><label>Input B<input value={inputB} onChange={(event) => setInputB(event.target.value)} /></label><div className="hash-compare"><HashReadout label="HASH A" value={hashes.a} /><HashReadout label="HASH B" value={hashes.b} /></div><div className="avalanche-meter"><span>Changed bits</span><b>{distance} / 256</b><i><em style={{ width: `${Math.min(100, distance / 2.56)}%` }} /></i></div><p className="demo-caption">Small input change <strong>→</strong> large digest change</p></div></div>
  if (slide.kind === 'merkle') return <div className="demo-slide-body"><SlideHeading slide={slide} /><div className="merkle-demo"><div className="merkle-inputs">{blocks.map((block, index) => <label key={index}><span>BLOCK {String.fromCharCode(65 + index)}</span><input value={block} onChange={(event) => setBlocks(blocks.map((item, itemIndex) => itemIndex === index ? event.target.value : item))} /></label>)}</div><div className="merkle-flow"><span>DATA</span><b>↓</b><span>LEAF HASHES</span><b>↓</b><span>PARENT HASHES</span><b>↓</b><strong>MERKLE ROOT</strong><code>{levels.length ? levels[levels.length - 1][0] : 'calculating…'}</code></div></div></div>
  if (slide.kind === 'file') return <div className="demo-slide-body"><SlideHeading slide={slide} /><div className="file-demo"><div className="file-version"><span>ORIGINAL FILE</span><b>synthetic_report.txt</b><code>{fileHashes.original || 'calculating…'}</code></div><div className="file-arrow">↓</div><div className={`file-version ${fileChanged ? 'modified-version' : ''}`}><span>{fileChanged ? 'MODIFIED FILE' : 'CURRENT FILE'}</span><b>synthetic_report.txt</b><code>{fileChanged ? fileHashes.modified : fileHashes.original || 'calculating…'}</code></div><button className="demo-action" onClick={() => setFileChanged((value) => !value)}>{fileChanged ? 'Restore original' : 'Change one byte'}</button><strong className={fileChanged ? 'file-status changed' : 'file-status'}>{fileChanged ? '✕ MODIFIED' : '✓ SAME'}</strong></div></div>
  return <div className="generic-slide-body"><SlideHeading slide={slide} />{slide.kind === 'title' || slide.kind === 'final' ? <div className="statement">{slide.subtitle || slide.text}</div> : slide.kind === 'flow' ? <div className="story-flow">{bullets.map((bullet, index) => <div key={bullet}><span>{bullet}</span>{index < bullets.length - 1 && <b>↓</b>}</div>)}</div> : slide.kind === 'modules' ? <div className="module-showcase">{bullets.map((bullet) => { const [name, ...rest] = bullet.split(':'); return <div key={bullet}><span>{name}</span><small>{rest.join(':').trim()}</small></div> })}</div> : <div className="bullet-showcase">{bullets.map((bullet, index) => <div key={bullet}><i>{String(index + 1).padStart(2, '0')}</i><span>{bullet}</span></div>)}</div>}</div>
}

function SlideHeading({ slide }: { slide: PresentationSlide }) { return <div className="slide-heading"><span className="slide-kicker">{slide.kicker}</span><h1>{slide.title}</h1><p>{slide.text}</p></div> }
function HashReadout({ label, value }: { label: string; value: string }) { return <div className="hash-readout"><span>{label}</span><code>{value || 'calculating…'}</code></div> }
