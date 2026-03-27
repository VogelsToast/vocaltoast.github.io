/**
 * OG image generation using satori (SVG) + @resvg/resvg-js (PNG).
 *
 * Satori expects a React-like element tree of plain objects — no JSX, no React
 * runtime required. CSS custom properties are not supported; hex values are
 * hardcoded here matching the site's design tokens.
 */

import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import { getOgFonts } from './og-fonts';

const W = 1200;
const H = 630;

// Matches src/styles/global.css design tokens
const BLACK = '#0c0a09';
const WHITE = '#ffffff';
const ACCENT = '#0f766e';
const ACCENT_LIGHT = '#0d9488';
const GRAY_500 = '#78716c';
const DIVIDER = '#1e1a18';

function titleFontSize(title: string): number {
  if (title.length < 35) return 68;
  if (title.length < 55) return 56;
  if (title.length < 75) return 48;
  if (title.length < 95) return 40;
  return 34;
}

async function renderSvgToPng(svg: string): Promise<Buffer> {
  const resvg = new Resvg(svg, {
    fitTo: { mode: 'width', value: W },
  });
  const rendered = resvg.render();
  return rendered.asPng();
}

// ---------------------------------------------------------------------------
// Shared element builders
// ---------------------------------------------------------------------------

function accentBar() {
  return {
    type: 'div',
    props: {
      style: {
        width: '10px',
        height: `${H}px`,
        background: ACCENT,
        flexShrink: 0,
      },
    },
  };
}

function footer(left: string, right: string) {
  return {
    type: 'div',
    props: {
      style: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderTop: `1px solid ${DIVIDER}`,
        paddingTop: '22px',
      },
      children: [
        {
          type: 'span',
          props: {
            style: {
              fontFamily: 'Inter',
              fontWeight: 400,
              fontSize: '18px',
              color: GRAY_500,
              display: 'flex',
            },
            children: left,
          },
        },
        {
          type: 'span',
          props: {
            style: {
              fontFamily: 'Inter',
              fontWeight: 600,
              fontSize: '18px',
              color: ACCENT_LIGHT,
              display: 'flex',
            },
            children: right,
          },
        },
      ],
    },
  };
}

// ---------------------------------------------------------------------------
// Growth curve SVG — rendered in the right column of post OG images
// Data points represent compound growth: [8, 12, 15, 24, 38, 58, 88, 135]
// ---------------------------------------------------------------------------

function growthCurve() {
  // Curve path through 8 data points with horizontal tangents (monotone)
  const curve = 'M 20 222 C 40 222,49 215,69 215 C 88 215,98 211,117 211 C 136 211,146 196,166 196 C 185 196,195 173,214 173 C 233 173,243 140,263 140 C 282 140,292 92,311 92 C 330 92,340 15,360 15';
  const area  = 'M 20 235 L 20 222 C 40 222,49 215,69 215 C 88 215,98 211,117 211 C 136 211,146 196,166 196 C 185 196,195 173,214 173 C 233 173,243 140,263 140 C 282 140,292 92,311 92 C 330 92,340 15,360 15 L 360 235 Z';
  const dots  = [
    [20, 222], [69, 215], [117, 211], [166, 196],
    [214, 173], [263, 140], [311, 92], [360, 15],
  ] as const;

  return {
    type: 'svg',
    props: {
      width: '380',
      height: '260',
      viewBox: '0 0 380 260',
      style: { display: 'flex' },
      children: [
        // Horizontal grid lines
        ...[55, 110, 165, 220].map((y) => ({
          type: 'line',
          props: {
            x1: '20', y1: String(y), x2: '360', y2: String(y),
            stroke: 'rgba(255,255,255,0.07)',
            strokeWidth: '1',
          },
        })),
        // Axes
        { type: 'line', props: { x1: '20', y1: '10',  x2: '20',  y2: '235', stroke: 'rgba(255,255,255,0.15)', strokeWidth: '1.5' } },
        { type: 'line', props: { x1: '20', y1: '235', x2: '365', y2: '235', stroke: 'rgba(255,255,255,0.15)', strokeWidth: '1.5' } },
        // Area fill
        { type: 'path', props: { d: area, fill: 'rgba(15,118,110,0.18)', stroke: 'none' } },
        // Growth line
        { type: 'path', props: { d: curve, fill: 'none', stroke: ACCENT, strokeWidth: '3', strokeLinecap: 'round', strokeLinejoin: 'round' } },
        // Data dots
        ...dots.map(([cx, cy]) => ({
          type: 'circle',
          props: { cx: String(cx), cy: String(cy), r: '5', fill: ACCENT },
        })),
      ],
    },
  };
}

