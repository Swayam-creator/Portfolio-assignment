"use client"

import { Download, ExternalLink, FileText, Maximize2 } from "lucide-react"

export default function ResumeSection() {
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
          <div className="relative rounded-2xl border border-cyan-500/30 bg-gradient-to-br from-space-900/80 via-space-900/60 to-space-800/80 shadow-2xl shadow-cyan-500/20 overflow-hidden">
            {/* Window chrome / toolbar */}
            <div className="flex items-center justify-between px-4 py-2 border-b border-cyan-500/20 bg-space-900/80 backdrop-blur-md">
              {/* Left: file info */}
              <div className="flex items-center gap-2 text-xs md:text-sm text-gray-300">
                <FileText className="w-4 h-4 text-cyan-400" />
                <span className="font-medium">Swayam-Allewar-Resume.pdf</span>
                <span className="hidden sm:inline text-gray-500">• ~2 MB</span>
              </div>

              {/* Right: actions */}
              <div className="flex items-center gap-2">
                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden sm:inline-flex items-center gap-1 text-[11px] md:text-xs px-2 py-1 rounded-md border border-cyan-500/40 text-cyan-300 hover:bg-cyan-500/10 transition-colors"
                >
                  <ExternalLink className="w-3 h-3" />
                  Open in new tab
                </a>
                <a
                  href="/Resume.pdf"
                  download
                  className="inline-flex items-center gap-1 text-[11px] md:text-xs px-2 py-1 rounded-md bg-cyan-500/20 border border-cyan-500/50 text-cyan-100 hover:bg-cyan-500/30 transition-colors"
                >
                  <Download className="w-3 h-3" />
                  Download
                </a>
                <button
                  type="button"
                  className="hidden sm:inline-flex items-center justify-center w-7 h-7 rounded-md border border-cyan-500/30 text-cyan-300 hover:bg-cyan-500/10 transition-colors"
                  aria-label="View fullscreen"
                >
                  <Maximize2 className="w-3 h-3" />
                </button>
              </div>
            </div>

          
            <div className="bg-space-950/80">
              <iframe
                src="/Resume.pdf"
                className="w-full h-[520px] md:h-[640px] bg-space-950"
                title="Resume Preview"
              />
            </div>
          </div>

          {/* Glow effect behind card */}
          <div className="pointer-events-none absolute inset-x-10 -bottom-6 h-24 bg-cyan-500/20 blur-3xl opacity-40" />
        </div>

      
        
      </div>
    </section>
  )
}
