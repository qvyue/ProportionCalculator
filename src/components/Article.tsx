import type { ReactNode } from 'react';
import { renderToString } from 'katex';
import { featuredPracticeExamples } from '../data/practiceExamples';

export interface ArticleSection {
  id: string;
  title: string;
  content: ReactNode;
}

function MathBlock({ expressions }: { expressions: string | string[] }) {
  const lines = Array.isArray(expressions) ? expressions : [expressions];

  return (
    <div className="math-block">
      {lines.map((expression, index) => {
        const isFractionLine = expression.includes('\\frac');

        return (
          <div
            key={`${expression}-${index}`}
            className={`math-line${isFractionLine ? ' math-line--fraction' : ''}`}
            dangerouslySetInnerHTML={{
              __html: renderToString(expression, {
                displayMode: isFractionLine,
                throwOnError: false,
                output: 'html',
              }),
            }}
          />
        );
      })}
    </div>
  );
}

export function Article() {
  return (
    <article className="prose">
      <p>
        Use the calculator to solve a missing value in <strong>A / B = C / D</strong>.
        Below, you can see the formula, the cross-multiplication method, and worked
        examples.
      </p>

      <section id="how-to-solve">
        <h2>How to solve proportions</h2>
        <p>
          The fastest way to solve a proportion is cross multiplication. If two ratios
          are equal, then the product of the left numerator and right denominator equals
          the product of the right numerator and left denominator.
        </p>
        <MathBlock expressions={'\\frac{A}{B} = \\frac{C}{D} \\Rightarrow A \\times D = B \\times C'} />
        <p>For example, suppose you need to solve:</p>
        <MathBlock expressions={'\\frac{7}{12} = \\frac{x}{96}'} />
        <ul>
          <li>Cross multiply: <strong>12x = 96 x 7</strong>.</li>
          <li>Multiply the known values: <strong>12x = 672</strong>.</li>
          <li>Divide both sides by 12: <strong>x = 56</strong>.</li>
        </ul>
        <MathBlock
          expressions={[
            '\\frac{7}{12} = \\frac{x}{96}',
            '12x = 96 \\times 7',
            '12x = 672',
            'x = 56',
          ]}
        />
        <p>
          The calculator on this page uses the same cross-multiplication process and
          shows the step-by-step solution after you enter three values.
        </p>
      </section>

      <section id="proportion-formula">
        <h2>Proportion formula</h2>
        <p>
          A proportion compares two equal ratios. In this calculator, the proportion is
          written as:
        </p>
        <MathBlock expressions={'\\frac{A}{B} = \\frac{C}{D}'} />
        <p>
          If one value is missing, rearrange the cross-multiplication equation to solve
          for that value:
        </p>
        <MathBlock
          expressions={[
            'A = \\frac{B \\times C}{D}',
            'B = \\frac{A \\times D}{C}',
            'C = \\frac{A \\times D}{B}',
            'D = \\frac{B \\times C}{A}',
          ]}
        />
        <p>
          Fill in any three values, choose the missing letter in the calculator, and it
          will apply the matching formula.
        </p>
      </section>

      <section id="proportion-examples">
        <h2>Proportion examples</h2>
        <p>
          Proportions show up whenever one quantity scales with another. Here are a few
          common examples:
        </p>

        <h3>Solving for a missing denominator</h3>
        <p>
          If <strong>4 / 5 = 24 / x</strong>, cross multiply:
        </p>
        <MathBlock
          expressions={[
            '\\frac{4}{5} = \\frac{24}{x}',
            '4x = 24 \\times 5',
            '4x = 120',
            'x = 30',
          ]}
        />

        <h3>Recipe scaling</h3>
        <p>
          If a recipe uses 2 cups of flour for 8 servings, you can set up a proportion
          to find the flour needed for 20 servings.
        </p>
        <MathBlock expressions={'\\frac{2}{8} = \\frac{x}{20}'} />

        <h3>Map scale</h3>
        <p>
          If 1 inch on a map represents 5 miles, then 3.5 inches represents
          <strong> 17.5 miles</strong>.
        </p>
        <MathBlock expressions={'\\frac{1}{5} = \\frac{3.5}{x}'} />

        <h3>Unit price</h3>
        <p>
          If 6 items cost $18, a proportion can help you find the cost of 10 items at
          the same rate.
        </p>
        <MathBlock expressions={'\\frac{6}{18} = \\frac{10}{x}'} />
      </section>

      <section id="practice-problems">
        <h2>Practice proportion problems</h2>
        <p>
          Try these practice problems after using the calculator. Each one uses the same
          cross-multiplication method shown above.
        </p>
        <div className="not-prose my-5 grid gap-4 sm:grid-cols-2">
          {featuredPracticeExamples.map((example) => (
            <article key={example.id} className="rounded-lg border border-gray-200 bg-white p-4">
              <p className="text-sm font-medium text-orange-600">{example.category}</p>
              <h3 className="mt-2 text-base font-semibold text-gray-900">{example.title}</h3>
              <p className="mt-3 font-mono text-lg text-gray-900">{example.problem}</p>
              <details className="mt-3 text-sm text-gray-700">
                <summary className="cursor-pointer font-semibold text-gray-800">
                  Show answer
                </summary>
                <p className="mt-2 font-semibold text-gray-900">{example.answer}</p>
              </details>
            </article>
          ))}
        </div>
        <p>
          Want more practice? Visit the full{' '}
          <a href="/proportion/examples">proportion examples page</a> for more problems with
          step-by-step answers.
        </p>
      </section>

      <section id="what-is-proportion">
        <h2>What is a proportion?</h2>
        <p>
          If you need a quick refresher, a proportion is an equation stating that two
          ratios are equal. A ratio can be written as a fraction, with a colon, or
          sometimes as a decimal or percent.
        </p>
        <p>
          For example, <strong>7 / 12</strong> and <strong>56 / 96</strong> are
          proportional because both describe the same relationship after scaling.
        </p>
        <MathBlock expressions={'\\frac{7}{12} = \\frac{56}{96}'} />
        <p>
          The numerator is the top number of a fraction, and the denominator is the
          bottom number. When a proportion has one missing value, cross multiplication
          lets you solve it.
        </p>
      </section>

      <section id="constant-of-proportionality">
        <h2>Constant of proportionality</h2>
        <p>
          The constant of proportionality is the fixed relationship between two
          quantities. If two variables are directly proportional, their ratio stays the
          same:
        </p>
        <MathBlock expressions={'c = \\frac{y}{x}'} />
        <p>
          Speed is a familiar example. If distance and time increase at the same rate,
          velocity is the constant ratio:
        </p>
        <MathBlock expressions={'v = \\frac{s}{t}'} />
        <p>
          Here, <strong>v</strong> is velocity, <strong>s</strong> is distance, and
          <strong> t</strong> is time.
        </p>
      </section>

      <section id="direct-inverse-proportion">
        <h2>Direct and inverse proportion</h2>
        <p>
          In a direct proportion, both values increase or decrease together while their
          ratio stays constant.
        </p>
        <MathBlock expressions={'c = \\frac{y}{x}'} />
        <p>
          In an inverse proportion, one value increases while the other decreases, and
          their product stays constant.
        </p>
        <MathBlock expressions={'c = x \\times y'} />
        <p>
          For a fixed distance, speed and travel time are inversely proportional: a
          higher speed means a shorter travel time.
        </p>
        <MathBlock expressions={'s = v \\times t'} />
      </section>

      <section id="golden-ratio">
        <h2>The golden ratio</h2>
        <p>
          The golden ratio is a special proportional relationship often seen in
          geometry, design, and architecture. Given two quantities <strong>a</strong>
          and <strong>b</strong>, the golden ratio is written as:
        </p>
        <MathBlock expressions={'\\frac{a + b}{a} = \\frac{a}{b}'} />
        <p>
          Its value is approximately <strong>1.618</strong>. It is not usually the first
          thing you need for solving a missing value, but it is a useful example of how
          proportional relationships appear outside basic arithmetic.
        </p>
        <p>
          In geometry, proportions are also used with similar polygons. Two polygons are
          similar when their corresponding sides are in proportion.
        </p>
      </section>
    </article>
  );
}
