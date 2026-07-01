export interface PracticeExample {
  id: string;
  category: string;
  title: string;
  problem: string;
  answer: string;
  steps: string[];
}

export const practiceExamples: PracticeExample[] = [
  {
    id: 'missing-denominator-basic',
    category: 'Missing denominator',
    title: 'Solve for the missing denominator',
    problem: '4 / 5 = 24 / x',
    answer: 'x = 30',
    steps: ['4x = 24 x 5', '4x = 120', 'x = 30'],
  },
  {
    id: 'missing-numerator-basic',
    category: 'Missing numerator',
    title: 'Solve for the missing numerator',
    problem: 'x / 12 = 21 / 36',
    answer: 'x = 7',
    steps: ['36x = 12 x 21', '36x = 252', 'x = 7'],
  },
  {
    id: 'scale-up-ratio',
    category: 'Equivalent ratios',
    title: 'Scale an equivalent ratio',
    problem: '7 / 12 = x / 96',
    answer: 'x = 56',
    steps: ['12x = 96 x 7', '12x = 672', 'x = 56'],
  },
  {
    id: 'recipe-scaling',
    category: 'Word problems',
    title: 'Recipe scaling',
    problem: '2 cups / 8 servings = x cups / 20 servings',
    answer: 'x = 5 cups',
    steps: ['8x = 2 x 20', '8x = 40', 'x = 5'],
  },
  {
    id: 'map-scale',
    category: 'Word problems',
    title: 'Map scale',
    problem: '1 inch / 5 miles = 3.5 inches / x miles',
    answer: 'x = 17.5 miles',
    steps: ['x = 5 x 3.5', 'x = 17.5'],
  },
  {
    id: 'unit-price',
    category: 'Word problems',
    title: 'Unit price',
    problem: '6 items / $18 = 10 items / $x',
    answer: 'x = 30',
    steps: ['6x = 18 x 10', '6x = 180', 'x = 30'],
  },
  {
    id: 'decimal-proportion',
    category: 'Decimals',
    title: 'Solve with decimals',
    problem: '1.5 / 4 = x / 12',
    answer: 'x = 4.5',
    steps: ['4x = 1.5 x 12', '4x = 18', 'x = 4.5'],
  },
  {
    id: 'large-number-proportion',
    category: 'Mixed practice',
    title: 'Solve a larger proportion',
    problem: '18 / 45 = 42 / x',
    answer: 'x = 105',
    steps: ['18x = 45 x 42', '18x = 1890', 'x = 105'],
  },
];

export const featuredPracticeExamples = practiceExamples.slice(0, 4);
