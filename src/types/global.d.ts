declare global {
  interface Window {
    MathJax: {
      typesetPromise: () => Promise<void>
    }
  }
}

export {} 