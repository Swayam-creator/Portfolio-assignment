"use client"

import { useState, useEffect } from "react"
import { ChevronDown } from "lucide-react"

export default function HeroSection() {
  const [scrollY, setScrollY] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <section className="min-h-screen flex items-center justify-center pt-20 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-600/10 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-20 right-10 w-72 h-72 bg-cyan-600/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>

      {/* Parallax Effect */}
      <div className="absolute inset-0 pointer-events-none" style={{ transform: `translateY(${scrollY * 0.5}px)` }}>
        <div className="absolute top-1/4 left-1/4 text-6xl opacity-5 font-mono">&lt; /&gt;</div>
        <div className="absolute bottom-1/3 right-1/4 text-6xl opacity-5 font-mono">{}</div>
      </div>

      <div className="relative z-10 text-center px-4 max-w-4xl">
        <div className="mb-6 animate-fade-in" style={{ animation: "fadeIn 0.8s ease-in" }}>
          <span className="text-cyan-400 font-mono text-sm tracking-widest">WELCOME TO MY UNIVERSE</span>
        </div>

        <h1
          className="text-6xl md:text-7xl font-bold mb-6 leading-tight animate-fade-in"
          style={{ animation: "fadeIn 0.8s ease-in 0.1s backwards" }}
        >
          <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
            Swayam Allewar
          </span>
        </h1>

        <p
          className="text-xl md:text-2xl text-gray-300 mb-8 animate-fade-in"
          style={{ animation: "fadeIn 0.8s ease-in 0.2s backwards" }}
        >
          Full-Stack Developer | Hackathon Enthusiast | Building AI-Powered Experiences
        </p>

        <p
          className="text-gray-400 max-w-2xl mx-auto mb-12 animate-fade-in"
          style={{ animation: "fadeIn 0.8s ease-in 0.3s backwards" }}
        >
          Crafting intelligent, scalable web applications that blend modern design with cutting-edge technology.
          Passionate about solving complex problems with elegant solutions.
        </p>

        <div
          className="flex gap-4 justify-center mb-16 animate-fade-in"
          style={{ animation: "fadeIn 0.8s ease-in 0.4s backwards" }}
        >
          <a
            href="#projects"
            className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-105"
          >
            Explore My Work
          </a>
         
        </div>

        <div className="animate-bounce">
          <ChevronDown size={32} className="mx-auto text-cyan-400" />
        </div>
      </div>
    </section>
  )
}
