'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Download, Loader2 } from 'lucide-react';

const CV_PDF  = '/docs/Ali-Saber-CV.pdf';
const PDFJS   = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js';
const WORKER  = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

export default function CVPage() {
  const containerRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(false);

  useEffect(() => {
    let cancelled = false;

    const run = async () => {
      try {
        // ── 1. Load PDF.js from CDN (once) ──────────────────────────────────
        if (!window.pdfjsLib) {
          await new Promise((resolve, reject) => {
            const s = document.createElement('script');
            s.src = PDFJS;
            s.onload = resolve;
            s.onerror = reject;
            document.head.appendChild(s);
          });
          window.pdfjsLib.GlobalWorkerOptions.workerSrc = WORKER;
        }
        if (cancelled) return;

        // ── 2. Open the PDF document ─────────────────────────────────────────
        const pdfDoc = await window.pdfjsLib.getDocument(CV_PDF).promise;
        if (cancelled) return;

        const el = containerRef.current;
        if (!el) return;
        el.innerHTML = ''; // clear any previous render

        // ── 3. Render each page to a <canvas> ────────────────────────────────
        for (let p = 1; p <= pdfDoc.numPages; p++) {
          if (cancelled) break;

          const page     = await pdfDoc.getPage(p);
          // Render at 2× for sharpness; CSS width:100% scales it to fit
          const viewport = page.getViewport({ scale: 2 });

          const canvas      = document.createElement('canvas');
          canvas.width      = viewport.width;
          canvas.height     = viewport.height;
          canvas.style.cssText =
            'width:100%;display:block;margin-bottom:2px;';

          el.appendChild(canvas);
          await page.render({
            canvasContext: canvas.getContext('2d'),
            viewport,
          }).promise;

          // Hide the spinner as soon as the first page is painted
          if (p === 1 && !cancelled) setLoading(false);
        }
      } catch {
        if (!cancelled) { setLoading(false); setError(true); }
      }
    };

    run();
    return () => { cancelled = true; };
  }, []);

  return (
    <main className="pt-[88px] pb-8 min-h-screen bg-lab">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">

        {/* Toolbar */}
        <div className="flex items-center justify-between mb-5">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-slate-mid
                       hover:text-deep-space transition-colors"
          >
            <ArrowLeft size={15} /> Back to portfolio
          </Link>
          <a
            href={CV_PDF}
            download="Ali-Saber-CV.pdf"
            className="inline-flex items-center gap-2 bg-deep-space text-white
                       px-4 py-2 rounded-lg text-sm font-medium
                       hover:bg-circuit transition-colors shadow-sm"
          >
            <Download size={15} /> Download CV
          </a>
        </div>

        {/* Loading spinner */}
        {loading && !error && (
          <div className="bg-white rounded-2xl border border-gray-100
                          flex items-center justify-center gap-3 text-slate-mid"
               style={{ height: '60vh' }}>
            <Loader2 size={20} className="animate-spin text-signal" />
            <span className="text-sm">Loading CV…</span>
          </div>
        )}

        {/* Error fallback */}
        {error && (
          <div className="bg-white rounded-2xl border border-gray-100
                          flex flex-col items-center justify-center gap-4 p-8 text-center"
               style={{ height: '60vh' }}>
            <p className="text-sm text-slate-mid">
              Could not render the CV preview.
            </p>
            <a
              href={CV_PDF}
              download="Ali-Saber-CV.pdf"
              className="inline-flex items-center gap-2 bg-deep-space text-white
                         px-5 py-2.5 rounded-lg text-sm font-medium
                         hover:bg-circuit transition-colors"
            >
              <Download size={15} /> Download instead
            </a>
          </div>
        )}

        {/*
          Canvas container — always in the DOM so clientWidth is available.
          Pages are appended here as they render; scroll to read multi-page CVs.
        */}
        <div
          ref={containerRef}
          className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-auto"
          style={{
            display:   error ? 'none' : 'block',
            maxHeight: '88vh',
          }}
        />

      </div>
    </main>
  );
}
