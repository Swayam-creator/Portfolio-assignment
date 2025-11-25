export default function AboutSection() {
  return (
    <section id="about" className="py-20 px-4 relative">
      <div className="max-w-4xl mx-auto">
        {/* Section Title */}
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">About Me</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-cyan-400 to-blue-500"></div>
        </div>

        {/* Content Grid */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              I'm a passionate full-stack developer with a deep love for building innovative web experiences. My journey
              started with curiosity about how the internet works, and it's evolved into a profession where I craft
              solutions that matter.
            </p>
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              As a hackathon enthusiast, I thrive on solving complex problems under pressure and collaborating with
              talented teams. I believe in continuous learning and pushing the boundaries of what's possible with web
              technologies.
            </p>
            <p className="text-gray-300 text-lg leading-relaxed">
              When I'm not coding, you'll find me exploring new technologies,
              reading books on self improvements and writing literature stuff.
            </p>
          </div>

          <div className="space-y-6">
            {/* Stats */}
            <div className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-lg p-6 hover:border-cyan-500/50 transition-all">
              <div className="text-3xl font-bold text-cyan-400 mb-2">10+</div>
              <div className="text-gray-400">Projects Completed</div>
            </div>
            <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-lg p-6 hover:border-blue-500/50 transition-all">
              <div className="text-3xl font-bold text-blue-400 mb-2">7+</div>
              <div className="text-gray-400">Hackathon Participations</div>
            </div>
           
          </div>
        </div>
      </div>
    </section>
  )
}
