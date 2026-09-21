import { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router';
import { Menu, X, Code2 } from 'lucide-react';

const links = [
  { to: '/', label: 'Home', end: true },
  { to: '/articles', label: 'Articles', end: false },
  { to: '/games', label: 'Games', end: false },
  { to: '/projects', label: 'Projects', end: false },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled
          ? 'rgba(7, 11, 20, 0.92)'
          : 'rgba(7, 11, 20, 0.6)',
        backdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link
            to="/"
            className="font-mono font-semibold text-lg tracking-tight hover:text-white transition-colors"
            style={{ color: '#00D8FF' }}
          >
            &lt; Alex /&gt;
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {links.map(l => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.end}
                className={({ isActive }) =>
                  `px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive
                      ? 'text-[#00D8FF]'
                      : 'text-slate-400 hover:text-slate-100'
                  }`
                }
              >
                {l.label}
              </NavLink>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium text-slate-400 hover:text-[#00D8FF] transition-colors"
              style={{ border: '1px solid rgba(255,255,255,0.1)' }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(0,216,255,0.35)')}
              onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)')}
            >
              <Code2 size={15} />
              GitHub
            </a>
          </div>

          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 text-slate-400 hover:text-white transition-colors"
            aria-label="Toggle menu"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {open && (
        <div
          className="md:hidden px-4 py-3 space-y-1"
          style={{ borderTop: '1px solid rgba(255,255,255,0.06)', background: '#070B14' }}
        >
          {links.map(l => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.end}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `block px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive
                    ? 'text-[#00D8FF] bg-[rgba(0,216,255,0.06)]'
                    : 'text-slate-400 hover:text-white'
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 text-sm text-slate-400 hover:text-[#00D8FF] transition-colors"
            onClick={() => setOpen(false)}
          >
            <Code2 size={15} />
            GitHub
          </a>
        </div>
      )}
    </nav>
  );
}
