import { useState, useEffect } from 'react'
import './App.css'
import { Header } from './components/Header'
import { ChapterContent } from './components/ChapterContent'
import { getAllChapters } from './utils/chapters'
import { ScrollButtons } from './components/ScrollButtons'
import { getUserProgress, saveUserProgress } from './utils/db'

function App() {
  const chapters = getAllChapters()
  const [currentChapterId, setCurrentChapterId] = useState(chapters[0]?.id ?? 1)
  const [currentUser, setCurrentUser] = useState(() => localStorage.getItem('reader_username') || 'Гість')
  const [readChapters, setReadChapters] = useState<number[]>([])

  const currentChapter = chapters.find((c) => c.id === currentChapterId)

  // Load user progress when current user changes
  useEffect(() => {
    if (currentUser) {
      getUserProgress(currentUser).then((progress) => {
        setReadChapters(progress.readChapters || [])
      })
    }
  }, [currentUser])

  function handleLogin(username: string) {
    setCurrentUser(username)
    localStorage.setItem('reader_username', username)
  }

  function handleToggleRead(chapterId: number) {
    if (!currentUser) return
    let updated: number[]
    if (readChapters.includes(chapterId)) {
      updated = readChapters.filter(id => id !== chapterId)
    } else {
      updated = [...readChapters, chapterId]
    }
    setReadChapters(updated)
    saveUserProgress(currentUser, updated)
  }

  return (
    <>
      <Header
        chapters={chapters}
        currentChapterId={currentChapterId}
        onSelectChapter={setCurrentChapterId}
        currentUser={currentUser}
        onLogin={handleLogin}
        readChapters={readChapters}
      />
      {currentChapter ? (
        <ChapterContent 
          id={currentChapter.id}
          title={currentChapter.title} 
          content={currentChapter.content} 
          wordCount={currentChapter.wordCount}
          isRead={readChapters.includes(currentChapter.id)}
          onToggleRead={() => handleToggleRead(currentChapter.id)}
        />
      ) : (
        <p>Глав поки немає.</p>
      )}
      <ScrollButtons />
    </>
  )
}

export default App