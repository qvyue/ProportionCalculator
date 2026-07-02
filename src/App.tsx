import { useEffect, useRef, useState } from 'react'
import { Article } from './components/Article'
import { TableOfContents } from './components/TableOfContents'
import { ProportionCalculator } from './components/ProportionCalculator'
import { tocItems } from './components/tocItems'
import { ProportionExamplesPage } from './pages/ProportionExamplesPage'

interface AppProps {
  path?: string
}

function App({ path }: AppProps = {}) {
  const currentPath = path ?? (typeof window === 'undefined' ? '/' : window.location.pathname)

  if (currentPath === '/proportion/examples') {
    return <ProportionExamplesPage />
  }

  return <HomePage />
}

function HomePage() {
  const calculatorRef = useRef<HTMLDivElement>(null)
  const [calculatorTop, setCalculatorTop] = useState<number | null>(null)

  useEffect(() => {
    const calculator = calculatorRef.current
    if (!calculator) return

    let frameId = 0
    let lastScrollY = window.scrollY
    let currentTop: number | null = null
    const desktopQuery = window.matchMedia('(min-width: 1024px)')
    let resizeObserver: ResizeObserver | null = null
    let isDesktopActive = false

    const getStickyBounds = () => {
      const topGap = 96
      const bottomTop = window.innerHeight - calculator.offsetHeight

      return {
        maxTop: topGap,
        minTop: Math.min(topGap, bottomTop),
      }
    }

    const setBoundedTop = (nextTop: number) => {
      const { minTop, maxTop } = getStickyBounds()
      currentTop = Math.min(maxTop, Math.max(minTop, nextTop))
      setCalculatorTop(currentTop)
    }

    const updateCalculatorTop = ({ reset = false }: { reset?: boolean } = {}) => {
      window.cancelAnimationFrame(frameId)
      frameId = window.requestAnimationFrame(() => {
        if (currentTop === null || reset) {
          currentTop = getStickyBounds().minTop
        }

        setBoundedTop(currentTop)
      })
    }

    const handleScroll = () => {
      const currentScrollY = window.scrollY
      const deltaY = currentScrollY - lastScrollY

      if (deltaY !== 0 && currentTop !== null) {
        setBoundedTop(currentTop - deltaY)
      }

      lastScrollY = currentScrollY
    }

    const handleResize = () => updateCalculatorTop()

    const enableDesktopSticky = () => {
      if (isDesktopActive) return

      isDesktopActive = true
      lastScrollY = window.scrollY
      resizeObserver = new ResizeObserver(() => updateCalculatorTop())
      resizeObserver.observe(calculator)
      window.addEventListener('scroll', handleScroll, { passive: true })
      window.addEventListener('resize', handleResize)
      updateCalculatorTop({ reset: true })
    }

    const disableDesktopSticky = () => {
      if (!isDesktopActive) return

      isDesktopActive = false
      window.cancelAnimationFrame(frameId)
      resizeObserver?.disconnect()
      resizeObserver = null
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleResize)
      currentTop = null
      setCalculatorTop(null)
    }

    const handleBreakpointChange = (event: MediaQueryListEvent) => {
      if (event.matches) {
        enableDesktopSticky()
      } else {
        disableDesktopSticky()
      }
    }

    if (desktopQuery.matches) {
      enableDesktopSticky()
    }

    desktopQuery.addEventListener('change', handleBreakpointChange)

    return () => {
      window.cancelAnimationFrame(frameId)
      desktopQuery.removeEventListener('change', handleBreakpointChange)
      disableDesktopSticky()
    }
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2 font-bold text-xl text-gray-900">
            <span className="w-8 h-8 rounded-lg bg-orange-500 flex items-center justify-center text-white text-sm">
              P
            </span>
            Proportion Calculator
          </a>
          <nav className="hidden sm:flex items-center gap-6 text-sm text-gray-600">
            <a href="#how-to-solve" className="hover:text-orange-600">How to solve</a>
            <a href="/proportion/examples" className="hover:text-orange-600">Examples</a>
            <a href="#golden-ratio" className="hover:text-orange-600">Golden ratio</a>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Proportion Calculator
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl">
            The proportion calculator helps compute identical proportions. Learn what a proportion is,
            how to solve proportions by hand, and discover real-life applications of proportional relationships.
          </p>
        </div>
      </div>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:items-start">
          {/* Article with collapsible TOC */}
          <div className="order-2 lg:order-1 lg:col-span-7 xl:col-span-7">
            <TableOfContents items={tocItems} defaultCollapsed />
            <Article />
          </div>

          {/* Right sidebar - Calculator */}
          <div className="order-1 lg:order-2 lg:col-span-5 xl:col-span-5 lg:self-stretch">
            <div
              ref={calculatorRef}
              className="lg:sticky"
              style={calculatorTop === null ? undefined : { top: `${calculatorTop}px` }}
            >
              <ProportionCalculator />
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <p className="text-sm text-gray-500 text-center">
            Proportion Calculator. Built for educational purposes.
          </p>
        </div>
      </footer>
    </div>
  )
}

export default App
