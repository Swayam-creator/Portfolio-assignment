"use client"
import type React from "react"
import { useState, useRef, useEffect } from "react"
import { MessageCircle, X, Send, HelpCircle } from "lucide-react"

interface Message {
  id: string
  text: string
  sender: "user" | "ai"
  timestamp: Date
}

export default function ChatBubble() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const [showHelp, setShowHelp] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Drag state
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const [dragStart, setDragStart] = useState<{ x: number; y: number } | null>(null)

  const suggestedPrompts = [
    "Tell me about your MERN stack projects",
    "What are your skills in Next.js?",
    "Describe your experience with Docker and Redis",
    "What hackathons have you participated in?",
    "Show me your experience with TypeScript",
    "Tell me about your backend expertise",
  ]

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, loading])

  // Drag handlers
  const handleHeaderMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault()
    setDragStart({
      x: e.clientX - dragOffset.x,
      y: e.clientY - dragOffset.y,
    })
  }

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!dragStart) return
      setDragOffset({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      })
    }

    const handleMouseUp = () => {
      if (dragStart) {
        setDragStart(null)
      }
    }

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("mouseup", handleMouseUp)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mouseup", handleMouseUp)
    }
  }, [dragStart, dragOffset])

  const sendMessage = async (textToSend: string) => {
    if (!textToSend.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: textToSend,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setShowHelp(false)
    setLoading(true)

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: textToSend,
          history: [...messages, userMessage],
        }),
      })

      const data = await response.json()
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: data.reply || "Sorry, I could not process that.",
        sender: "ai",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, aiMessage])
    } catch (error) {
      console.error("Chat error:", error)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "Sorry, I encountered an error. Please try again.",
        sender: "ai",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setLoading(false)
    }
  }

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    await sendMessage(input)
  }

  return (
    <>
      {/* Chat Bubble Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 shadow-lg shadow-cyan-500/60 hover:shadow-cyan-400/80 flex items-center justify-center text-white transition-all duration-300 hover:scale-110 z-[9999] animate-pulse"
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div
          className="
            fixed bottom-24 right-6 w-96 max-w-[calc(100vw-2rem)]
            rounded-2xl border border-cyan-400/50
            shadow-[0_0_35px_rgba(34,211,238,0.5)]
            bg-black/70 backdrop-blur-xl
            flex flex-col max-h-[26rem]
            animate-fade-in
            z-[9999]
          "
          style={{
            animation: "fadeIn 0.3s ease-out",
            transform: `translate(${dragOffset.x}px, ${dragOffset.y}px)`,
          }}
        >
          {/* Header */}
          <div
            onMouseDown={handleHeaderMouseDown}
            className="bg-gradient-to-r from-cyan-500 to-blue-600 px-4 py-3 rounded-t-2xl flex justify-between items-center cursor-move select-none"
          >
            <div>
              <h3 className="font-bold text-white text-sm">Chat with Swayam&apos;s AI</h3>
              <p className="text-[11px] text-cyan-100">
                Ask about projects, skills, or experience
              </p>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setShowHelp((prev) => !prev)
                }}
                className={`text-white p-1.5 rounded-lg transition-colors ${
                  showHelp ? "bg-white/25" : "hover:bg-white/20"
                }`}
                title="Show quick questions"
              >
                <HelpCircle size={18} />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setIsOpen(false)
                }}
                className="text-white/80 hover:text-white hover:bg-white/20 p-1.5 rounded-lg transition-colors"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 text-sm custom-scrollbar">
            {messages.length === 0 && !loading && (
              <div className="text-center text-gray-300/80 py-4 text-xs">
                <p className="mb-1">Hi! I&apos;m Swayam&apos;s AI assistant 🤖</p>
                <p>Ask anything about my tech stack, projects, or experience.</p>
                <p className="text-[11px] text-gray-400 mt-3 flex items-center justify-center gap-1">
                  <HelpCircle size={13} className="text-cyan-400" />
                  Tap the help icon above to see example questions.
                </p>
              </div>
            )}

            {messages.map((msg, idx) => (
              <div
                key={msg.id}
                className={`flex items-end gap-2 ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                } animate-fade-in`}
                style={{ animation: `fadeIn 0.3s ease-out ${idx * 0.05}s` }}
              >
                {/* AI Avatar */}
                {msg.sender === "ai" && (
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-cyan-500 to-blue-700 flex items-center justify-center text-[10px] font-semibold text-white shadow-lg shadow-cyan-500/60">
                    SA
                  </div>
                )}

                <div
                  className={`max-w-[75%] px-3 py-2 rounded-2xl border text-[13px] leading-relaxed ${
                    msg.sender === "user"
                      ? "bg-cyan-600/90 border-cyan-300/60 text-white rounded-br-sm"
                      : "bg-white/5 border-white/10 text-gray-100 rounded-bl-sm"
                  }`}
                >
                  <p>{msg.text}</p>
                </div>

                {/* User Avatar */}
                {msg.sender === "user" && (
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-purple-500 to-fuchsia-600 flex items-center justify-center text-[10px] font-semibold text-white shadow-lg shadow-fuchsia-500/60">
                    You
                  </div>
                )}
              </div>
            ))}

            {/* Typing Indicator */}
            {loading && (
              <div className="flex items-end gap-2 justify-start">
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-cyan-500 to-blue-700 flex items-center justify-center text-[10px] font-semibold text-white shadow-lg shadow-cyan-500/60">
                  SA
                </div>
                <div className="bg-white/5 border border-white/10 text-gray-100 px-3 py-2 rounded-2xl rounded-bl-sm text-[12px] flex flex-col gap-1">
                  <div className="flex gap-1 items-center">
                    <div className="w-1.5 h-1.5 rounded-full animate-bounce bg-cyan-400"></div>
                    <div
                      className="w-1.5 h-1.5 rounded-full animate-bounce bg-cyan-400"
                      style={{ animationDelay: "0.1s" }}
                    ></div>
                    <div
                      className="w-1.5 h-1.5 rounded-full animate-bounce bg-cyan-400"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                  </div>
                  <span className="text-[10px] text-gray-400">
                    Swayam&apos;s AI is typing...
                  </span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Suggestions */}
          {showHelp && (
            <div className="border-t border-cyan-400/30 px-4 py-3 bg-black/60 backdrop-blur-xl">
              <p className="text-[11px] text-gray-300 mb-2 flex items-center gap-1">
                <HelpCircle size={13} className="text-cyan-400" />
                Not sure what to ask? Tap a suggestion:
              </p>
              <div className="flex flex-wrap gap-2">
                {suggestedPrompts.map((prompt, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => sendMessage(prompt)}
                    className="text-[11px] bg-white/5 hover:bg-cyan-600/70 text-cyan-100 px-3 py-1 rounded-full border border-cyan-400/50 hover:border-cyan-200 transition-colors"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <form
            onSubmit={handleSendMessage}
            className="border-t border-cyan-400/30 px-3 py-3 flex gap-2 bg-black/70 backdrop-blur-lg rounded-b-2xl"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me something..."
              className="flex-1 bg-white/5 text-white rounded-xl px-3 py-2 text-[13px] focus:outline-none focus:ring-1 focus:ring-cyan-400/80 border border-white/10 placeholder-gray-500"
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-cyan-500 hover:bg-cyan-400 text-white p-2 rounded-xl transition-colors disabled:opacity-50 flex items-center justify-center shadow-md shadow-cyan-400/60"
            >
              <Send size={17} />
            </button>
          </form>
        </div>
      )}
    </>
  )
}
