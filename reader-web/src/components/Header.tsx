import { useState } from "react";
import "./style/Header.css";
import { RowsIcon, X, Check } from "@phosphor-icons/react";
import type { Chapter } from "../utils/chapters";
import { FontSettings } from "./FontSettings";
import { AccountMenu } from "./AccountMenu";

type HeaderProps = {
  chapters: Chapter[];
  currentChapterId: number;
  onSelectChapter: (id: number) => void;
  currentUser: string;
  onLogin: (username: string) => void;
  readChapters: number[];
};

export function Header({ 
  chapters, 
  currentChapterId, 
  onSelectChapter, 
  currentUser, 
  onLogin, 
  readChapters 
}: HeaderProps) {
  const [isNavOpen, setIsNavOpen] = useState(false);

  function handleSelect(id: number) {
    onSelectChapter(id);
    setIsNavOpen(false);
  }

  // Функція для отримання превью текста (перші 100 символів)
  function getPreview(content: string, length: number = 100): string {
    return content
      .replace(/<[^>]*>/g, "") // Видаляємо HTML теги
      .substring(0, length)
      .trim() + "...";
  }

  return (
    <>
      <header className="Header">
        <AccountMenu 
          currentUser={currentUser} 
          onLogin={onLogin} 
          readChaptersCount={readChapters.length} 
          totalChaptersCount={chapters.length} 
        />
        <h1 className="logoName">Fallen King</h1>
        <nav className="Navbar">
          <button 
            className="burger" 
            onClick={() => setIsNavOpen(true)}
            title="Розділи"
            aria-label="Відкрити розділи"
          >
            <RowsIcon size={28} color="var(--avory)" />
          </button>
          <FontSettings />         
        </nav>
      </header>

      {isNavOpen && (
        <div 
          className="navOverlay" 
          onClick={() => setIsNavOpen(false)}
        />
      )}

      <div className={`sideDrawer ${isNavOpen ? "open" : ""}`}>
        <div className="drawerHeader">
          <h2>Розділи</h2>
          <button 
            className="closeButton"
            onClick={() => setIsNavOpen(false)}
          >
            <X size={28} color="var(--avory)" />
          </button>
        </div>

        <ul className="chapterList">
          {chapters.map((chapter) => (
            <li
              key={chapter.id}
              className={`chapter-item ${chapter.id === currentChapterId ? "active" : ""}`}
              onClick={() => handleSelect(chapter.id)}
            >
              <div className="chapter-number">{chapter.id}</div>
              <div className="chapter-info">
                <h3 className="chapter-item-title">
                  <span className="chapter-title-text-group">
                    {chapter.title}
                    {readChapters.includes(chapter.id) && (
                      <span className="read-checkmark">
                        <Check size={14} weight="bold" />
                      </span>
                    )}
                  </span>
                  <span className="chapter-item-word-count">{chapter.wordCount} слів</span>
                </h3>
                <p className="chapter-preview">{getPreview(chapter.content, 120)}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}