// ---------------------------------------------------------------------------
// Default OG image (homepage, about, blog index)
// ---------------------------------------------------------------------------

export async function renderDefaultOg(): Promise<Buffer> {
  const fonts = getOgFonts();

  const element = {
    type: 'div',
    props: {
      style: {
        display: 'flex',
        flexDirection: 'row',
        width: `${W}px`,
        height: `${H}px`,
        background: BLACK,
      },
      children: [
        accentBar(),
        {
          type: 'div',
          props: {
            style: {
              display: 'flex',
              flexDirection: 'column',
              flex: 1,
              padding: '60px 90px 52px 72px',
            },
            children: [
              {
                type: 'div',
                props: {
                  style: {
                    fontFamily: 'Inter',
                    fontWeight: 600,
                    fontSize: '15px',
                    color: ACCENT_LIGHT,
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    display: 'flex',
                    marginBottom: '40px',
                  },
                  children: 'Zac Culpan',
                },
              },
              {
                type: 'div',
                props: {
                  style: {
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 1,
                    justifyContent: 'center',
                  },
                  children: [
                    {
                      type: 'div',
                      props: {
                        style: {
                          fontFamily: 'Playfair Display',
                          fontWeight: 700,
                          fontSize: '76px',
                          color: WHITE,
                          lineHeight: 1.08,
                          letterSpacing: '-0.02em',
                          display: 'flex',
                        },
                        children: 'Thoughts on Growth,',
                      },
                    },
                    {
                      type: 'div',
                      props: {
                        style: {
                          fontFamily: 'Playfair Display',
                          fontWeight: 700,
                          fontSize: '76px',
                          color: WHITE,
                          lineHeight: 1.08,
                          letterSpacing: '-0.02em',
                          display: 'flex',
                        },
                        children: 'Marketing & Product.',
                      },
                    },
                  ],
                },
              },
              footer('Head of Marketing & Product', 'zacculpan.com'),
            ],
          },
        },
      ],
    },
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const svg = await satori(element as any, { width: W, height: H, fonts });
  return renderSvgToPng(svg);
}

// ---------------------------------------------------------------------------
// Per-post OG image — title + growth curve, no description
// ---------------------------------------------------------------------------

export async function renderPostOg(
  title: string,
  _description: string,
  _tag?: string
): Promise<Buffer> {
  const fonts = getOgFonts();
  const fontSize = titleFontSize(title);

  const element = {
    type: 'div',
    props: {
      style: {
        display: 'flex',
        flexDirection: 'row',
        width: `${W}px`,
        height: `${H}px`,
        background: BLACK,
      },
      children: [
        accentBar(),
        // Left column — eyebrow + title + footer
        {
          type: 'div',
          props: {
            style: {
              display: 'flex',
              flexDirection: 'column',
              flex: 1,
              padding: '52px 40px 44px 68px',
            },
            children: [
              // Eyebrow
              {
                type: 'div',
                props: {
                  style: {
                    fontFamily: 'Inter',
                    fontWeight: 600,
                    fontSize: '14px',
                    color: ACCENT_LIGHT,
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    display: 'flex',
                    marginBottom: '28px',
                  },
                  children: 'Zac Culpan',
                },
              },
              // Title
              {
                type: 'div',
                props: {
                  style: {
                    fontFamily: 'Playfair Display',
                    fontWeight: 700,
                    fontSize: `${fontSize}px`,
                    color: WHITE,
                    lineHeight: 1.18,
                    letterSpacing: '-0.01em',
                    display: '-webkit-box',
                    WebkitLineClamp: 4,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    flex: 1,
                  },
                  children: title,
                },
              },
              footer('', 'zacculpan.com'),
            ],
          },
        },
        // Right column — growth curve
        {
          type: 'div',
          props: {
            style: {
              display: 'flex',
              width: '440px',
              alignItems: 'center',
              justifyContent: 'center',
              paddingRight: '44px',
              flexShrink: 0,
            },
            children: growthCurve(),
          },
        },
      ],
    },
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const svg = await satori(element as any, { width: W, height: H, fonts });
  return renderSvgToPng(svg);
}
