import { computeStarStates, STAR_TOTAL } from '../src/domain/usecases/starUseCases';

describe('computeStarStates', () => {
  it('always returns five slots', () => {
    [0, 1, 2.4, 3.5, 4.2, 5].forEach(score => {
      expect(computeStarStates(score)).toHaveLength(STAR_TOTAL);
    });
  });

  it('fills whole stars', () => {
    expect(computeStarStates(3)).toEqual(['on', 'on', 'on', 'off', 'off']);
    expect(computeStarStates(5)).toEqual(['on', 'on', 'on', 'on', 'on']);
    expect(computeStarStates(0)).toEqual(['off', 'off', 'off', 'off', 'off']);
  });

  it('rounds down to the nearest half star', () => {
    expect(computeStarStates(4.2)).toEqual(['on', 'on', 'on', 'on', 'off']);
    expect(computeStarStates(4.5)).toEqual(['on', 'on', 'on', 'on', 'half']);
    expect(computeStarStates(4.8)).toEqual(['on', 'on', 'on', 'on', 'half']);
    expect(computeStarStates(4.9)).toEqual(['on', 'on', 'on', 'on', 'half']);
  });

  it('is defensive about bad input', () => {
    expect(computeStarStates(Number.NaN)).toEqual(['off', 'off', 'off', 'off', 'off']);
    expect(computeStarStates(-3)).toEqual(['off', 'off', 'off', 'off', 'off']);
  });
});
