const OLIVE = '#3d4a2a';
const BONE = '#f7f1e3';
const AMBER = '#d97a3c';

type Coord = [number, number];
type IconDef = { pattern: Coord[]; accent: Coord[] };

export type IconName =
  | 'web'
  | 'systems'
  | 'automation'
  | 'ai'
  | 'digital'
  | 'maintenance';

export const ICONS: Record<IconName, IconDef> = {
  web: {
    pattern: [[0,0],[1,0],[2,0],[3,0],[4,0],[0,1],[4,1],[0,4],[1,4],[2,4],[3,4],[4,4]],
    accent: [[2,2]],
  },
  systems: {
    pattern: [[0,0],[1,0],[3,0],[4,0],[0,1],[1,1],[3,1],[4,1],[0,3],[1,3],[3,3],[4,3],[0,4],[1,4],[3,4],[4,4]],
    accent: [[2,2]],
  },
  automation: {
    pattern: [[0,2],[1,2],[2,2],[3,2],[4,0],[4,1],[4,2],[1,3],[1,4]],
    accent: [[4,2]],
  },
  ai: {
    pattern: [[2,0],[1,1],[2,1],[3,1],[0,2],[1,2],[3,2],[4,2],[1,3],[2,3],[3,3],[2,4]],
    accent: [[2,2]],
  },
  digital: {
    pattern: [[0,0],[2,0],[4,0],[1,1],[3,1],[2,2],[1,3],[3,3],[0,4],[2,4],[4,4]],
    accent: [[2,2]],
  },
  maintenance: {
    pattern: [[0,0],[0,1],[0,2],[0,3],[0,4],[1,4],[2,4],[3,4],[4,4],[2,0],[2,1],[2,2],[3,2],[4,2]],
    accent: [[4,0]],
  },
};

export default function SvcIcon({
  name,
  size = 44,
  dark = false,
}: {
  name: IconName;
  size?: number;
  dark?: boolean;
}) {
  const def = ICONS[name];
  const u = size / 5;
  const fg = dark ? BONE : OLIVE;
  const accentSet = new Set(def.accent.map(([x, y]) => `${x},${y}`));

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {def.pattern.map(([x, y], i) => {
        const isAccent = accentSet.has(`${x},${y}`);
        return (
          <rect
            key={i}
            x={x * u + 0.5}
            y={y * u + 0.5}
            width={u - 1}
            height={u - 1}
            fill={isAccent ? AMBER : fg}
          />
        );
      })}
    </svg>
  );
}
