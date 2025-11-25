import { Mail, Linkedin, Github, Twitter } from "lucide-react"

export default function Footer() {
  return (
    <footer id="contact" className="py-16 px-4 border-t border-cyan-500/20">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* About */}
          <div>
            <h3 className="text-xl font-bold text-cyan-400 mb-4">Swayam Allewar</h3>
            <p className="text-gray-400">Full-Stack Developer & Hackathon Enthusiast crafting the future of web.</p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold text-cyan-400 mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#about" className="text-gray-400 hover:text-cyan-400 transition-colors">
                  About
                </a>
              </li>
              <li>
                <a href="#projects" className="text-gray-400 hover:text-cyan-400 transition-colors">
                  Projects
                </a>
              </li>
              <li>
                <a href="#skills" className="text-gray-400 hover:text-cyan-400 transition-colors">
                  Skills
                </a>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-xl font-bold text-cyan-400 mb-4">Connect</h3>
            <div className="flex gap-4">
              <a href="mailto:your.email@example.com" className="text-gray-400 hover:text-cyan-400 transition-colors">
                <Mail size={24} />
              </a>
              <a
                href="https://www.linkedin.com/in/swayam-allewar/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-cyan-400 transition-colors"
              >
                <Linkedin size={24} />
              </a>
              <a
                href="https://github.com/Swayam-creator"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-cyan-400 transition-colors"
              >
                <Github size={24} />
              </a>
              <a
                href="https://x.com/AllewarSwayam"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-cyan-400 transition-colors"
              >
                <Twitter size={24} />
              </a>
            </div>
          </div>
        </div>

        

        {/* Copyright */}
        <div className="text-center text-gray-500 text-sm border-t border-cyan-500/20 pt-8">
          <p>&copy; 2025 Swayam Allewar. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
