import { useParams, Link, Navigate } from 'react-router';
import { ArrowLeft, ExternalLink, Download, Code2, CheckCircle2, Package, Tag, Calendar } from 'lucide-react';
import { projects } from '../data/projects';

const statusStyle: Record<string, { className: string; label: string }> = {
  active: { className: 'tag-green', label: 'Ativo' },
  beta: { className: 'tag-orange', label: 'Beta' },
  complete: { className: 'tag', label: 'Completo' },
  archived: { className: 'tag-purple', label: 'Arquivado' },
};

export default function ProjectDetail() {
  const { id } = useParams();
  const project = projects.find(p => p.id === id);

  if (!project) return <Navigate to="/projects" replace />;

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div className="relative h-64 sm:h-80 overflow-hidden bg-slate-900">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover"
          style={{ filter: 'brightness(0.35)' }}
        />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to bottom, transparent 20%, #070B14)' }}
        />
        <div className="absolute inset-0 flex items-end">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 w-full">
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors mb-6"
            >
              <ArrowLeft size={15} /> Voltar para Projects
            </Link>
            <div className="flex flex-wrap items-center gap-3 mb-3">
              <span className={`tag ${statusStyle[project.status]?.className ?? 'tag'}`}>
                {statusStyle[project.status]?.label ?? project.status}
              </span>
              <span className="font-mono text-xs text-slate-600">v{project.version}</span>
            </div>
            <h1
              className="font-display font-bold"
              style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', letterSpacing: '-0.02em', color: '#E2E8F0' }}
            >
              {project.title}
            </h1>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <div>
              <h2 className="font-display font-semibold text-xl text-slate-100 mb-4">Sobre o projeto</h2>
              <p className="text-slate-400 leading-relaxed">{project.longDescription}</p>
            </div>

            {/* Features */}
            <div>
              <h2 className="font-display font-semibold text-xl text-slate-100 mb-4">Funcionalidades</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {project.features.map((f, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 p-3 rounded-lg"
                    style={{ background: '#0C1220', border: '1px solid rgba(255,255,255,0.05)' }}
                  >
                    <CheckCircle2 size={16} className="mt-0.5 flex-shrink-0" style={{ color: '#00D8FF' }} />
                    <span className="text-sm text-slate-400 leading-relaxed">{f}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Screenshots */}
            {project.screenshots.length > 0 && (
              <div>
                <h2 className="font-display font-semibold text-xl text-slate-100 mb-4">Screenshots</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {project.screenshots.map((s, i) => (
                    <div key={i} className="rounded-xl overflow-hidden bg-slate-900">
                      <img src={s} alt={`Screenshot ${i + 1}`} className="w-full h-48 object-cover" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Requirements */}
            {project.requirements && (
              <div>
                <h2 className="font-display font-semibold text-xl text-slate-100 mb-4">Requisitos</h2>
                <div
                  className="rounded-xl p-5"
                  style={{ background: '#0C1220', border: '1px solid rgba(255,255,255,0.06)' }}
                >
                  <ul className="space-y-2">
                    {project.requirements.map((r, i) => (
                      <li key={i} className="flex items-center gap-3 text-sm text-slate-400">
                        <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: '#00D8FF' }} />
                        {r}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            {/* Actions */}
            <div
              className="rounded-xl p-5 space-y-3"
              style={{ background: '#0C1220', border: '1px solid rgba(255,255,255,0.06)' }}
            >
              {project.demoUrl && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary w-full justify-center"
                >
                  <ExternalLink size={15} /> Ver demo online
                </a>
              )}
              {project.repoUrl && (
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline w-full justify-center"
                >
                  <Code2 size={15} /> Código fonte
                </a>
              )}
              {project.downloadUrl && (
                <a
                  href={project.downloadUrl}
                  className="btn-outline w-full justify-center"
                >
                  <Download size={15} /> Download
                </a>
              )}
            </div>

            {/* Info */}
            <div
              className="rounded-xl p-5 space-y-4"
              style={{ background: '#0C1220', border: '1px solid rgba(255,255,255,0.06)' }}
            >
              <h3 className="font-display font-semibold text-sm text-slate-300 uppercase tracking-widest">
                Informações
              </h3>
              <div className="space-y-4 text-sm">
                <div>
                  <div className="flex items-center gap-1.5 text-slate-600 text-xs mb-1.5">
                    <Tag size={11} /> Versão
                  </div>
                  <span className="font-mono text-slate-300">v{project.version}</span>
                </div>
                <div>
                  <div className="flex items-center gap-1.5 text-slate-600 text-xs mb-1.5">
                    <Calendar size={11} /> Última atualização
                  </div>
                  <span className="text-slate-300">
                    {new Date(project.updatedAt).toLocaleDateString('pt-BR', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </span>
                </div>
                <div>
                  <div className="flex items-center gap-1.5 text-slate-600 text-xs mb-2">
                    <Package size={11} /> Tecnologias
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {project.technologies.map(t => (
                      <span key={t} className="tag">{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
