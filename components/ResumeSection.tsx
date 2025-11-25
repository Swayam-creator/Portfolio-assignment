"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "motion/react";
import { Download, ExternalLink, FileText, Maximize2, X } from "lucide-react"

export default function ResumeSection() {
  const [isMobile, setIsMobile] = useState(false)
  const [hasMounted, setHasMounted] = useState(false)
  const [isFullscreenOpen, setIsFullscreenOpen] = useState(false)

  // Detect mobile screen (less than 768px)
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  // Avoid SSR mismatch & enable lazy-ish loading
  useEffect(() => {
    setHasMounted(true)
  }, [])

  const openFullscreen = () => {
    setIsFullscreenOpen(true)
  }

  const closeFullscreen = () => {
    setIsFullscreenOpen(false)
  }

  return (
    <section id="resume" className="py-20 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Heading */}
        <div className="text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Resume
          </h2>
          <p className="text-gray-400 text-sm md:text-base">
            A quick preview of my experience, with a full PDF you can open or download.
          </p>
        </div>

        {/* Card wrapper */}
        <div className="mt-10 relative">
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="relative rounded-2xl border border-cyan-500/30 bg-gradient-to-br from-space-900/80 via-space-900/60 to-space-800/80 shadow-2xl shadow-cyan-500/20 overflow-hidden"
          >
            {/* Window chrome / toolbar */}
            <div className="flex items-center justify-between px-4 py-2 border-b border-cyan-500/20 bg-space-900/80 backdrop-blur-md">
              {/* File info */}
              <div className="flex items-center gap-2 text-xs md:text-sm text-gray-300">
                <FileText className="w-4 h-4 text-cyan-400" />
                <span className="font-medium">Swayam-Allewar-Resume.pdf</span>
                <span className="hidden sm:inline text-gray-500">• ~2 MB</span>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2">
                <a
                  href="/Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[11px] md:text-xs px-2 py-1 rounded-md border border-cyan-500/40 text-cyan-300 hover:bg-cyan-500/10 transition-colors"
                >
                  <ExternalLink className="w-3 h-3" />
                  Open
                </a>

                <a
                  href="/Resume.pdf"
                  download
                  className="inline-flex items-center gap-1 text-[11px] md:text-xs px-2 py-1 rounded-md bg-cyan-500/20 border border-cyan-500/50 text-cyan-100 hover:bg-cyan-500/30 transition-colors"
                >
                  <Download className="w-3 h-3" />
                  Download
                </a>

                {/* Fullscreen only makes sense on non-mobile */}
                {!isMobile && (
                  <button
                    type="button"
                    onClick={openFullscreen}
                    className="hidden sm:inline-flex items-center justify-center w-7 h-7 rounded-md border border-cyan-500/30 text-cyan-300 hover:bg-cyan-500/10 transition-colors"
                    aria-label="View fullscreen"
                  >
                    <Maximize2 className="w-3 h-3" />
                  </button>
                )}
              </div>
            </div>

            {/* PDF Preview (Desktop Only) */}
            {!isMobile && hasMounted && (
              <div className="bg-space-950/80">
                <iframe
                  src="/Resume.pdf"
                  className="w-full h-[520px] md:h-[640px] bg-space-950"
                  title="Resume Preview"
                  loading="lazy"
                />
              </div>
            )}

            {/* Mobile Fallback - Open in New Tab */}
            {isMobile && (
              <div className="p-8 text-center bg-space-950/80">
                <p className="text-gray-400 mb-4">
                  PDF preview is limited on mobile.  
                  Open it in a new tab instead.
                </p>

                <a
                  href="/Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-cyan-500/20 border border-cyan-500/50 text-cyan-300 hover:bg-cyan-500/30 transition-all"
                >
                  <ExternalLink className="w-4 h-4" />
                  Open Resume
                </a>
              </div>
            )}
          </motion.div>

          {/* Glow effect behind card */}
          <div className="pointer-events-none absolute inset-x-10 -bottom-6 h-24 bg-cyan-500/20 blur-3xl opacity-40" />
        </div>
      </div>

      {/* Fullscreen modal */}
      <AnimatePresence>
        {isFullscreenOpen && (
          <motion.div
            key="resume-fullscreen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="relative w-[95vw] h-[85vh] max-w-5xl rounded-xl overflow-hidden border border-cyan-500/40 bg-space-950"
            >
              {/* Modal header */}
              <div className="flex items-center justify-between px-4 py-2 border-b border-cyan-500/30 bg-space-900/80">
                <div className="flex items-center gap-2 text-xs md:text-sm text-gray-300">
                  <FileText className="w-4 h-4 text-cyan-400" />
                  <span className="font-medium">Swayam-Allewar-Resume.pdf</span>
                </div>
                <div className="flex items-center gap-2">
                  <a
                    href="/Resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hidden sm:inline-flex items-center gap-1 text-[11px] md:text-xs px-2 py-1 rounded-md border border-cyan-500/40 text-cyan-300 hover:bg-cyan-500/10 transition-colors"
                  >
                    <ExternalLink className="w-3 h-3" />
                    Open in new tab
                  </a>
                  <button
                    onClick={closeFullscreen}
                    className="inline-flex items-center justify-center w-7 h-7 rounded-md border border-cyan-500/40 text-cyan-200 hover:bg-cyan-500/10 transition-colors"
                    aria-label="Close fullscreen"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              </div>

              {/* Fullscreen iframe */}
              <iframe
                src="/Resume.pdf"
                className="w-full h-full bg-space-950"
                title="Resume Fullscreen"
                loading="lazy"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
