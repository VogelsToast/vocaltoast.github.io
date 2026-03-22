/**
 * Loads font data for satori from the @fontsource npm packages.
 * Reads WOFF (v1) files from node_modules — no network calls at build time.
 * @fontsource/inter and @fontsource/playfair-display must be installed.
 */

import { readFileSync } from 'node:fs';
import { join } from 'node:path';

export interface OgFont {
  name: string;
  data: ArrayBuffer;
  weight: 400 | 600 | 700;
  style: 'normal' | 'italic';
}

function loadFont(relativePath: string): ArrayBuffer {
  const buf = readFileSync(join(process.cwd(), 'node_modules', relativePath));
  // Convert Node Buffer to ArrayBuffer
  return buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength) as ArrayBuffer;
}

let cache: OgFont[] | null = null;

export function getOgFonts(): OgFont[] {
  if (cache) return cache;

  cache = [
    {
      name: 'Inter',
      data: loadFont('@fontsource/inter/files/inter-latin-400-normal.woff'),
      weight: 400,
      style: 'normal',
    },
    {
      name: 'Inter',
      data: loadFont('@fontsource/inter/files/inter-latin-600-normal.woff'),
      weight: 600,
      style: 'normal',
    },
    {
      name: 'Playfair Display',
      data: loadFont('@fontsource/playfair-display/files/playfair-display-latin-700-normal.woff'),
      weight: 700,
      style: 'normal',
    },
  ];

  return cache;
}
