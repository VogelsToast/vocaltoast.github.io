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
const ACCENT = '#0f4c81';
const ACCENT_LIGHT = '#1d6fbd';
const GRAY_500 = '#78716c';
const DIVIDER = '#1e1a18';

function titleFontSize(title: string): number {
  if (title.length < 40) return 66;
  if (title.length < 60) return 58;
  if (title.length < 80) return 50;
  if (title.length < 100) return 44;
  return 38;
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
              // Eyebrow
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
              // Headline — split across three divs to control line breaks
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
// Per-post OG image
// ---------------------------------------------------------------------------

export async function renderPostOg(
  title: string,
  description: string,
  tag?: string
): Promise<Buffer> {
  const fonts = getOgFonts();
  const fontSize = titleFontSize(title);

  const tagElement = {
    type: 'div',
    props: {
      style: {
        display: 'flex',
        alignSelf: 'flex-start',
        background: ACCENT,
        borderRadius: '3px',
        padding: '6px 16px',
        marginBottom: '28px',
      },
      children: {
        type: 'span',
        props: {
          style: {
            fontFamily: 'Inter',
            fontWeight: 600,
            fontSize: '13px',
            color: WHITE,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            display: 'flex',
          },
          children: tag,
        },
      },
    },
  };

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
              // Tag pill (conditional)
              ...(tag ? [tagElement] : []),
              // Title
              {
                type: 'div',
                props: {
                  style: {
                    fontFamily: 'Playfair Display',
                    fontWeight: 700,
                    fontSize: `${fontSize}px`,
                    color: WHITE,
                    lineHeight: 1.15,
                    letterSpacing: '-0.01em',
                    marginBottom: '24px',
                    display: '-webkit-box',
                    WebkitLineClamp: 4,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                  },
                  children: title,
                },
              },
              // Description
              {
                type: 'div',
                props: {
                  style: {
                    fontFamily: 'Inter',
                    fontWeight: 400,
                    fontSize: '20px',
                    color: GRAY_500,
                    lineHeight: 1.55,
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                  },
                  children: description,
                },
              },
              // Spacer — pushes footer to bottom
              { type: 'div', props: { style: { flex: 1 } } },
              footer('Zac Culpan', 'zacculpan.com'),
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
