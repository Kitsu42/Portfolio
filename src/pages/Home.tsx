import { Link } from 'react-router';
import { ArrowRight, Calendar, Clock, Code2, Mail, MessageCircle, Globe, ChevronRight } from 'lucide-react';
import { articles } from '../data/articles';
import { projects } from '../data/projects';

const skills = [
  { name: 'TypeScript', color: '#3B82F6' },
  { name: 'React', color: '#9bdb41' },
  { name: 'Node.js', color: '#4ADE80' },
  { name: 'Next.js', color: '#E2E8F0' },
];

const featuredArticles = articles.slice(0, 2);
const featuredProjects = projects.slice(0, 3);

const statusBadge = (status: string) => {
  const map: Record<string, string> = {
    active: 'tag-green',
    complete: 'tag',
    beta: 'tag-orange',
    archived: 'tag-purple',
  };
  return map[status] ?? 'tag';
};

export default function Home() {
  return (
    <div>
      {/* ── Hero ───────────────────────────────────────────── */}
      <section className="relative min-h-[92vh] flex items-center dot-grid overflow-hidden">
        {/* gradient glow */}
        <div
          className="absolute top-1/4 left-1/3 w-[600px] h-[600px] rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(0,216,255,0.05) 0%, transparent 70%)',
            transform: 'translate(-50%, -50%)',
          }}
        />
        <div
          className="absolute bottom-1/4 right-1/3 w-[400px] h-[400px] rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(139,92,246,0.05) 0%, transparent 70%)',
          }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="section-label mb-5">Available for work</div>
              <h1
                className="font-display font-bold leading-none mb-6"
                style={{ fontSize: 'clamp(2.8rem, 6vw, 5rem)', letterSpacing: '-0.02em' }}
              >
                <span className="block text-slate-300">Hi, I'm</span>
                <span className="gradient-text block">Kitsu</span>
              </h1>
              <p className="font-mono text-lg mb-4" style={{ color: '#64748B' }}>
                <span style={{ color: '#8B5CF6' }}>const</span>{' '}
                <span style={{ color: '#00D8FF' }}>role</span>{' '}
                <span style={{ color: '#64748B' }}>=</span>{' '}
                <span style={{ color: '#4ADE80' }}>"Full Stack Developer"</span>
                <span className="cursor-blink" style={{ color: '#00D8FF' }}>_</span>
              </p>
              <p className="text-slate-400 text-lg leading-relaxed mb-8 max-w-lg">
                I build scalable web applications, developer tooling, and browser-based games. Focused on TypeScript, Go, and cloud-native architectures.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link to="/projects" className="btn-primary">
                  Ver Projetos <ArrowRight size={16} />
                </Link>
                <Link to="/#about" className="btn-outline">
                  Conhecer mais
                </Link>
              </div>
            </div>

            <div className="hidden lg:block float-anim">
              <div
                className="code-block"
                style={{ boxShadow: '0 0 40px rgba(0,216,255,0.08), 0 0 80px rgba(139,92,246,0.04)' }}
              >
                <div className="code-block-header">
                  <div className="code-block-dots">
                    <span style={{ background: '#FF5F57' }} />
                    <span style={{ background: '#FFBD2E' }} />
                    <span style={{ background: '#28C840' }} />
                  </div>
                  <span>profile.ts</span>
                </div>
                <pre>{`const developer = {
  name: "Carlos Vinicius",
  location: "Goiânia, BR",
  focus: ["Cyber security", "systems", "games"],
  stack: {
    frontend: ["React", "TypeScript"],
    backend: ["Python", "C"],
    data: ["PostgreSQL", "MySQL"],
  },
  openToWork: true,
  coffee: Infinity,
};

export default developer;`}</pre>
              </div>
            </div>
          </div>
        </div>

        <div
          className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
          style={{ background: 'linear-gradient(to bottom, transparent, #070B14)' }}
        />
      </section>

      {/* ── About ──────────────────────────────────────────── */}
      <section id="about" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <div className="section-label">Sobre mim</div>
              <h2
                className="font-display font-bold text-4xl mb-6"
                style={{ letterSpacing: '-0.02em', color: '#E2E8F0' }}
              >
                Engenheiro de software<br />
                <span style={{ color: '#00D8FF' }}>apaixonado por sistemas</span>
              </h2>
              <div className="space-y-4 text-slate-400 text-[0.95rem] leading-relaxed">
                <p>
                  Com mais de 6 anos de experiência em desenvolvimento full stack, trabalho principalmente com arquiteturas baseadas em TypeScript e Go, criando tanto interfaces ricas em React quanto APIs de alta performance.
                </p>
                <p>
                  Nas horas livres, escrevo artigos técnicos sobre temas como otimização de banco de dados, compiladores e design de linguagens, e construo jogos de navegador como hobby de engenharia.
                </p>
                <p>
                  Interesses atuais: WebAssembly, Rust para sistemas de alto desempenho e compiladores JIT.
                </p>
              </div>
              <div className="mt-8 flex gap-3">
                <a href="mailto:e-mail@example.com" className="btn-outline text-sm py-2">
                  <Mail size={15} /> Entre em contato
                </a>
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="btn-outline text-sm py-2">
                  <Code2 size={15} /> GitHub
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-5">
                Tecnologias & ferramentas
              </h3>
              <div className="flex flex-wrap gap-2">
                {skills.map(s => (
                  <span
                    key={s.name}
                    className="px-3 py-1.5 rounded-md text-xs font-mono font-medium"
                    style={{
                      background: `${s.color}12`,
                      color: s.color,
                      border: `1px solid ${s.color}25`,
                    }}
                  >
                    {s.name}
                  </span>
                ))}
              </div>

              <div
                className="mt-8 grid grid-cols-3 gap-4"
              >
                {[
                  { value: '6+', label: 'Anos de experiência' },
                  { value: '40+', label: 'Projetos entregues' },
                  { value: '18', label: 'Artigos publicados' },
                ].map(stat => (
                  <div
                    key={stat.label}
                    className="p-4 rounded-xl text-center"
                    style={{ background: '#0C1220', border: '1px solid rgba(255,255,255,0.06)' }}
                  >
                    <div
                      className="font-display font-bold text-3xl mb-1"
                      style={{ color: '#00D8FF' }}
                    >
                      {stat.value}
                    </div>
                    <div className="text-slate-500 text-xs leading-tight">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Featured Articles ──────────────────────────────── */}
      <section className="py-20" style={{ background: '#0A0F1A' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <div className="section-label">Escrita</div>
              <h2
                className="font-display font-bold text-3xl"
                style={{ letterSpacing: '-0.02em', color: '#E2E8F0' }}
              >
                Artigos em destaque
              </h2>
            </div>
            <Link
              to="/articles"
              className="hidden sm:flex items-center gap-1.5 text-sm text-slate-500 hover:text-[#00D8FF] transition-colors"
            >
              Ver todos <ChevronRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {featuredArticles.map(a => (
              <Link
                key={a.id}
                to={`/articles/${a.id}`}
                className="group rounded-xl overflow-hidden card-hover block"
                style={{ background: '#0C1220', border: '1px solid rgba(255,255,255,0.06)' }}
              >
                {a.image && (
                  <div className="h-40 overflow-hidden bg-slate-900">
                    <img
                      src={a.image}
                      alt={a.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                )}
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="tag">{a.category}</span>
                    <span className="text-xs text-slate-600 flex items-center gap-1">
                      <Clock size={11} /> {a.readTime} min
                    </span>
                  </div>
                  <h3 className="font-display font-semibold text-lg text-slate-100 mb-2 group-hover:text-[#00D8FF] transition-colors leading-snug">
                    {a.title}
                  </h3>
                  <p className="text-sm text-slate-500 leading-relaxed mb-4 line-clamp-2">
                    {a.summary}
                  </p>
                  <div className="flex items-center gap-1.5 text-xs text-slate-600">
                    <Calendar size={11} />
                    {new Date(a.date).toLocaleDateString('pt-BR', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-6 sm:hidden text-center">
            <Link to="/articles" className="btn-outline text-sm">
              Ver todos os artigos <ChevronRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Featured Projects ──────────────────────────────── */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <div className="section-label">Trabalho</div>
              <h2
                className="font-display font-bold text-3xl"
                style={{ letterSpacing: '-0.02em', color: '#E2E8F0' }}
              >
                Projetos em destaque
              </h2>
            </div>
            <Link
              to="/projects"
              className="hidden sm:flex items-center gap-1.5 text-sm text-slate-500 hover:text-[#00D8FF] transition-colors"
            >
              Ver todos <ChevronRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {featuredProjects.map(p => (
              <Link
                key={p.id}
                to={`/projects/${p.id}`}
                className="group rounded-xl overflow-hidden card-hover block flex flex-col"
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
                    <h3 className="font-display font-semibold text-slate-100 group-hover:text-[#00D8FF] transition-colors">
                      {p.title}
                    </h3>
                    <span className={`tag ${statusBadge(p.status)}`}>{p.status}</span>
                  </div>
                  <p className="text-sm text-slate-500 leading-relaxed mb-4 flex-1 line-clamp-2">
                    {p.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {p.technologies.slice(0, 3).map(t => (
                      <span key={t} className="tag">{t}</span>
                    ))}
                    {p.technologies.length > 3 && (
                      <span className="tag">+{p.technologies.length - 3}</span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Contact ────────────────────────────────────────── */}
      <section id="contact" className="py-24" style={{ background: '#0A0F1A' }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="section-label justify-center">Contato</div>
          <h2
            className="font-display font-bold text-4xl mb-4 mt-2"
            style={{ letterSpacing: '-0.02em', color: '#E2E8F0' }}
          >
            Vamos conversar?
          </h2>
          <p className="text-slate-400 mb-10 leading-relaxed">
            Estou aberto a oportunidades, colaborações em projetos open source, ou apenas uma conversa sobre tecnologia.
          </p>
          <a href="mailto:e-mail@example.com" className="btn-primary text-base px-8 py-3 inline-flex">
            <Mail size={18} /> e-mail@example.com
          </a>
          <div className="flex justify-center gap-4 mt-8">
            {[
              { icon: Code2, href: 'https://github.com', label: 'GitHub' },
              { icon: MessageCircle, href: 'https://twitter.com', label: 'Twitter' },
              { icon: Globe, href: 'https://linkedin.com', label: 'LinkedIn' },
            ].map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm text-slate-400 hover:text-[#00D8FF] transition-colors"
                style={{ border: '1px solid rgba(255,255,255,0.08)' }}
              >
                <Icon size={16} /> {label}
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
