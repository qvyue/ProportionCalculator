export type ProportionField = 'a' | 'b' | 'c' | 'd';

type KnownValues = Partial<Record<ProportionField, number>>;

export type SolveProportionInput = KnownValues & {
  target: ProportionField;
};

export interface StepByStepSolution {
  title: string;
  equation: string;
  steps: {
    label: string;
    equation: string;
  }[];
  finalProportion: string;
}

type ProportionInputValues = Record<ProportionField, string>;

export type AutoProportionResult =
  | { status: 'idle' }
  | {
      status: 'solved';
      value: string;
      solution: StepByStepSolution;
    }
  | {
      status: 'error';
      message: string;
    };

const denominators: Record<ProportionField, ProportionField> = {
  a: 'd',
  b: 'c',
  c: 'b',
  d: 'a',
};

export function solveProportion({ target, a, b, c, d }: SolveProportionInput) {
  const denominatorField = denominators[target];
  const values = { a, b, c, d };
  const denominator = values[denominatorField];

  if (denominator === 0) {
    throw new Error('Cannot divide by zero');
  }

  switch (target) {
    case 'a':
      return ((b ?? NaN) * (c ?? NaN)) / (d ?? NaN);
    case 'b':
      return ((a ?? NaN) * (d ?? NaN)) / (c ?? NaN);
    case 'c':
      return ((a ?? NaN) * (d ?? NaN)) / (b ?? NaN);
    case 'd':
      return ((b ?? NaN) * (c ?? NaN)) / (a ?? NaN);
  }
}

export function formatProportionNumber(value: number) {
  return Number(value.toFixed(6)).toString();
}

export function getAutoProportionResult({
  target,
  values,
}: {
  target: ProportionField;
  values: ProportionInputValues;
}): AutoProportionResult {
  const nums: Record<ProportionField, number> = {
    a: parseFloat(values.a),
    b: parseFloat(values.b),
    c: parseFloat(values.c),
    d: parseFloat(values.d),
  };

  const knownFields = (['a', 'b', 'c', 'd'] as const).filter(
    (field) => field !== target && values[field] !== '' && Number.isFinite(nums[field]),
  );

  if (knownFields.length < 3) {
    return { status: 'idle' };
  }

  try {
    const answer = solveProportion({ target, ...nums });

    if (!Number.isFinite(answer)) {
      return { status: 'error', message: 'Please check your values.' };
    }

    return {
      status: 'solved',
      value: formatProportionNumber(answer),
      solution: getStepByStepSolution({ target, values: nums, answer }),
    };
  } catch {
    return {
      status: 'error',
      message: 'Cannot divide by zero. Please check your values.',
    };
  }
}

export function getStepByStepSolution({
  target,
  values,
  answer,
}: {
  target: ProportionField;
  values: Record<ProportionField, number>;
  answer: number;
}): StepByStepSolution {
  const displayValues = {
    a: displayKnownValue(values.a, 'A'),
    b: displayKnownValue(values.b, 'B'),
    c: displayKnownValue(values.c, 'C'),
    d: displayKnownValue(values.d, 'D'),
    [target]: target.toUpperCase(),
  } as Record<ProportionField, string>;

  const crossMultiplications: Record<ProportionField, string> = {
    a: `${displayValues.a} × ${displayValues.d} = ${displayValues.c} × ${displayValues.b}`,
    b: `${displayValues.a} × ${displayValues.d} = ${displayValues.c} × ${displayValues.b}`,
    c: `${displayValues.a} × ${displayValues.d} = ${displayValues.c} × ${displayValues.b}`,
    d: `${displayValues.a} × ${displayValues.d} = ${displayValues.c} × ${displayValues.b}`,
  };

  const divideBy: Record<ProportionField, ProportionField> = {
    a: 'd',
    b: 'c',
    c: 'b',
    d: 'a',
  };

  const divisionFormulas: Record<ProportionField, string> = {
    a: `A = (${displayValues.c} × ${displayValues.b}) / ${displayValues.d}`,
    b: `B = (${displayValues.a} × ${displayValues.d}) / ${displayValues.c}`,
    c: `C = (${displayValues.a} × ${displayValues.d}) / ${displayValues.b}`,
    d: `D = (${displayValues.c} × ${displayValues.b}) / ${displayValues.a}`,
  };

  const finalValues = {
    ...displayValues,
    [target]: formatProportionNumber(answer),
  };

  return {
    title: `Step-by-step solution for ${target.toUpperCase()}:`,
    equation: `${displayValues.a} / ${displayValues.b} = ${displayValues.c} / ${displayValues.d}`,
    steps: [
      {
        label: '1. Cross multiply:',
        equation: crossMultiplications[target],
      },
      {
        label: `2. Divide each side by ${displayValues[divideBy[target]]}:`,
        equation: divisionFormulas[target],
      },
      {
        label: '3. Reduce:',
        equation: `${target.toUpperCase()} = ${formatProportionNumber(answer)}`,
      },
    ],
    finalProportion: `${finalValues.a} / ${finalValues.b} = ${finalValues.c} / ${finalValues.d}`,
  };
}

function displayKnownValue(value: number, fallback: string) {
  return Number.isFinite(value) ? formatProportionNumber(value) : fallback;
}
