"use client"
import { useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { Play } from "lucide-react"

export default function VideoSection() {
  const YT_ID = "-fX69US8YSM"
  const THUMBNAIL_SRC = "/thumbnails/why_you_should_hire_thumbnail.png"

  const [showPlayer, setShowPlayer] = useState(false)

  const handlePlayClick = () => {
    setShowPlayer(true)
  }

  return (
    <section id="video" className="py-20 px-4">
      <div className="max-w-4xl mx-auto">


        <div className="mb-12 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Why Hire Me?
            </span>
          </h2>
          <p className="text-gray-400 text-lg">
            A 1–2 minute introduction showcasing my passion and expertise.
          </p>
        </div>

       
        <div className="relative bg-gradient-to-br from-space-800 to-space-900 
                        border border-cyan-500/20 rounded-xl overflow-hidden 
                        hover:border-cyan-500/50 transition-all duration-300 
                        hover:shadow-lg hover:shadow-cyan-500/20">

          <div className="relative aspect-video bg-space-900">

            
            {showPlayer ? (
              <iframe
                src={`https://www.youtube.com/embed/${YT_ID}?autoplay=1&rel=0`}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <img
                src={THUMBNAIL_SRC}
                alt="Video thumbnail"
                className="w-full h-full object-cover"
              />
            )}

           
            <AnimatePresence>
              {!showPlayer && (
                <motion.div
                  key="video-overlay"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="absolute inset-0 flex items-center justify-center bg-black/50"
                >
                  <motion.button
                    type="button"
                    onClick={handlePlayClick}
                    initial={{ scale: 0.85, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-full 
                               bg-black/70 border border-cyan-400/70 text-cyan-50 
                               text-sm md:text-base hover:bg-black/90 
                               shadow-lg shadow-cyan-500/30 backdrop-blur-sm transition-all"
                  >
                    <Play className="w-4 h-4 fill-cyan-300" />
                    <span>Play Introduction</span>
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

    
          <div className="px-8 pb-8 pt-6 border-t border-cyan-500/20">
            <h3 className="text-xl font-bold text-cyan-400 mb-3">My Story</h3>
            <p className="text-gray-400 leading-relaxed">
              In this video, I share my journey as a developer, my passion for building
              innovative solutions, my experience as a hackathon enthusiast, and what 
              drives me to continuously learn and grow in this field.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
