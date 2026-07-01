import { describe, expect, it } from 'vitest';
import { getAutoProportionResult, getStepByStepSolution, solveProportion } from './proportion';

describe('solveProportion', () => {
  it.each([
    ['a', { b: 12, c: 56, d: 96 }, 7],
    ['b', { a: 7, c: 56, d: 96 }, 12],
    ['c', { a: 7, b: 12, d: 96 }, 56],
    ['d', { a: 7, b: 12, c: 56 }, 96],
  ] as const)('solves %s in A/B = C/D', (target, known, expected) => {
    expect(solveProportion({ target, ...known })).toBe(expected);
  });

  it('allows zero in the numerator side of the calculation', () => {
    expect(solveProportion({ target: 'd', a: 8, b: 0, c: 12 })).toBe(0);
  });

  it('rejects division by zero', () => {
    expect(() => solveProportion({ target: 'd', a: 0, b: 5, c: 10 })).toThrow(
      'Cannot divide by zero',
    );
  });
});

describe('getAutoProportionResult', () => {
  it('waits silently until the other three values are filled', () => {
    expect(
      getAutoProportionResult({
        target: 'd',
        values: { a: '4', b: '5', c: '', d: '' },
      }),
    ).toEqual({ status: 'idle' });
  });

  it('solves automatically when the other three values are filled', () => {
    expect(
      getAutoProportionResult({
        target: 'd',
        values: { a: '4', b: '5', c: '24', d: '' },
      }),
    ).toMatchObject({
      status: 'solved',
      value: '30',
      solution: {
        finalProportion: '4 / 5 = 24 / 30',
      },
    });
  });

  it('returns an error when automatic solving would divide by zero', () => {
    expect(
      getAutoProportionResult({
        target: 'd',
        values: { a: '0', b: '5', c: '24', d: '' },
      }),
    ).toEqual({
      status: 'error',
      message: 'Cannot divide by zero. Please check your values.',
    });
  });
});

describe('getStepByStepSolution', () => {
  it('generates a detailed solution for D from the entered values', () => {
    expect(
      getStepByStepSolution({
        target: 'd',
        values: { a: 33, b: 3, c: 11, d: Number.NaN },
        answer: 1,
      }),
    ).toEqual({
      title: 'Step-by-step solution for D:',
      equation: '33 / 3 = 11 / D',
      steps: [
        {
          label: '1. Cross multiply:',
          equation: '33 × D = 11 × 3',
        },
        {
          label: '2. Divide each side by 33:',
          equation: 'D = (11 × 3) / 33',
        },
        {
          label: '3. Reduce:',
          equation: 'D = 1',
        },
      ],
      finalProportion: '33 / 3 = 11 / 1',
    });
  });

  it('generates the correct cross multiplication when B is unknown', () => {
    const solution = getStepByStepSolution({
      target: 'b',
      values: { a: 7, b: Number.NaN, c: 56, d: 96 },
      answer: 12,
    });

    expect(solution.equation).toBe('7 / B = 56 / 96');
    expect(solution.steps[0].equation).toBe('7 × 96 = 56 × B');
    expect(solution.steps[1].equation).toBe('B = (7 × 96) / 56');
    expect(solution.finalProportion).toBe('7 / 12 = 56 / 96');
  });
});
