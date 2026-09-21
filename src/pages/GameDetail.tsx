import { useParams, Link, Navigate } from 'react-router';
import { useState } from 'react';
import { ArrowLeft, Play, Gamepad2, Calendar, RefreshCw, Maximize2, X } from 'lucide-react';
import { games } from '../data/games';

const statusColor: Record<string, string> = {
  playable: 'tag-green',
  beta: 'tag-orange',
  wip: 'tag-purple',
};
const statusLabel: Record<string, string> = {
  playable: 'Jogável',
  beta: 'Beta',
  wip: 'Em Progresso',
};

export default function GameDetail() {
  const { id } = useParams();
  const game = games.find(g => g.id === id);
  const [playing, setPlaying] = useState(false);

  if (!game) return <Navigate to="/games" replace />;

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div className="relative h-72 sm:h-96 overflow-hidden bg-slate-900">
        <img
          src={game.cover}
          alt={game.title}
          className="w-full h-full object-cover"
          style={{ filter: 'brightness(0.4)' }}
        />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to bottom, transparent 20%, #070B14)' }}
        />
        <div className="absolute inset-0 flex items-end">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 w-full">
            <Link
              to="/games"
              className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors mb-6"
            >
              <ArrowLeft size={15} /> Voltar para Games
            </Link>
            <div className="flex flex-wrap items-center gap-3 mb-3">
              {game.genre.map(g => (
                <span key={g} className="tag tag-purple">{g}</span>
              ))}
              <span className={`tag ${statusColor[game.status]}`}>{statusLabel[game.status]}</span>
            </div>
            <h1
              className="font-display font-bold"
              style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', letterSpacing: '-0.02em', color: '#E2E8F0' }}
            >
              {game.title}
            </h1>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main */}
          <div className="lg:col-span-2 space-y-8">
            {/* Play area */}
            {!playing ? (
              <div
                className="rounded-xl overflow-hidden"
                style={{ background: '#0C1220', border: '1px solid rgba(255,255,255,0.06)' }}
              >
                <div
                  className="relative h-80 flex items-center justify-center overflow-hidden"
                  style={{
                    background: 'radial-gradient(circle at center, rgba(139,92,246,0.12) 0%, #070B14 70%)',
                  }}
                >
                  <img
                    src={game.cover}
                    alt={game.title}
                    className="absolute inset-0 w-full h-full object-cover opacity-20"
                  />
                  <div className="relative text-center">
                    <Gamepad2 size={40} className="mx-auto mb-4 text-slate-600" />
                    <p className="text-slate-400 text-sm mb-6 max-w-xs mx-auto">
                      Clique em Jogar para iniciar <strong>{game.title}</strong> diretamente no navegador.
                    </p>
                    <button
                      onClick={() => setPlaying(true)}
                      className="btn-primary px-8 py-3 text-base"
                      style={{
                        background: '#8B5CF6',
                        boxShadow: '0 4px 20px rgba(139,92,246,0.4)',
                      }}
                    >
                      <Play size={18} fill="currentColor" /> Jogar Agora
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div
                className="rounded-xl overflow-hidden"
                style={{ background: '#0C1220', border: '1px solid rgba(139,92,246,0.3)' }}
              >
                <div
                  className="flex items-center justify-between px-4 py-3"
                  style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}
                >
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                    <span className="text-sm font-mono text-slate-400">{game.title} — executando</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="p-1.5 text-slate-500 hover:text-white transition-colors">
                      <Maximize2 size={14} />
                    </button>
                    <button
                      onClick={() => setPlaying(false)}
                      className="p-1.5 text-slate-500 hover:text-red-400 transition-colors"
                    >
                      <X size={14} />
                    </button>
                  </div>
                </div>
                <div
                  className="h-[480px] flex items-center justify-center"
                  style={{ background: '#060A12' }}
                >
                  <div className="text-center">
                    <div
                      className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                      style={{ background: 'rgba(139,92,246,0.15)', border: '1px solid rgba(139,92,246,0.3)' }}
                    >
                      <Gamepad2 size={28} style={{ color: '#8B5CF6' }} />
                    </div>
                    <p className="font-mono text-sm text-slate-500 mb-1">game_canvas.init()</p>
                    <p className="text-xs text-slate-700">O jogo carregaria aqui em produção</p>
                  </div>
                </div>
              </div>
            )}

            {/* Description */}
            <div>
              <h2 className="font-display font-semibold text-xl text-slate-100 mb-4">Sobre o jogo</h2>
              <p className="text-slate-400 leading-relaxed">{game.longDescription}</p>
            </div>

            {/* Controls */}
            <div>
              <h2 className="font-display font-semibold text-xl text-slate-100 mb-4">Controles</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {game.controls.map(c => (
                  <div
                    key={c.key}
                    className="flex items-center gap-3 p-3 rounded-lg"
                    style={{ background: '#0C1220', border: '1px solid rgba(255,255,255,0.06)' }}
                  >
                    <span
                      className="font-mono text-xs px-2 py-1 rounded"
                      style={{ background: '#141E33', color: '#94A3B8', whiteSpace: 'nowrap' }}
                    >
                      {c.key}
                    </span>
                    <span className="text-sm text-slate-400">{c.action}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            <div
              className="rounded-xl p-5 space-y-4"
              style={{ background: '#0C1220', border: '1px solid rgba(255,255,255,0.06)' }}
            >
              <h3 className="font-display font-semibold text-slate-200 text-sm uppercase tracking-widest">
                Informações
              </h3>
              <div className="space-y-3 text-sm">
                <div>
                  <div className="text-slate-600 text-xs mb-0.5">Gênero</div>
                  <div className="flex flex-wrap gap-1">
                    {game.genre.map(g => (
                      <span key={g} className="tag tag-purple">{g}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="text-slate-600 text-xs mb-0.5">Lançamento</div>
                  <div className="text-slate-300 flex items-center gap-1.5">
                    <Calendar size={12} style={{ color: '#64748B' }} />
                    {new Date(game.releaseDate).toLocaleDateString('pt-BR')}
                  </div>
                </div>
                <div>
                  <div className="text-slate-600 text-xs mb-0.5">Última atualização</div>
                  <div className="text-slate-300 flex items-center gap-1.5">
                    <RefreshCw size={12} style={{ color: '#64748B' }} />
                    {new Date(game.updatedAt).toLocaleDateString('pt-BR')}
                  </div>
                </div>
                <div>
                  <div className="text-slate-600 text-xs mb-1">Tecnologias</div>
                  <div className="flex flex-wrap gap-1">
                    {game.technologies.map(t => (
                      <span key={t} className="tag">{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={() => setPlaying(true)}
              className="w-full py-3 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition"
              style={{
                background: playing ? 'rgba(139,92,246,0.1)' : '#8B5CF6',
                color: playing ? '#8B5CF6' : 'white',
                border: playing ? '1px solid rgba(139,92,246,0.3)' : 'none',
              }}
            >
              <Play size={16} fill={playing ? 'none' : 'currentColor'} />
              {playing ? 'Jogando...' : 'Jogar agora'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
