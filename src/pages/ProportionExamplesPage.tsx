import { practiceExamples } from '../data/practiceExamples';

const groupedExamples = practiceExamples.reduce<Record<string, typeof practiceExamples>>(
  (groups, example) => {
    groups[example.category] = groups[example.category] ?? [];
    groups[example.category].push(example);
    return groups;
  },
  {},
);

export function ProportionExamplesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="sticky top-0 z-50 border-b border-gray-200 bg-white">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <a href="/" className="flex items-center gap-2 text-xl font-bold text-gray-900">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-500 text-sm text-white">
              P
            </span>
            Proportion Calculator
          </a>
          <nav className="hidden items-center gap-6 text-sm text-gray-600 sm:flex">
            <a href="/" className="hover:text-orange-600">Calculator</a>
            <a href="/proportion/examples" className="font-medium text-orange-600">
              Examples
            </a>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-10">
          <a href="/" className="text-sm font-medium text-orange-600 hover:text-orange-700">
            Back to calculator
          </a>
          <h1 className="mt-4 text-4xl font-bold text-gray-900 sm:text-5xl">
            Proportion examples
          </h1>
          <p className="mt-4 max-w-3xl text-lg text-gray-600">
            Practice solving proportions with worked answers. Start with basic missing
            values, then try word problems, decimal proportions, and mixed practice.
          </p>
        </div>

        <div className="space-y-10">
          {Object.entries(groupedExamples).map(([category, examples]) => (
            <section key={category} aria-labelledby={`${category}-heading`}>
              <h2 id={`${category}-heading`} className="text-2xl font-semibold text-gray-900">
                {category}
              </h2>
              <div className="mt-4 grid gap-4 md:grid-cols-2">
                {examples.map((example) => (
                  <article
                    key={example.id}
                    className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm"
                  >
                    <p className="text-sm font-medium text-orange-600">{example.title}</p>
                    <p className="mt-3 font-mono text-lg text-gray-900">{example.problem}</p>
                    <details className="mt-4">
                      <summary className="cursor-pointer text-sm font-semibold text-gray-800">
                        Show answer and steps
                      </summary>
                      <div className="mt-3 border-t border-gray-100 pt-3 text-sm text-gray-700">
                        <p className="font-semibold text-gray-900">Answer: {example.answer}</p>
                        <ol className="mt-3 space-y-1">
                          {example.steps.map((step) => (
                            <li key={step} className="font-mono">
                              {step}
                            </li>
                          ))}
                        </ol>
                      </div>
                    </details>
                  </article>
                ))}
              </div>
            </section>
          ))}
        </div>
      </main>
    </div>
  );
}
