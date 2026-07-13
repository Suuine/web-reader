import { useState } from 'react'
import './App.css'
import { Header } from './components/Header'
import { ChapterContent } from './components/ChapterContent'
import { getAllChapters } from './utils/chapters'
import { ScrollButtons } from './components/ScrollButtons'

function App() {
  const chapters = getAllChapters()
  const [currentChapterId, setCurrentChapterId] = useState(chapters[0]?.id ?? 1)

  const currentChapter = chapters.find((c) => c.id === currentChapterId)

  return (
    <>
      <Header
        chapters={chapters}
        currentChapterId={currentChapterId}
        onSelectChapter={setCurrentChapterId}
      />
      {currentChapter ? (
        <ChapterContent 
          title={currentChapter.title} 
          content={currentChapter.content} 
          wordCount={currentChapter.wordCount}
        />
      ) : (
        <p>Глав поки немає.</p>
      )}
      <ScrollButtons />
    </>
  )
}

export default App