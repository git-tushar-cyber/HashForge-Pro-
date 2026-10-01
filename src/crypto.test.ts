import { describe, expect, it } from 'vitest'
import { birthdayProbability, fuzzySimilarity, hashText, hammingDistance, merkleRoot, pbkdf2Text, shannonEntropy } from './crypto'

describe('cryptographic utilities', () => {
  it('matches SHA-256 known vector', async () => expect(await hashText('hello')).toBe('2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824'))
  it('supports SHA-384 and SHA-512', async () => { expect((await hashText('', 'SHA-384')).length).toBe(96); expect((await hashText('', 'SHA-512')).length).toBe(128) })
  it('changes Merkle root when a leaf changes', async () => { const a = await merkleRoot(['A', 'B', 'C', 'D']); const b = await merkleRoot(['A', 'X', 'C', 'D']); expect(a).not.toBe(b) })
  it('calculates hamming distance', () => expect(hammingDistance('00', 'ff')).toBe(8))
  it('calculates entropy and birthday probability', () => { expect(shannonEntropy([0, 1])).toBe(1); expect(birthdayProbability(8, 2)).toBeGreaterThan(0); expect(birthdayProbability(8, 100)).toBeGreaterThan(.9) })
  it('scores similar content higher than unrelated content', () => expect(fuzzySimilarity('a suspicious document sample', 'a suspicious document sample changed')).toBeGreaterThan(fuzzySimilarity('a suspicious document sample', 'completely unrelated text'))) 
  it('derives PBKDF2 output', async () => expect((await pbkdf2Text('password', 'salt', 1000)).length).toBe(64))
})
