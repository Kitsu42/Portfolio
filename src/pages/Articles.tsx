import { useState } from 'react';
import { Link } from 'react-router';
import { Search, Clock, Calendar, BookOpen } from 'lucide-react';
import { articles } from '../data/articles';

const categories = ['All', ...Array.from(new Set(articles.map(a => a.category)))];

export default function Articles() {
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered = articles.filter(a => {
    const matchCat = activeCategory === 'All' || a.category === activeCategory;
    const q = query.toLowerCase();
    const matchQ = !q || a.title.toLowerCase().includes(q) || a.summary.toLowerCase().includes(q) || a.tags.some(t => t.toLowerCase().includes(q));
    return matchCat && matchQ;
  });

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div
        className="relative py-20 overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #070B14 0%, #0A1020 50%, #070B14 100%)',
          borderBottom: '1px solid rgba(255,255,255,0.05)',
        }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at 60% 0%, rgba(0,216,255,0.06) 0%, transparent 60%)',
          }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-3">
            <BookOpen size={20} style={{ color: '#00D8FF' }} />
            <span className="font-mono text-xs text-slate-600 uppercase tracking-widest">Escrita técnica</span>
          </div>
          <h1
            className="font-display font-bold mb-3"
            style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', letterSpacing: '-0.02em', color: '#E2E8F0' }}
          >
            Articles
          </h1>
          <p className="text-slate-400 max-w-xl leading-relaxed">
            Deep dives into software architecture, performance optimization, and the tools I use day-to-day.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search + Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none"
            />
            <input
              type="text"
              placeholder="Buscar artigos..."
              value={query}
              onChange={e => setQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-lg text-sm text-slate-300 placeholder-slate-600 outline-none focus:ring-1 focus:ring-[rgba(0,216,255,0.4)] transition"
              style={{ background: '#0C1220', border: '1px solid rgba(255,255,255,0.08)' }}
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className="px-4 py-2 rounded-lg text-sm font-medium transition-all"
                style={{
                  background: activeCategory === cat ? 'rgba(0,216,255,0.12)' : '#0C1220',
                  color: activeCategory === cat ? '#00D8FF' : '#64748B',
                  border: activeCategory === cat
                    ? '1px solid rgba(0,216,255,0.3)'
                    : '1px solid rgba(255,255,255,0.06)',
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Article list */}
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-slate-500 text-lg">Nenhum artigo encontrado.</p>
            <button
              onClick={() => { setQuery(''); setActiveCategory('All'); }}
              className="mt-4 text-sm text-[#00D8FF] hover:underline"
            >
              Limpar filtros
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {filtered.map(a => (
              <Link
                key={a.id}
                to={`/articles/${a.id}`}
                className="group rounded-xl p-6 card-hover block"
                style={{ background: '#0C1220', border: '1px solid rgba(255,255,255,0.06)' }}
              >
                <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                  {a.image && (
                    <div className="w-full sm:w-40 h-28 sm:h-24 rounded-lg overflow-hidden flex-shrink-0 bg-slate-900">
                      <img
                        src={a.image}
                        alt={a.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className="tag">{a.category}</span>
                      {a.tags.slice(1, 3).map(t => (
                        <span key={t} className="tag tag-purple">{t}</span>
                      ))}
                    </div>
                    <h2 className="font-display font-semibold text-xl text-slate-100 mb-2 group-hover:text-[#00D8FF] transition-colors leading-snug">
                      {a.title}
                    </h2>
                    <p className="text-sm text-slate-500 leading-relaxed mb-3 line-clamp-2">
                      {a.summary}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-slate-600">
                      <span className="flex items-center gap-1">
                        <Calendar size={11} />
                        {new Date(a.date).toLocaleDateString('pt-BR', { year: 'numeric', month: 'short', day: 'numeric' })}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={11} /> {a.readTime} min de leitura
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
