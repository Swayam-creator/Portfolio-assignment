export default function VideoSection() {
  return (
    <section id="video" className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Section Title */}
        <div className="mb-12 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Why Hire Me?
            </span>
          </h2>
          <p className="text-gray-400 text-lg">A 1-2 minute introduction showcasing my passion and expertise</p>
        </div>

        {/* Video Container */}
        <div className="relative bg-gradient-to-br from-space-800 to-space-900 border border-cyan-500/20 rounded-xl overflow-hidden hover:border-cyan-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/20">
          <div className="aspect-video bg-space-900 flex items-center justify-center">
            <div className="text-center">
              <div className="w-20 h-20 rounded-full border-4 border-cyan-400 flex items-center justify-center mx-auto mb-4">
                <div
                  className="w-0 h-0 border-l-8 border-l-transparent border-r-0 border-t-5 border-t-transparent border-b-5 border-b-transparent"
                  style={{
                    borderLeft: "12px solid transparent",
                    borderRight: "0px solid transparent",
                    borderTop: "8px solid #06b6d4",
                    borderBottom: "8px solid #06b6d4",
                  }}
                ></div>
              </div>
              <p className="text-gray-400 text-lg">Play Video Introduction</p>
              <p className="text-sm text-gray-500 mt-2">Your video will appear here</p>
            </div>
          </div>

          {/* Description */}
          <div className="p-8 border-t border-cyan-500/20">
            <h3 className="text-xl font-bold text-cyan-400 mb-3">My Story</h3>
            <p className="text-gray-400 leading-relaxed">
              In this video, I share my journey as a developer, my passion for building innovative solutions, my
              experience as a hackathon enthusiast, and what drives me to continuously learn and grow in this field. I
              believe in clear communication and authentic connection, which are key traits that make a great team
              member.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
