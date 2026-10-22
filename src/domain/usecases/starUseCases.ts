export type StarState = 'on' | 'half' | 'off';

export const STAR_TOTAL = 5;

export function computeStarStates(score: number): StarState[] {
  const safeScore = Number.isFinite(score) ? Math.max(0, score) : 0;
  const rounded = Math.floor(safeScore * 2) / 2;
  const integer = Math.floor(rounded);
  const hasHalf = rounded % 1 !== 0;

  const states: StarState[] = [];
  for (let i = 0; i < integer; i += 1) {
    states.push('on');
  }
  if (hasHalf) {
    states.push('half');
  }
  while (states.length < STAR_TOTAL) {
    states.push('off');
  }
  return states.slice(0, STAR_TOTAL);
}
