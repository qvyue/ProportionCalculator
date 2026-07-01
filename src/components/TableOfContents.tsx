import { useEffect, useState } from 'react';

interface TocItem {
  id: string;
  label: string;
}

interface TableOfContentsProps {
  items: TocItem[];
  defaultCollapsed?: boolean;
}

export function TableOfContents({ items, defaultCollapsed = false }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('');
  const [open, setOpen] = useState(!defaultCollapsed);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-100px 0px -60% 0px', threshold: 0 }
    );

    items.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [items]);

  const activeItem = items.find((item) => item.id === activeId);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (!element) return;

    const headerOffset = 128;
    const targetTop = element.getBoundingClientRect().top + window.scrollY - headerOffset;
    window.scrollTo({ top: targetTop, behavior: 'smooth' });
  };

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();

    setActiveId(id);

    if (defaultCollapsed) {
      setOpen(false);
      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => scrollToSection(id));
      });
      return;
    }

    scrollToSection(id);
  };

  return (
    <nav className="bg-white rounded-xl border border-gray-200 p-4 sm:p-5 mb-8 shadow-sm">
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        className="flex w-full items-center justify-between gap-4 text-left"
        aria-expanded={open}
        aria-controls="table-of-contents-list"
      >
        <span>
          <span className="block text-sm font-semibold text-gray-900 uppercase tracking-wider">
            Table of contents
          </span>
          <span className="mt-1 block text-sm text-gray-500 normal-case tracking-normal">
            {open
              ? 'Jump to a section below'
              : activeItem?.label ?? `${items.length} sections available`}
          </span>
        </span>
        <span
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-gray-200 text-gray-500 transition-transform duration-200 ${
            open ? 'rotate-180 bg-orange-50 text-orange-600' : 'bg-white'
          }`}
          aria-hidden="true"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M4 6L8 10L12 6"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </button>

      {open && (
        <ul id="table-of-contents-list" className="mt-4 grid gap-1 sm:grid-cols-2">
          {items.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                onClick={(e) => handleClick(e, item.id)}
                className={`toc-link block rounded-r-md py-2 pl-3 pr-2 text-sm text-gray-600 hover:bg-orange-50 hover:text-orange-600 ${
                  activeId === item.id ? 'active' : ''
                }`}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
}
