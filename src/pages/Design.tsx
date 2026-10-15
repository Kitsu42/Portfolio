import { useEffect, useRef, useState } from 'react';
import { FileText, Image, Maximize2, X } from 'lucide-react';
import { getDocument, GlobalWorkerOptions } from 'pdfjs-dist';
import pdfWorker from 'pdfjs-dist/build/pdf.worker.min.mjs?url';
import { designWorks, type DesignWork } from '../data/design';

GlobalWorkerOptions.workerSrc = pdfWorker;

function PdfPreview({ url, title }: { url: string; title: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading');
  const [aspectRatio, setAspectRatio] = useState(1 / 1.414);

  useEffect(() => {
    let cancelled = false;
    let cancelRender: (() => void) | undefined;
    const loadingTask = getDocument({ url });

    void loadingTask.promise
      .then(async document => {
        const page = await document.getPage(1);
        if (cancelled) return;

        const viewport = page.getViewport({ scale: 1.5 });
        const canvas = canvasRef.current;
        const context = canvas?.getContext('2d');
        if (!canvas || !context) {
          throw new Error('Não foi possível preparar o canvas para a prévia do PDF.');
        }

        canvas.width = viewport.width;
        canvas.height = viewport.height;
        setAspectRatio(viewport.width / viewport.height);

        const renderTask = page.render({ canvas, canvasContext: context, viewport });
        cancelRender = () => renderTask.cancel();
        await renderTask.promise;
        if (!cancelled) setStatus('ready');
      })
      .catch((error: unknown) => {
        if (cancelled) return;
        console.error(`Não foi possível gerar a prévia do PDF "${title}".`, error);
        setStatus('error');
      });

    return () => {
      cancelled = true;
      cancelRender?.();
      void loadingTask.destroy().catch(error => {
        console.error(`Não foi possível liberar o PDF "${title}".`, error);
      });
    };
  }, [title, url]);

  return (
    <div
      className="relative w-full overflow-hidden bg-slate-900"
      style={{ aspectRatio }}
      aria-label={`Prévia da primeira página: ${title}`}
    >
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className={`absolute inset-0 block h-full w-full object-contain transition-opacity duration-300 group-hover:scale-[1.03] ${
          status === 'ready' ? 'opacity-100' : 'opacity-0'
        }`}
      />
      {status !== 'ready' && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-[#C4B5FD]">
          <FileText size={40} />
          <span className="font-mono text-xs uppercase tracking-widest">
            {status === 'error' ? 'Prévia indisponível' : 'Carregando prévia'}
          </span>
        </div>
      )}
    </div>
  );
}

export default function Design() {
  const [selectedWork, setSelectedWork] = useState<DesignWork | null>(null);

  useEffect(() => {
    if (!selectedWork) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setSelectedWork(null);
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', closeOnEscape);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', closeOnEscape);
    };
  }, [selectedWork]);

  return (
    <div className="min-h-screen">
      <header
        className="relative overflow-hidden py-20"
        style={{
          background: 'linear-gradient(135deg, #070B14 0%, #101326 50%, #070B14 100%)',
          borderBottom: '1px solid rgba(255,255,255,0.05)',
        }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at 70% 0%, rgba(139,92,246,0.13) 0%, transparent 58%)' }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-3">
            <Image size={20} style={{ color: '#C4B5FD' }} />
            <span className="font-mono text-xs text-slate-600 uppercase tracking-widest">Visual archive</span>
          </div>
          <h1 className="font-display font-bold mb-3" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', letterSpacing: '-0.02em', color: '#E2E8F0' }}>
            Design & arte
          </h1>
          <p className="text-slate-400 max-w-xl leading-relaxed">
            Estudos visuais, identidades e imagens que nasceram entre a tela e o papel.
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <div className="flex items-end justify-between gap-4 mb-8">
          <div>
            <p className="section-label">Selected works</p>
            <p className="text-sm text-slate-500">{designWorks.length} peças no arquivo</p>
          </div>
          <p className="hidden sm:block text-xs font-mono text-slate-600">Clique para expandir</p>
        </div>

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-5">
          {designWorks.map(work => (
            <button
              key={work.id}
              type="button"
              onClick={() => setSelectedWork(work)}
              className="group relative block w-full overflow-hidden rounded-xl text-left break-inside-avoid mb-5 cursor-zoom-in focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00D8FF]"
              aria-label={`Abrir projeto ${work.title}`}
            >
              {work.images.length > 0 ? (
                <img
                  src={work.images[0]}
                  alt={work.title}
                  className="block w-full h-auto transition-transform duration-500 group-hover:scale-[1.03]"
                  loading="lazy"
                />
              ) : work.pdf ? (
                <PdfPreview url={work.pdf} title={work.title} />
              ) : (
                <div className="flex aspect-[4/3] flex-col items-center justify-center gap-3 bg-slate-900 text-[#C4B5FD]">
                  <FileText size={40} />
                  <span className="font-mono text-xs uppercase tracking-widest">Projeto em PDF</span>
                </div>
              )}
              {(work.images.length > 1 || work.pdf) && (
                <div className="absolute top-3 left-3 flex gap-2">
                  {work.images.length > 1 && (
                    <span className="flex items-center gap-1 rounded-full bg-black/70 px-2 py-1 text-xs text-white">
                      <Image size={13} />
                      {work.images.length}
                    </span>
                  )}
                  {work.pdf && (
                    <span className="flex items-center gap-1 rounded-full bg-black/70 px-2 py-1 text-xs text-white">
                      <FileText size={13} />
                      PDF
                    </span>
                  )}
                </div>
              )}
              <div className="absolute inset-0 flex flex-col justify-end p-5 opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity" style={{ background: 'linear-gradient(to top, rgba(7,11,20,0.92), transparent 58%)' }}>
                <span className="text-[0.65rem] font-mono uppercase tracking-widest text-[#C4B5FD] mb-1">{work.category}</span>
                <span className="font-display text-xl font-semibold text-white">{work.title}</span>
                <Maximize2 size={16} className="absolute bottom-5 right-5 text-white/80" />
              </div>
            </button>
          ))}
        </div>
      </main>

      {selectedWork && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-8"
          role="dialog"
          aria-modal="true"
          aria-label={selectedWork.title}
          onClick={() => setSelectedWork(null)}
          style={{ background: 'rgba(3,5,10,0.9)', backdropFilter: 'blur(12px)' }}
        >
          <button
            type="button"
            onClick={() => setSelectedWork(null)}
            className="absolute top-5 right-5 p-2 text-slate-400 hover:text-white transition-colors"
            aria-label="Fechar projeto"
          >
            <X size={26} />
          </button>
          <div className="relative max-h-full w-full max-w-5xl overflow-y-auto" onClick={event => event.stopPropagation()}>
            <div className="pt-4">
              <p className="text-xs font-mono uppercase tracking-widest text-[#C4B5FD] mb-1">{selectedWork.category}</p>
              <h2 className="font-display text-2xl font-semibold text-white">{selectedWork.title}</h2>
              <p className="mt-1 text-sm text-slate-400">{selectedWork.description}</p>
            </div>
            <div className="mt-4 space-y-4">
              {selectedWork.images.map((image, index) => (
                <img
                  key={`${image}-${index}`}
                  src={image}
                  alt={`${selectedWork.title}: imagem ${index + 1}`}
                  className="max-h-[82vh] max-w-full rounded-lg object-contain shadow-2xl"
                />
              ))}
              {selectedWork.pdf && (
                <section aria-label={`PDF de ${selectedWork.title}`}>
                  <iframe
                    src={selectedWork.pdf}
                    title={`PDF: ${selectedWork.title}`}
                    className="h-[70vh] w-full rounded-lg bg-white"
                  />
                  <a
                    href={selectedWork.pdf}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-2 inline-flex items-center gap-2 text-sm text-[#C4B5FD] hover:text-white"
                  >
                    <FileText size={16} />
                    Abrir PDF em nova aba
                  </a>
                </section>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}