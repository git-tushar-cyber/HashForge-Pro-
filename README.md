# HashForge Pro

HashForge Pro is an interactive cryptographic and malware-analysis laboratory for TY B.Sc. CDS coursework. It keeps experiments in the browser and makes the security boundary visible: hashes are not encryption, fuzzy similarity is not proof, and statistical output tests are not security proofs.

## Included laboratories

- Hash Explorer with SHA-256, SHA-384, and SHA-512 using Web Crypto.
- Merkle tree construction with editable leaves and real parent/root hashes.
- Controlled HMAC vs. naive secret-prefix MAC comparison.
- Entropy, byte distribution, and neighboring digest hamming-distance experiments.
- PBKDF2 password key-stretching simulator with a non-persistent demo password.
- Synthetic fuzzy-hashing similarity simulator, explicitly not ssdeep.
- Birthday collision probability curves for toy and real digest sizes.
- Local-only file integrity hashing and baseline comparison.
- Presentation Mode, glossary, and local experiment history.
- Fully editable Presentation Editor with add, delete, duplicate, reorder, reset, and autosave.
- PPTX, PDF, and JSON export from the same saved presentation model used by Live Presentation.
- Faculty-facing project presentation flow: problem, motivation, solution, live demos, use cases, benefits, and future scope.
- Live Presentation controls with fullscreen, keyboard navigation, reduced-motion support, animated background, and presenter notes.

## Run locally

```bash
npm install
npm run dev
```

Production verification:

```bash
npm run build
npm run preview
npm run test
```

## Architecture

`src/crypto.ts` contains browser-side cryptographic and measurement utilities. `src/App.tsx` contains the feature views and local state orchestration. `src/presentationModel.ts` is the shared saved slide model used by both the editor and Live Presentation. `src/presentationExports.ts` contains browser-side PPTX, PDF, and JSON export. `src/styles.css` and `src/editor.css` provide the responsive research-lab visual system. History and presentation edits are stored as non-sensitive metadata in localStorage. Files are processed locally through the File API and Web Crypto API; no backend or upload pipeline is used.

The default deck is a project presentation rather than a textbook lesson. It includes real interactive avalanche, Merkle tree, and synthetic file-integrity demos. Use the Presentation Editor to change titles, subtitles, body text, bullets, notes, colors, or visual tokens before presenting.

## Security and educational limits

This application uses harmless synthetic examples. It does not execute malware, contact external systems, crack passwords, or upload files. The HMAC module explains the length-extension boundary without pretending to perform an attack against a real system. For production password storage, use a vetted password-hashing system such as Argon2id, scrypt, or bcrypt where appropriate; PBKDF2 here is a browser-native teaching aid.
