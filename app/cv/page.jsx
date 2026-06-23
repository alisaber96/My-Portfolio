"use client";
import { ArrowLeft, Download } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { pdfjs } from "react-pdf";

const CV_PDF = "/docs/cv.pdf";
const CV_IMAGES = ["/docs/page1.jpg", "/docs/page2.jpg"];

export default function CVPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    pdfjs.GlobalWorkerOptions.workerSrc =
      "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";
    setMounted(true);
  }, []);

  const [numPages, setNumPages] = useState(0);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  if (!mounted) return null;
  return (
    <main className="min-h-screen bg-lab pb-8 pt-[88px]">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-slate-mid transition-colors hover:text-deep-space"
          >
            <ArrowLeft size={15} /> Back to portfolio
          </Link>
          <a
            href={CV_PDF}
            download="Ali-Saber-CV.pdf"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-deep-space px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-circuit"
          >
            <Download size={15} /> Download CV
          </a>
        </div>

        <section className="overflow-hidden rounded-lg border border-gray-100 bg-white shadow-sm dark:border-white/10">
          <div className="border-b border-gray-100 px-4 py-3 dark:border-white/10">
            <p className="text-sm font-medium text-deep-space">CV Preview</p>
            <p className="mt-1 text-xs text-slate-mid">
              If the embedded viewer is not available in your browser, use the
              download button above.
            </p>
          </div>

          <div className="flex flex-col items-center py-6">
            {/* <Document
              file={CV_PDF}
              onLoadSuccess={onDocumentLoadSuccess}
              loading={<p>Loading PDF...</p>}
            >
              {Array.from({ length: numPages }, (_, index) => (
                <div
                  key={index}
                  className="mb-6 overflow-hidden rounded-lg shadow-lg"
                >
                  <Page pageNumber={index + 1} width={900} />
                </div>
              ))}
            </Document> */}
            <div className="flex flex-col items-center py-6 max-h-[600px] overflow-y-auto">
              {CV_IMAGES.map((src, index) => (
                <img
                  key={index}
                  src={src}
                  alt={`CV page ${index + 1}`}
                  className="mb-6 w-full max-w-4xl rounded-lg shadow-lg"
                />
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
