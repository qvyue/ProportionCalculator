import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { render } from '../dist/server/entry-server.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const distDir = path.join(rootDir, 'dist');
const template = await readFile(path.join(distDir, 'index.html'), 'utf8');

const pages = [
  {
    path: '/',
    output: path.join(distDir, 'index.html'),
    title: 'Proportion Calculator',
    description:
      'Proportion calculator helps find equivalent proportions given three of the four parts of the two ratios.',
    canonical: 'https://proportion-calculator.com/',
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: 'Proportion Calculator',
      url: 'https://proportion-calculator.com/',
      applicationCategory: 'EducationalApplication',
      operatingSystem: 'Any',
      description:
        'Calculate the missing value in a proportion and see the cross-multiplication steps.',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
      },
      featureList: [
        'Solve missing values in proportions',
        'Show step-by-step cross-multiplication solutions',
        'Practice proportion examples with answers',
      ],
    },
  },
  {
    path: '/proportion/examples',
    output: path.join(distDir, 'proportion', 'examples', 'index.html'),
    title: 'Proportion Examples with Answers',
    description:
      'Practice proportion examples with answers and step-by-step solutions for missing values, word problems, recipe scaling, map scale, and unit price.',
    canonical: 'https://proportion-calculator.com/proportion/examples',
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'LearningResource',
      name: 'Proportion Examples with Answers',
      url: 'https://proportion-calculator.com/proportion/examples',
      description:
        'Practice proportion examples with answers and step-by-step solutions for missing values, word problems, recipe scaling, map scale, and unit price.',
      learningResourceType: 'Practice problems',
      educationalUse: 'Practice',
      teaches: [
        'Solving proportions',
        'Cross multiplication',
        'Finding missing values in ratios',
      ],
      audience: {
        '@type': 'EducationalAudience',
        educationalRole: 'student',
      },
      isAccessibleForFree: true,
      inLanguage: 'en',
    },
  },
];

for (const page of pages) {
  const appHtml = render(page.path);
  const html = template
    .replace(/<title>.*?<\/title>/, `<title>${escapeHtml(page.title)}</title>`)
    .replace(
      /<meta name="description" content=".*?" \/>/,
      `<meta name="description" content="${escapeHtml(page.description)}" />`,
    )
    .replace(
      /<link rel="canonical" href=".*?" \/>/,
      `<link rel="canonical" href="${page.canonical}" />`,
    )
    .replace(
      '</head>',
      `    ${renderSocialMeta(page)}\n    <script type="application/ld+json">${serializeJsonLd(page.structuredData)}</script>\n  </head>`,
    )
    .replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`);

  await mkdir(path.dirname(page.output), { recursive: true });
  await writeFile(page.output, html);
}

function escapeHtml(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;');
}

function serializeJsonLd(data) {
  return JSON.stringify(data).replaceAll('<', '\\u003c');
}

function renderSocialMeta(page) {
  return [
    `<meta property="og:title" content="${escapeHtml(page.title)}" />`,
    `<meta property="og:description" content="${escapeHtml(page.description)}" />`,
    `<meta property="og:url" content="${page.canonical}" />`,
    '<meta property="og:type" content="website" />',
    '<meta name="twitter:card" content="summary" />',
    `<meta name="twitter:title" content="${escapeHtml(page.title)}" />`,
    `<meta name="twitter:description" content="${escapeHtml(page.description)}" />`,
  ].join('\n    ');
}
