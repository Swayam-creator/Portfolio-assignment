
import HeroSection from "@/components/hero-section"
import AboutSection from "@/components/about-section"
import ProjectsSection from "@/components/projects-section"
import SkillsSection from "@/components/skills-section"
import VideoSection from "@/components/video-section"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import ChatBubble from "@/components/chat-bubble"
import GitHubContributions from "@/components/github-contribution"
import HackathonSection from "@/components/hackathon-section"
import ResumeSection from "@/components/ResumeSection"

export default function Home() {
  return (
    <main className="bg-gradient-to-b from-space-900 via-space-800 to-space-900 text-white min-h-screen">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <SkillsSection />
      <GitHubContributions/>
      <HackathonSection/>
      <ResumeSection/>
      <VideoSection />
      <Footer />
      <ChatBubble />
    </main>
  )
}
