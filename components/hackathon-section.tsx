"use client"

import Image from "next/image"
import { Trophy } from "lucide-react"
import { useState } from "react"
import IdeaFormModal from "./IdeaFormModal"

export default function HackathonSection() {
  const [showIdeaForm, setShowIdeaForm] = useState(false)

  return (
    <section id="hackathons" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Section Title */}
        <div className="mb-16 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
              Hackathon Experience
            </span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-yellow-400 to-orange-500 mx-auto"></div>
          <p className="text-gray-400 mt-4">Achievements and milestones from hackathons</p>
        </div>

        {/* Single Achievement Card */}
        <div
          onClick={() => setShowIdeaForm(true)}
          className="group bg-gradient-to-br from-space-800 to-space-900 border border-yellow-500/20 rounded-xl overflow-hidden hover:border-yellow-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-yellow-500/20 cursor-pointer max-w-2xl mx-auto"
        >
          {/* Image */}
          <div className="relative h-64 overflow-hidden p-2">
            <Image
              src="/hackathon-winner.jpeg"
              alt="Hackathon Experience"
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-300 "
            />
            <div className="absolute inset-0 bg-gradient-to-t from-space-900 to-transparent"></div>
          </div>

          {/* Content */}
          <div className="p-8 relative">
            {/* Trophy Icon */}
            <div className="flex items-center gap-2 mb-3">
              <Trophy className="w-6 h-6 text-yellow-400" />
              <span className="text-sm font-semibold text-yellow-400 uppercase tracking-wider">Hackathon Champion</span>
            </div>

            {/* Title */}
            <h3 className="text-3xl font-bold mb-4 text-white"> Hackathon Winner</h3>

            {/* Description */}
            <p className="text-gray-300 mb-8 text-base leading-relaxed">
              Built and shipped innovative project at VNIT hackathon. Won first place for exceptional execution,
              creativity, and technical implementation. A passionate hackathon enthusiast dedicated to rapid prototyping
              and turning ideas into reality.
            </p>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-yellow-500/20 border border-yellow-500/50 rounded-lg p-4">
                <p className="text-2xl font-bold text-yellow-400">1</p>
                <p className="text-sm text-gray-400">Hackathon Won</p>
              </div>
              <div className="bg-orange-500/20 border border-orange-500/50 rounded-lg p-4">
                <p className="text-2xl font-bold text-orange-400">7+</p>
                <p className="text-sm text-gray-400">Events Participated</p>
              </div>
            </div>

            {/* CTA Button */}
            <button className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 text-space-900 font-bold py-3 px-6 rounded-lg hover:shadow-lg hover:shadow-yellow-500/50 transition-all duration-300 group-hover:scale-105">
              Share Your Idea
            </button>
          </div>
        </div>
      </div>

      {/* Idea Form Modal */}
      <IdeaFormModal isOpen={showIdeaForm} onClose={() => setShowIdeaForm(false)} />
    </section>
  )
}
