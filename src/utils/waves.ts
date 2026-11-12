export interface WaveSetting {
  amp: number;
  k: number;
  dur: number;
}

interface WaveOptions {
  axis: 'x' | 'y';
  frames?: number;
}

interface Box {
  axis: 'x' | 'y';
  width: number;
  height: number;
}

function shiftPath(d: string, cfg: WaveSetting, phase: number, { axis, width, height }: Box) {
  let lastX = 0;
  let lastY = 0;
  const wave = (t: number, size: number) => cfg.amp * Math.sin((2 * Math.PI * cfg.k * t) / size + phase);
  const moveX = (x: number, y: number) => {
    if (axis !== 'x') return x;
    if (x < 1) return 0;
    if (x < width / 2 || x >= width - 1) return x;
    return +(x + wave(y, height)).toFixed(2);
  };
  const moveY = (x: number, y: number) => {
    if (axis !== 'y' || y <= 0 || y >= height) return y;
    return +(y + wave(x, width)).toFixed(2);
  };

  return d.replace(/([MLCHVZ])([^MLCHVZ]*)/g, (_, cmd: string, args: string) => {
    const n = (args.match(/-?\d*\.?\d+(?:e-?\d+)?/g) ?? []).map(Number);
    if (cmd === 'Z') return 'Z';
    if (cmd === 'H') {
      const out = n.map((x) => moveX(x, lastY));
      lastX = n[n.length - 1];
      return `H${out.join(' ')}`;
    }
    if (cmd === 'V') {
      const out = n.map((y) => moveY(lastX, y));
      lastY = n[n.length - 1];
      return `V${out.join(' ')}`;
    }
    const out: number[] = [];
    for (let i = 0; i < n.length; i += 2) {
      const [x, y] = [n[i], n[i + 1]];
      out.push(moveX(x, y), moveY(x, y));
      lastX = x;
      lastY = y;
    }
    return cmd + out.join(' ');
  });
}

export function animateWaves(svg: string, settings: (WaveSetting | null)[], { axis, frames = 8 }: WaveOptions) {
  const [, , width, height] = (svg.match(/viewBox="([^"]+)"/)?.[1] ?? '0 0 100 100').split(/[\s,]+/).map(Number);
  const box = { axis, width, height };
  const stretched = svg.replace(/<svg\b([^>]*?)\s*preserveAspectRatio="[^"]*"/, '<svg$1').replace('<svg', '<svg preserveAspectRatio="none"');
  let pathIndex = -1;
  return stretched.replace(/<path d="([^"]+)"([^>]*?)\/>/g, (match, d: string, rest: string) => {
    pathIndex += 1;
    const cfg = settings[pathIndex];
    if (!cfg) return match;
    const values = Array.from({ length: frames + 1 }, (_, f) => shiftPath(d, cfg, (2 * Math.PI * f) / frames, box));
    return `<path d="${values[0]}"${rest}><animate attributeName="d" dur="${cfg.dur}s" repeatCount="indefinite" values="${values.join(';')}" /></path>`;
  });
}
