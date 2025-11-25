export default function SkillsSection() {
  const skillCategories = [
    {
      name: "Frontend",
      skills: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
      color: "from-cyan-500 to-blue-600",
    },
    {
      name: "Backend",
      skills: ["Node.js", "Express", "MongoDB", "PostgreSQL"],
      color: "from-blue-500 to-purple-600",
    },
    {
      name: "Tools & DevOps",
      skills: ["Docker", "Redis", "Git", "AWS"],
      color: "from-purple-500 to-pink-600",
    },
  ]

  return (
    <section id="skills" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Section Title */}
        <div className="mb-16 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Technical Skills
            </span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto"></div>
        </div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {skillCategories.map((category) => (
            <div
              key={category.name}
              className="bg-gradient-to-br from-space-800 to-space-900 border border-cyan-500/20 rounded-xl p-8 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/20"
            >
              <h3
                className={`text-2xl font-bold bg-gradient-to-r ${category.color} bg-clip-text text-transparent mb-6`}
              >
                {category.name}
              </h3>
              <div className="space-y-3">
                {category.skills.map((skill) => (
                  <div key={skill} className="flex items-center gap-3 text-gray-300">
                    <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${category.color}`}></div>
                    <span>{skill}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Key Skills Summary */}
        <div className="mt-16 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-xl p-8">
          <p className="text-gray-300 text-center">
            <span className="text-cyan-400 font-semibold">Tech Stack:</span> MERN Stack, Next.js, TypeScript, Docker,
            Redis, and more. Always learning and adapting to new technologies.
          </p>
        </div>
      </div>
    </section>
  )
}
