"use client"

import { useState } from "react"
import { Menu, X, Download } from "lucide-react"
export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { label: "About", href: "#about" },
    { label: "Projects", href: "#projects" },
    { label: "Skills", href: "#skills" },
    { label: "Contact", href: "#contact" },
  ]

  return (
    <nav className="fixed top-0 w-full bg-space-950/80 backdrop-blur-md border-b border-cyan-500/20 z-50">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
          SA
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8 items-center">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-gray-300 hover:text-cyan-400 transition-colors duration-300"
            >
              {item.label}
            </a>
          ))}

     
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-4">
        
          <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-space-900 border-t border-cyan-500/20">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="block px-4 py-3 text-gray-300 hover:text-cyan-400 hover:bg-space-800 transition-colors"
            >
              {item.label}
            </a>
          ))}

          {/* Mobile Resume Button */}
          <a
            href="/resume.pdf"
            download
            className="block px-4 py-3 text-cyan-300 hover:text-cyan-400 hover:bg-space-800 border-t border-cyan-500/20 flex items-center gap-2"
          >
            <Download size={18} />
            <span>Download Resume</span>
          </a>
        </div>
      )}
    </nav>
  )
}
