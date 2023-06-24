export interface ChatMessage {
  role: "user" | "assistant" | "system"
  content: string
}

declare global {
  interface Window { MathJax: any }
}