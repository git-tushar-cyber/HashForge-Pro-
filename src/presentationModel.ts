export type PresentationSlide = {
  id: string
  kind: 'title' | 'problem' | 'why' | 'solution' | 'flow' | 'modules' | 'avalanche' | 'merkle' | 'file' | 'malware' | 'other' | 'compare' | 'technology' | 'benefits' | 'future' | 'final' | 'custom'
  title: string
  subtitle?: string
  text: string
  bullets?: string[]
  notes?: string
  visual: string
  color: string
  kicker?: string
}

export const PRESENTATION_STORAGE_KEY = 'hashforge-presentation-slides'

export const DEFAULT_PRESENTATION_SLIDES: PresentationSlide[] = [
  { id: 'title', kind: 'title', title: 'HASHFORGE PRO', subtitle: 'Interactive Cryptographic & Malware Analysis Laboratory', text: 'Making cryptography easier to understand through interactive experiments.', visual: '01', color: '#39d7a4', kicker: 'PROJECT PRESENTATION', notes: 'Introduce the project as a practical learning and analysis tool. The main idea is simple: students understand security concepts better when they can change inputs and see the result.' },
  { id: 'problem', kind: 'problem', title: 'The Problem', text: 'Hashing is easy to read about, but difficult to understand without practical interaction.', bullets: ['Students rely on slides, textbook diagrams, and static examples.', 'It is hard to see how a hash changes or how a Merkle tree grows.', 'Security use cases can feel disconnected from the classroom.'], visual: 'THEORY → ?', color: '#ff7d92', kicker: '01 / THE PROBLEM', notes: 'Students usually learn hashing from slides and examples. When we ask what happens after changing one character, it is difficult to actually see the change.' },
  { id: 'why', kind: 'why', title: 'Why is this important?', text: 'Security students should understand what happens when the input changes.', bullets: ['Cybersecurity: understand secure data checks.', 'Malware analysis: compare suspicious samples safely.', 'Digital forensics: verify evidence and file integrity.', 'Password security and distributed systems: connect theory to real workflows.'], visual: 'WHY', color: '#f7dd72', kicker: '02 / WHY IT MATTERS', notes: 'Hashing is used in many security workflows. Understanding the behavior is more useful than memorizing one definition.' },
  { id: 'solution', kind: 'solution', title: 'Our Solution — HashForge Pro', text: 'An interactive learning and analysis tool where students experiment with hash functions instead of only reading about them.', bullets: ['Real browser-based cryptography', 'Safe synthetic examples', 'Visual results students can explain'], visual: 'LAB', color: '#39d7a4', kicker: '03 / OUR SOLUTION', notes: 'HashForge Pro turns the classroom into a small laboratory. Every result is generated in the browser, and the tool clearly labels educational limits.' },
  { id: 'flow', kind: 'flow', title: 'From Theory to Experiment', text: 'The learning loop is short and visible.', bullets: ['CONCEPT', 'INTERACTIVE EXPERIMENT', 'VISUAL RESULT', 'UNDERSTANDING'], visual: '→', color: '#6aa8ff', kicker: '04 / HOW IT WORKS', notes: 'The product connects a concept to an action and then to a visible result. That makes it easier to explain what happened during a viva or classroom demonstration.' },
  { id: 'modules', kind: 'modules', title: 'One Tool, Multiple Experiments', text: 'Each laboratory focuses on one security question.', bullets: ['Avalanche: see how a tiny change creates a very different hash.', 'Merkle Tree: see how many hashes become one root hash.', 'HMAC: understand why a plain hash is not enough for authentication.', 'Entropy, Password, Fuzzy, Birthday, and Forensics labs.'], visual: '08', color: '#d2a7ff', kicker: '05 / THE LABORATORIES', notes: 'Briefly point across the labs, then use the next slides to show the strongest moments live.' },
  { id: 'avalanche', kind: 'avalanche', title: "Let's See It Live", text: 'A one-character change creates a very different digest.', visual: 'Δ', color: '#39d7a4', kicker: '06 / LIVE DEMO · AVALANCHE', notes: 'Ask the audience to watch the input change from Hello World to Hello World!. The digest changes completely even though the visible input change is tiny.' },
  { id: 'merkle', kind: 'merkle', title: 'How Does a Merkle Tree Work?', text: 'Four data blocks become one root hash. Change one block and watch the path to the root update.', visual: 'ROOT', color: '#ffb86b', kicker: '07 / LIVE DEMO · MERKLE', notes: 'Edit Block B during the demo. Explain that the root changes because each parent depends on the hashes below it.' },
  { id: 'file', kind: 'file', title: 'Can We Know If a File Was Changed?', text: 'A local file fingerprint gives us a clear comparison between two versions.', visual: 'FILE', color: '#6aa8ff', kicker: '08 / LIVE DEMO · FILE INTEGRITY', notes: 'Use the harmless synthetic versions in this slide. The same workflow also exists in the File Integrity lab for a local file selected by the user.' },
  { id: 'malware', kind: 'malware', title: 'How Can Analysts Use This?', text: 'A hash is a file fingerprint that helps analysts identify and compare samples.', bullets: ['Suspicious file', 'Generate SHA-256', 'Compare with known information', 'Continue the investigation'], visual: 'CASE', color: '#ff7d92', kicker: '09 / SECURITY USE CASE', notes: 'A hash match helps identify the compared bytes. It does not prove that a file is malicious on its own.' },
  { id: 'other', kind: 'other', title: 'What Else Can We Explore?', text: 'The other labs answer common security questions in simple experiments.', bullets: ['HMAC: why a plain hash is not enough for authentication.', 'Entropy: whether output looks evenly distributed in a sample.', 'Password hashing: why salts and extra work matter.', 'Fuzzy hashing and birthday collisions: compare related files and collision chances.'], visual: 'MORE', color: '#f7dd72', kicker: '10 / OTHER EXPERIMENTS', notes: 'These modules let the presenter choose a deeper follow-up based on faculty questions.' },
  { id: 'compare', kind: 'compare', title: 'Why Our Tool?', text: 'HashForge Pro turns passive study into active understanding.', bullets: ['Traditional learning: read, see a static diagram, memorize.', 'HashForge Pro: interact, experiment, visualize, understand.'], visual: '↔', color: '#39d7a4', kicker: '11 / DIFFERENCE', notes: 'The difference is the feedback loop. Students can test an idea immediately instead of waiting for a worked example.' },
  { id: 'technology', kind: 'technology', title: 'Technology Behind the Tool', text: 'A browser-first stack keeps the experiments fast and private.', bullets: ['React + TypeScript: structured interactive interface.', 'Web Crypto API: real browser-based cryptographic hashing.', 'Recharts: clear experiment graphs.', 'Web Workers and local processing: responsive, private experiments.'], visual: 'STACK', color: '#6aa8ff', kicker: '12 / TECHNOLOGY', notes: 'Keep this slide high level. The technical point is that the cryptography runs locally in the browser rather than uploading student data.' },
  { id: 'benefits', kind: 'benefits', title: 'What Students Can Learn', text: 'The project supports both understanding and safe practice.', bullets: ['Understand hash functions and cryptographic properties.', 'Practice file integrity checking.', 'Connect hashes to malware-analysis workflows.', 'Experiment safely with visual examples.'], visual: '✓', color: '#d2a7ff', kicker: '13 / BENEFITS', notes: 'This is the educational outcome slide. Emphasize that the tool helps students explain the behavior, not just repeat vocabulary.' },
  { id: 'future', kind: 'future', title: 'What Can We Add Next?', text: 'Future work can grow the laboratory without losing its simple workflow.', bullets: ['More algorithms and forensic experiments.', 'More learning challenges and teacher classroom controls.', 'Offline support and additional cybersecurity labs.'], visual: 'NEXT', color: '#ffb86b', kicker: '14 / FUTURE SCOPE', notes: 'Present these as realistic next steps. The current product already provides a base for adding more experiments.' },
  { id: 'final', kind: 'final', title: 'From Reading Cryptography to Experiencing It', subtitle: 'HashForge Pro turns abstract cryptography concepts into interactive experiments.', text: 'THANK YOU · Let’s explore the tool.', visual: 'END', color: '#39d7a4', kicker: '15 / THANK YOU', notes: 'Close by inviting the faculty to try a live lab. Return to the actual HashForge Pro dashboard after this slide.' },
]

function isSlide(value: unknown): value is PresentationSlide {
  if (!value || typeof value !== 'object') return false
  const slide = value as Partial<PresentationSlide>
  return typeof slide.id === 'string' && typeof slide.kind === 'string' && typeof slide.title === 'string' && typeof slide.text === 'string' && typeof slide.visual === 'string' && typeof slide.color === 'string'
}

export function loadPresentationSlides() {
  try {
    const stored = localStorage.getItem(PRESENTATION_STORAGE_KEY)
    if (!stored) return DEFAULT_PRESENTATION_SLIDES
    const parsed: unknown = JSON.parse(stored)
    return Array.isArray(parsed) && parsed.length > 0 && parsed.every(isSlide) ? parsed : DEFAULT_PRESENTATION_SLIDES
  } catch {
    return DEFAULT_PRESENTATION_SLIDES
  }
}

export function makeSlide(index: number): PresentationSlide {
  return { id: `custom-${Date.now()}-${index}`, kind: 'custom', title: 'New slide', subtitle: '', text: 'Add a short explanation for your audience.', bullets: [], notes: '', visual: 'NEW', color: '#39d7a4', kicker: 'CUSTOM SLIDE' }
}
