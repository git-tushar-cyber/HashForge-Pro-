export type HashAlgorithm = 'SHA-256' | 'SHA-384' | 'SHA-512'

const encoder = new TextEncoder()

export function bytesToHex(bytes: ArrayBuffer | Uint8Array) {
  const view = bytes instanceof ArrayBuffer ? new Uint8Array(bytes) : bytes
  return Array.from(view)
    .map((b) => b.toString(16).padStart(2, '0')).join('')
}

export async function hashText(text: string, algorithm: HashAlgorithm = 'SHA-256') {
  return bytesToHex(await crypto.subtle.digest(algorithm, encoder.encode(text)))
}

export async function hashBytes(bytes: ArrayBuffer, algorithm: HashAlgorithm = 'SHA-256') {
  return bytesToHex(await crypto.subtle.digest(algorithm, bytes))
}

export async function hmacText(secret: string, message: string, algorithm: HashAlgorithm = 'SHA-256') {
  const key = await crypto.subtle.importKey('raw', encoder.encode(secret), { name: 'HMAC', hash: algorithm }, false, ['sign'])
  return bytesToHex(await crypto.subtle.sign('HMAC', key, encoder.encode(message)))
}

export async function pbkdf2Text(password: string, salt: string, iterations: number) {
  const key = await crypto.subtle.importKey('raw', encoder.encode(password), 'PBKDF2', false, ['deriveBits'])
  return bytesToHex(await crypto.subtle.deriveBits({ name: 'PBKDF2', salt: encoder.encode(salt), iterations, hash: 'SHA-256' }, key, 256))
}

export function hexToBytes(hex: string) {
  if (!/^[0-9a-f]+$/i.test(hex) || hex.length % 2) throw new Error('Invalid hexadecimal digest')
  return new Uint8Array(hex.match(/.{2}/g)!.map((byte) => parseInt(byte, 16)))
}

export function hammingDistance(a: string, b: string) {
  const left = hexToBytes(a), right = hexToBytes(b)
  const length = Math.min(left.length, right.length)
  let distance = Math.abs(left.length - right.length) * 8
  for (let i = 0; i < length; i++) {
    let x = left[i] ^ right[i]
    while (x) { distance += x & 1; x >>>= 1 }
  }
  return distance
}

export function shannonEntropy(values: number[]) {
  if (!values.length) return 0
  const counts = new Map<number, number>()
  values.forEach((v) => counts.set(v, (counts.get(v) ?? 0) + 1))
  return Array.from(counts.values()).reduce((sum, count) => {
    const p = count / values.length
    return sum - p * Math.log2(p)
  }, 0)
}

export function fuzzySimilarity(a: string, b: string) {
  const grams = (input: string) => new Set(input.toLowerCase().replace(/\s+/g, ' ').match(/.{1,6}/g) ?? [])
  const left = grams(a), right = grams(b)
  const intersection = [...left].filter((item) => right.has(item)).length
  return Math.round((2 * intersection / Math.max(left.size + right.size, 1)) * 100)
}

export function birthdayProbability(bits: number, samples: number) {
  if (samples < 2) return 0
  const space = 2 ** bits
  if (bits > 52 || samples > 10_000_000) return 1 - Math.exp(-(samples * (samples - 1)) / (2 * space))
  let noCollision = 1
  for (let i = 0; i < samples; i++) {
    if (i >= space) return 1
    noCollision *= (space - i) / space
    if (noCollision < 1e-12) return 1
  }
  return 1 - noCollision
}

export function birthdayBound(bits: number) { return Math.sqrt(2 * Math.log(2) * 2 ** bits) }

export async function merkleRoot(blocks: string[]) {
  if (!blocks.length) return ''
  let level = await Promise.all(blocks.map((block) => hashText(block)))
  while (level.length > 1) {
    const next: string[] = []
    for (let i = 0; i < level.length; i += 2) next.push(await hashText(level[i] + (level[i + 1] ?? level[i])))
    level = next
  }
  return level[0]
}

export async function merkleLevels(blocks: string[]) {
  if (!blocks.length) return [] as string[][]
  const levels = [await Promise.all(blocks.map((block) => hashText(block)))]
  while (levels[0].length > 1) {
    const current = levels[0]
    const next: string[] = []
    for (let i = 0; i < current.length; i += 2) next.push(await hashText(current[i] + (current[i + 1] ?? current[i])))
    levels.unshift(next)
  }
  return levels
}
