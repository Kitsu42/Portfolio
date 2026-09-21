import { useParams, Link, Navigate } from 'react-router';
import { ArrowLeft, ArrowRight, Calendar, Clock, Copy, Check } from 'lucide-react';
import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { articles } from '../data/articles';

const markdownFiles = import.meta.glob('../articles/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

function CodeBlock({ language, filename, code }: { language: string; filename?: string; code: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="code-block my-6">
      <div className="code-block-header">
        <div className="flex items-center gap-3">
          <div className="code-block-dots">
            <span style={{ background: '#FF5F57' }} />
            <span style={{ background: '#FFBD2E' }} />
            <span style={{ background: '#28C840' }} />
          </div>
          {filename && <span style={{ color: '#94A3B8' }}>{filename}</span>}
          {!filename && <span style={{ color: '#4a5568' }}>{language}</span>}
        </div>
        <button
          onClick={copy}
          className="flex items-center gap-1.5 text-xs hover:text-slate-300 transition-colors"
          style={{ color: '#4a5568' }}
        >
          {copied ? <><Check size={12} style={{ color: '#4ADE80' }} /> Copiado</> : <><Copy size={12} /> Copiar</>}
        </button>
      </div>
      <pre>{code}</pre>
    </div>
  );
}

export default function ArticleDetail() {
  const { id } = useParams();
  const idx = articles.findIndex(a => a.id === id);
  if (idx === -1) return <Navigate to="/articles" replace />;

  const article = articles[idx];
  const prev = articles[idx + 1];
  const next = articles[idx - 1];

  return (
    <div className="min-h-screen">
      {/* Hero banner */}
      {article.image && (
        <div className="relative h-64 sm:h-80 overflow-hidden bg-slate-900">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover"
            style={{ filter: 'brightness(0.5)' }}
          />
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(to bottom, transparent 40%, #070B14)' }}
          />
        </div>
      )}

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
        {/* Back */}
        <Link
          to="/articles"
          className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-[#00D8FF] transition-colors mb-8"
        >
          <ArrowLeft size={15} /> Voltar para artigos
        </Link>

        {/* Meta */}
        <div className="flex flex-wrap items-center gap-3 mb-5">
          <span className="tag">{article.category}</span>
          {article.tags.slice(1).map(t => (
            <span key={t} className="tag tag-purple">{t}</span>
          ))}
        </div>

        <h1
          className="font-display font-bold leading-tight mb-6"
          style={{ fontSize: 'clamp(1.8rem, 4vw, 2.75rem)', letterSpacing: '-0.02em', color: '#E2E8F0' }}
        >
          {article.title}
        </h1>

        <div
          className="flex items-center gap-6 text-sm pb-8 mb-10"
          style={{ borderBottom: '1px solid rgba(255,255,255,0.07)', color: '#64748B' }}
        >
          <span className="flex items-center gap-1.5">
            <Calendar size={13} />
            {new Date(article.date).toLocaleDateString('pt-BR', { year: 'numeric', month: 'long', day: 'numeric' })}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock size={13} /> {article.readTime} min de leitura
          </span>
        </div>

        {/* Content */}
        <article className="prose-content">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              pre: ({ children }) => <>{children}</>,
              code: ({ className, children, ...props }) => {
                const language = /language-(\w+)/.exec(className ?? '')?.[1];
                const code = String(children).replace(/\n$/, '');

                if (!language) return <code {...props}>{children}</code>;
                return <CodeBlock language={language} code={code} />;
              },
            }}
          >
            {markdownFiles[`../articles/${article.contentFile}`]}
          </ReactMarkdown>
        </article>

        {/* Tags footer */}
        <div
          className="flex flex-wrap gap-2 mt-12 pt-8"
          style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}
        >
          {article.tags.map(t => (
            <span key={t} className="tag">{t}</span>
          ))}
        </div>

        {/* Prev / Next navigation */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-10">
          {prev && (
            <Link
              to={`/articles/${prev.id}`}
              className="group p-4 rounded-xl card-hover"
              style={{ background: '#0C1220', border: '1px solid rgba(255,255,255,0.06)' }}
            >
              <div className="flex items-center gap-2 text-xs text-slate-600 mb-2">
                <ArrowLeft size={12} /> Anterior
              </div>
              <div className="text-sm font-medium text-slate-300 group-hover:text-[#00D8FF] transition-colors leading-snug">
                {prev.title}
              </div>
            </Link>
          )}
          {next && (
            <Link
              to={`/articles/${next.id}`}
              className={`group p-4 rounded-xl card-hover ${!prev ? 'sm:col-start-2' : ''}`}
              style={{ background: '#0C1220', border: '1px solid rgba(255,255,255,0.06)' }}
            >
              <div className="flex items-center justify-end gap-2 text-xs text-slate-600 mb-2">
                Próximo <ArrowRight size={12} />
              </div>
              <div className="text-sm font-medium text-slate-300 group-hover:text-[#00D8FF] transition-colors text-right leading-snug">
                {next.title}
              </div>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
