"use client"

import { useEffect, useState } from "react"

interface ContributionDay {
  date: string
  count: number
  level: "none" | "low" | "medium" | "high" | "max"
}

interface Stats {
  totalContributions: number
  currentStreak: number
}

const username=process.env.NEXT_PUBLIC_GITHUB_USERNAME;

function getLevelFromCount(count: number): ContributionDay["level"] {
  if (count === 0) return "none"
  if (count <= 3) return "low"
  if (count <= 6) return "medium"
  if (count <= 10) return "high"
  return "max"
}

function getLevelColor(level: ContributionDay["level"]) {
  switch (level) {
    case "max":
      return "bg-green-600"
    case "high":
      return "bg-green-500"
    case "medium":
      return "bg-green-400"
    case "low":
      return "bg-green-300"
    default:
      return "bg-space-700"
  }
}

function calcCurrentStreak(days: ContributionDay[]): number {
  // days are chronological from oldest → newest
  let streak = 0
  for (let i = days.length - 1; i >= 0; i--) {
    if (days[i].count > 0) streak++
    else break
  }
  return streak
}

export default function GitHubContributions() {
  const [contributions, setContributions] = useState<ContributionDay[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [stats, setStats] = useState<Stats>({
    totalContributions: 0,
    currentStreak: 0,
  })

  useEffect(() => {
    const fetchContributions = async () => {
      try {
        setLoading(true)
        setError(null)

        const res = await fetch(`/api/github-contributions?username=${username}`)
        const data = await res.json()

        if (!res.ok) {
          throw new Error(data.error || "Failed to load contributions")
        }

        const days: ContributionDay[] = (data.days || []).map((d: any) => ({
          date: d.date,
          count: d.count,
          level: getLevelFromCount(d.count),
        }))

        const currentStreak = calcCurrentStreak(days)

        setContributions(days)
        setStats({
          totalContributions: data.totalContributions || 0,
          currentStreak,
        })
      } catch (err: any) {
        console.error("[GitHubContributions] error:", err)
        setError(err.message || "Something went wrong")
      } finally {
        setLoading(false)
      }
    }

    fetchContributions()
  }, [])

  // group into weeks like before
  const weeks: ContributionDay[][] = []
  for (let i = 0; i < contributions.length; i += 7) {
    weeks.push(contributions.slice(i, i + 7))
  }

  return (
    <section id="contributions" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Section Title */}
        <div className="mb-16 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
              GitHub Contributions
            </span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-green-400 to-emerald-500 mx-auto"></div>
          <p className="text-gray-400 mt-4">Last 365 days of coding activity (real GitHub data)</p>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-2 gap-4 mb-8">
          <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-lg p-4 text-center">
            <p className="text-2xl font-bold text-green-400">{stats.totalContributions}</p>
            <p className="text-gray-400 text-sm">Total Contributions</p>
          </div>
          <div className="bg-gradient-to-br from-emerald-500/10 to-green-500/10 border border-emerald-500/20 rounded-lg p-4 text-center">
            <p className="text-2xl font-bold text-emerald-400">{stats.currentStreak}</p>
            <p className="text-gray-400 text-sm">Current Streak</p>
          </div>
        </div>

        
        {loading ? (
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-400"></div>
          </div>
        ) : error ? (
          <div className="text-center text-red-400 bg-red-500/10 border border-red-500/30 rounded-lg p-4">
            {error}
          </div>
        ) : (
          <div className="bg-gradient-to-br from-space-800 to-space-900 border border-green-500/20 rounded-xl p-8 overflow-x-auto">
           <div className="flex gap-1">
  {weeks.map((week, weekIdx) => (
    <div key={weekIdx} className="flex flex-col gap-1">
      {week.map((day, dayIdx) => (
        <div
          key={`${weekIdx}-${dayIdx}`}
          className={`
            w-4 h-4 rounded-sm
            ${getLevelColor(day.level)}
            ${day.level === "none" ? "border border-green-500/20" : ""}
            hover:ring-2 ring-green-400
            transition-all cursor-pointer
          `}
          title={`${day.date}: ${day.count} contributions`}
        />
      ))}
    </div>
  ))}
 </div>

         
            <div className="flex justify-center items-center gap-6 mt-8 text-xs text-gray-400">
              <div className="flex items-center gap-2">
                <span>Less</span>
                <div className="flex gap-1">
                  <div className="w-3 h-3 bg-space-700 rounded-sm"></div>
                  <div className="w-3 h-3 bg-green-300 rounded-sm"></div>
                  <div className="w-3 h-3 bg-green-400 rounded-sm"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-sm"></div>
                  <div className="w-3 h-3 bg-green-600 rounded-sm"></div>
                </div>
                <span>More</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
