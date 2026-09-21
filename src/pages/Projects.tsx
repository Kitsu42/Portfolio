import { useState } from 'react';
import { Link } from 'react-router';
import { Search, Layers, ExternalLink, Download } from 'lucide-react';
import { projects } from '../data/projects';

const allTechs = ['All', ...Array.from(new Set(projects.flatMap(p => p.technologies)))];
const allStatuses = ['All', 'active', 'beta', 'complete', 'archived'];

const statusStyle: Record<string, { className: string; label: string }> = {
  active: { className: 'tag-green', label: 'Ativo' },
  beta: { className: 'tag-orange', label: 'Beta' },
  complete: { className: 'tag', label: 'Completo' },
  archived: { className: 'tag-purple', label: 'Arquivado' },
};

export default function Projects() {
  const [query, setQuery] = useState('');
  const [activeTech, setActiveTech] = useState('All');
  const [activeStatus, setActiveStatus] = useState('All');

  const filtered = projects.filter(p => {
    const matchTech = activeTech === 'All' || p.technologies.includes(activeTech);
    const matchStatus = activeStatus === 'All' || p.status === activeStatus;
    const q = query.toLowerCase();
    const matchQ = !q || p.title.toLowerCase().includes(q) || p.description.toLowerCase().includes(q) || p.technologies.some(t => t.toLowerCase().includes(q));
    return matchTech && matchStatus && matchQ;
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-3">
            <Layers size={20} style={{ color: '#00D8FF' }} />
            <span className="font-mono text-xs text-slate-600 uppercase tracking-widest">Software & Tools</span>
          </div>
          <h1
            className="font-display font-bold mb-3"
            style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', letterSpacing: '-0.02em', color: '#E2E8F0' }}
          >
            Projects
          </h1>
          <p className="text-slate-400 max-w-xl leading-relaxed">
            Aplicações, ferramentas e bibliotecas desenvolvidas e mantidas ativamente.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Filters */}
        <div className="flex flex-col gap-4 mb-8">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1 max-w-sm">
              <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
              <input
                type="text"
                placeholder="Buscar projetos..."
                value={query}
                onChange={e => setQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 rounded-lg text-sm text-slate-300 placeholder-slate-600 outline-none focus:ring-1 focus:ring-[rgba(0,216,255,0.4)] transition"
                style={{ background: '#0C1220', border: '1px solid rgba(255,255,255,0.08)' }}
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {allStatuses.map(s => (
                <button
                  key={s}
                  onClick={() => setActiveStatus(s)}
                  className="px-3 py-2 rounded-lg text-xs font-medium capitalize transition-all"
                  style={{
                    background: activeStatus === s ? 'rgba(0,216,255,0.12)' : '#0C1220',
                    color: activeStatus === s ? '#00D8FF' : '#64748B',
                    border: activeStatus === s ? '1px solid rgba(0,216,255,0.3)' : '1px solid rgba(255,255,255,0.06)',
                  }}
                >
                  {s === 'All' ? 'Todos' : (statusStyle[s]?.label ?? s)}
                </button>
              ))}
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {allTechs.slice(0, 10).map(t => (
              <button
                key={t}
                onClick={() => setActiveTech(t)}
                className="px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all"
                style={{
                  background: activeTech === t ? 'rgba(0,216,255,0.1)' : 'transparent',
                  color: activeTech === t ? '#00D8FF' : '#475569',
                  border: activeTech === t ? '1px solid rgba(0,216,255,0.25)' : '1px solid rgba(255,255,255,0.05)',
                }}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div className="text-xs text-slate-600 mb-6 font-mono">
          {filtered.length} projeto{filtered.length !== 1 ? 's' : ''} encontrado{filtered.length !== 1 ? 's' : ''}
        </div>

        {/* Projects grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <Layers size={40} className="mx-auto mb-4 text-slate-700" />
            <p className="text-slate-500">Nenhum projeto encontrado.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filtered.map(p => (
              <div
                key={p.id}
                className="group rounded-xl overflow-hidden card-hover flex flex-col"
                style={{ background: '#0C1220', border: '1px solid rgba(255,255,255,0.06)' }}
              >
                <div className="h-44 overflow-hidden bg-slate-900">
                  <img
                    src={p.image}
                    alt={p.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-display font-bold text-xl text-slate-100 group-hover:text-[#00D8FF] transition-colors">
                      {p.title}
                    </h3>
                    <div className="flex items-center gap-2">
                      <span className={`tag ${statusStyle[p.status]?.className ?? 'tag'}`}>
                        {statusStyle[p.status]?.label ?? p.status}
                      </span>
                    </div>
                  </div>
                  <p className="text-xs font-mono text-slate-600 mb-2">v{p.version}</p>
                  <p className="text-sm text-slate-500 leading-relaxed mb-4 flex-1 line-clamp-2">
                    {p.description}
                  </p>
                  <div className="flex flex-wrap gap-1 mb-4">
                    {p.technologies.slice(0, 4).map(t => (
                      <span key={t} className="tag text-[0.65rem]">{t}</span>
                    ))}
                    {p.technologies.length > 4 && (
                      <span className="tag text-[0.65rem]">+{p.technologies.length - 4}</span>
                    )}
                  </div>
                  <div className="flex gap-2 mt-auto">
                    <Link
                      to={`/projects/${p.id}`}
                      className="flex-1 py-2 px-3 rounded-lg text-xs font-medium text-center flex items-center justify-center gap-1.5 transition"
                      style={{
                        background: 'rgba(0,216,255,0.08)',
                        color: '#00D8FF',
                        border: '1px solid rgba(0,216,255,0.2)',
                      }}
                    >
                      <ExternalLink size={12} /> Ver projeto
                    </Link>
                    {p.downloadUrl && (
                      <a
                        href={p.downloadUrl}
                        className="py-2 px-3 rounded-lg text-xs font-medium flex items-center gap-1.5 transition"
                        style={{
                          background: 'rgba(255,255,255,0.04)',
                          color: '#94A3B8',
                          border: '1px solid rgba(255,255,255,0.08)',
                        }}
                      >
                        <Download size={12} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
