import { useMemo, useState } from 'react';
import {
  getAutoProportionResult,
  type ProportionField,
} from '../lib/proportion';

function ChevronDown({ open }: { open: boolean }) {
  return (
    <svg
      className={`w-4 h-4 transition-transform duration-200 ${open ? '' : '-rotate-90'}`}
      viewBox="0 0 16 16"
      fill="currentColor"
    >
      <path d="M4 6l4 4 4-4" />
    </svg>
  );
}

interface CalculatorState {
  a: string;
  b: string;
  c: string;
  d: string;
  target: ProportionField;
}

export function ProportionCalculator() {
  const [values, setValues] = useState<CalculatorState>({
    a: '',
    b: '',
    c: '',
    d: '',
    target: 'd',
  });
  const [resultOpen, setResultOpen] = useState(true);
  const [processOpen, setProcessOpen] = useState(true);

  const calculation = useMemo(
    () => getAutoProportionResult({ target: values.target, values }),
    [values],
  );
  const result = calculation.status === 'solved' ? calculation : null;
  const error = calculation.status === 'error' ? calculation.message : '';

  const handleChange = (field: keyof CalculatorState, value: string) => {
    if (field === 'target') return;
    setValues((prev) => ({ ...prev, [field]: value }));
  };

  const setTarget = (field: ProportionField) => {
    setValues((prev) => ({ ...prev, target: field, [field]: '' }));
  };

  const clear = () => {
    setValues({ a: '', b: '', c: '', d: '', target: 'd' });
  };

  const isTarget = (field: ProportionField) => values.target === field;

  const fields: { key: ProportionField; label: string }[] = [
    { key: 'a', label: 'A' },
    { key: 'b', label: 'B' },
    { key: 'c', label: 'C' },
    { key: 'd', label: 'D' },
  ];

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-lg p-6">
      <p className="mb-6 text-base font-semibold leading-6 text-gray-800">
        Choose which one to solve for and fill in three values. The missing value updates automatically.
      </p>

      <div className="mb-6 rounded-xl border border-gray-200 bg-gray-50 px-3 py-3">
        <div className="flex flex-wrap items-center justify-center gap-2 text-lg font-mono sm:gap-3">
          <button
            onClick={() => setTarget('a')}
            className={`min-w-11 px-3 py-2 rounded-lg border-2 transition-colors ${
              isTarget('a')
                ? 'border-orange-500 bg-orange-50 text-orange-700'
                : 'border-gray-200 bg-white hover:border-orange-300'
            }`}
          >
            A
          </button>
          <span className="text-gray-400">/</span>
          <button
            onClick={() => setTarget('b')}
            className={`min-w-11 px-3 py-2 rounded-lg border-2 transition-colors ${
              isTarget('b')
                ? 'border-orange-500 bg-orange-50 text-orange-700'
                : 'border-gray-200 bg-white hover:border-orange-300'
            }`}
          >
            B
          </button>
          <span className="px-1 text-gray-400">=</span>
          <button
            onClick={() => setTarget('c')}
            className={`min-w-11 px-3 py-2 rounded-lg border-2 transition-colors ${
              isTarget('c')
                ? 'border-orange-500 bg-orange-50 text-orange-700'
                : 'border-gray-200 bg-white hover:border-orange-300'
            }`}
          >
            C
          </button>
          <span className="text-gray-400">/</span>
          <button
            onClick={() => setTarget('d')}
            className={`min-w-11 px-3 py-2 rounded-lg border-2 transition-colors ${
              isTarget('d')
                ? 'border-orange-500 bg-orange-50 text-orange-700'
                : 'border-gray-200 bg-white hover:border-orange-300'
            }`}
          >
            D
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        {fields.map(({ key, label }) => (
          <div key={key}>
            <label
              htmlFor={key}
              className={`block text-sm font-medium mb-1 ${
                isTarget(key) ? 'text-orange-600' : 'text-gray-700'
              }`}
            >
              {label} {isTarget(key) && '(solve for)'}
            </label>
            <input
              id={key}
              type="number"
              step="any"
              value={isTarget(key) ? result?.value ?? '' : values[key]}
              onChange={(e) => handleChange(key, e.target.value)}
              disabled={isTarget(key)}
              placeholder={isTarget(key) ? 'X' : '0'}
              className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-all ${
                isTarget(key)
                  ? 'border-orange-300 bg-orange-50 text-orange-700'
                  : 'border-gray-300 bg-white'
              }`}
            />
          </div>
        ))}
      </div>

      {error && (
        <div className="mb-4 p-3 rounded-lg bg-red-50 text-red-700 text-sm">
          {error}
        </div>
      )}

      <div className="flex justify-end">
        <button
          onClick={clear}
          className="px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
        >
          Clear
        </button>
      </div>

     {result && (
       <div className="mt-6 rounded-lg bg-orange-50 border border-orange-200 px-4 pt-4 pb-3">
          <button
            onClick={() => setResultOpen(!resultOpen)}
            className="flex items-center gap-2 w-full text-left"
          >
            <ChevronDown open={resultOpen} />
            <span className="text-sm text-orange-800 font-medium">Result</span>
          </button>
          {resultOpen && (
            <p className="text-2xl font-bold text-orange-600 mt-1">{result.value}</p>
          )}

          <div className="mt-5 border-t border-orange-200 pt-4 text-sm text-orange-900">
            <button
              onClick={() => setProcessOpen(!processOpen)}
              className="flex items-center gap-2 w-full text-left"
            >
              <ChevronDown open={processOpen} />
              <span className="font-semibold">{result.solution.title}</span>
            </button>

            {processOpen && (
              <>
                <p className="mt-2 font-mono text-orange-800">{result.solution.equation}</p>

                <ol className="mt-4 space-y-3">
                  {result.solution.steps.map((step) => (
                    <li key={step.label}>
                      <p className="font-medium">{step.label}</p>
                      <p className="mt-1 font-mono text-orange-800">{step.equation}</p>
                    </li>
                  ))}
                </ol>

                <p className="mt-4 font-medium">Final proportion:</p>
                <p className="mt-1 font-mono text-orange-800">
                  {result.solution.finalProportion}
                </p>
              </>
            )}
          </div>
          <div className="mt-4 border-t border-orange-200 pt-3 text-sm text-orange-900">
            <p className="font-medium">Want to practice next?</p>
            <p className="mt-1 text-orange-800">
              Try similar proportion problems with step-by-step answers.
            </p>
            <a
              href="/proportion/examples"
              className="mt-3 inline-flex rounded-md bg-white px-3 py-2 text-sm font-semibold text-orange-700 ring-1 ring-orange-200 hover:bg-orange-100"
            >
              Practice proportion examples
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
