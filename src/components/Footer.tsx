import { Link } from 'react-router';
import { Code2, MessageCircle, Globe, Mail } from 'lucide-react';

const socialLinks = [
  { icon: Code2, href: 'https://github.com', label: 'GitHub' },
  { icon: MessageCircle, href: 'https://twitter.com', label: 'Twitter' },
  { icon: Globe, href: 'https://linkedin.com', label: 'LinkedIn' },
  { icon: Mail, href: 'mailto:alex@example.com', label: 'Email' },
];

export default function Footer() {
  return (
    <footer
      className="mt-24"
      style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          <div>
            <span
              className="font-mono font-semibold text-lg block mb-3"
              style={{ color: '#00D8FF' }}
            >
              &lt; Kitsu /&gt;
            </span>
          </div>

          <div>
            <div className="flex gap-3">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-md flex items-center justify-center text-slate-500 hover:text-[#00D8FF] transition-colors"
                  style={{ border: '1px solid rgba(255,255,255,0.08)' }}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(0,216,255,0.25)')}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)')}
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div
          className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-6 text-xs text-slate-600"
          style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}
        >
          <span>© 2026 Alex Mercer. All rights reserved.</span>
          <span className="font-mono">Built with React + TypeScript</span>
        </div>
      </div>
    </footer>
  );
}
