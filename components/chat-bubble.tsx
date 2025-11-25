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
          history: [...messages, userMessage], // include latest message
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
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 shadow-lg hover:shadow-cyan-500/50 flex items-center justify-center text-white transition-all duration-300 hover:scale-110 z-40 animate-pulse"
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div
          className="fixed bottom-24 right-6 w-96 max-w-[calc(100vw-2rem)] bg-gradient-to-br from-space-800 to-space-900 border border-cyan-500/30 rounded-xl shadow-2xl shadow-cyan-500/20 z-40 flex flex-col max-h-96 animate-fade-in"
          style={{ animation: "fadeIn 0.3s ease-out" }}
        >
          {/* Header with Help Button */}
          <div className="bg-gradient-to-r from-cyan-500 to-blue-600 p-4 rounded-t-xl flex justify-between items-start">
            <div>
              <h3 className="font-bold text-white">Chat with Swayam's AI</h3>
              <p className="text-sm text-cyan-100">
                Ask me about my projects, skills, or experience
              </p>
            </div>
            <button
              onClick={() => setShowHelp((prev) => !prev)}
              className={`text-white p-2 rounded-lg transition-colors ${
                showHelp ? "bg-white/25" : "hover:bg-white/20"
              }`}
              title="Show quick questions"
            >
              <HelpCircle size={20} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.length === 0 && !loading && (
              <div className="text-center text-gray-400 py-6">
                <p className="mb-2">Hi! I'm Swayam's AI assistant.</p>
                <p className="text-sm">
                  Ask me anything about my projects, skills, or experience.
                </p>
                <p className="text-xs text-gray-500 mt-3 flex items-center justify-center gap-1">
                  <HelpCircle size={14} className="text-cyan-400" />
                  Tap the help icon above to see example questions.
                </p>
              </div>
            )}

            {messages.map((msg, idx) => (
              <div
                key={msg.id}
                className={`flex ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                } animate-fade-in`}
                style={{ animation: `fadeIn 0.3s ease-out ${idx * 0.05}s` }}
              >
                <div
                  className={`max-w-xs px-4 py-2 rounded-lg ${
                    msg.sender === "user"
                      ? "bg-cyan-600 text-white"
                      : "bg-space-700 text-gray-200"
                  }`}
                >
                  <p className="text-sm">{msg.text}</p>
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div className="bg-space-700 text-gray-200 px-4 py-2 rounded-lg">
                  <div className="flex gap-2">
                    <div className="w-2 h-2 rounded-full animate-bounce bg-cyan-400"></div>
                    <div
                      className="w-2 h-2 rounded-full animate-bounce bg-cyan-400"
                      style={{ animationDelay: "0.1s" }}
                    ></div>
                    <div
                      className="w-2 h-2 rounded-full animate-bounce bg-cyan-400"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Suggestions Row (more intuitive help) */}
          {showHelp && (
            <div className="border-t border-cyan-500/20 px-4 py-2 bg-space-800/80">
              <p className="text-xs text-gray-400 mb-2 flex items-center gap-1">
                <HelpCircle size={14} className="text-cyan-400" />
                Not sure what to ask? Tap a suggestion:
              </p>
              <div className="flex flex-wrap gap-2">
                {suggestedPrompts.map((prompt, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => sendMessage(prompt)}
                    className="text-xs bg-space-700 hover:bg-cyan-700 text-cyan-100 px-3 py-1 rounded-full border border-cyan-500/40 hover:border-cyan-300 transition-colors"
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
            className="border-t border-cyan-500/20 p-4 flex gap-2 bg-space-900/90"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me something..."
              className="flex-1 bg-space-700 text-white rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-cyan-500/50 border border-cyan-500/20 placeholder-gray-500"
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-cyan-600 hover:bg-cyan-700 text-white p-2 rounded-lg transition-colors disabled:opacity-50"
            >
              <Send size={18} />
            </button>
          </form>
        </div>
      )}
    </>
  )
}
