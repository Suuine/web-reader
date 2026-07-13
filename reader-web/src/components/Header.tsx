import { useState } from "react";
import "./style/Header.css";
import { RowsIcon, X } from "@phosphor-icons/react";
import type { Chapter } from "../utils/chapters";
import { FontSettings } from "./FontSettings";

type HeaderProps = {
  chapters: Chapter[];
  currentChapterId: number;
  onSelectChapter: (id: number) => void;
};

export function Header({ chapters, currentChapterId, onSelectChapter }: HeaderProps) {
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
        <div className="spacer"></div>
        <h1 className="logoName">Fallen King</h1>
        <nav className="Navbar">
          <div 
            className="burger" 
            onClick={() => setIsNavOpen(true)}
          >
            <RowsIcon size={32} color="var(--avory)" />
          </div>
          <div className="settings">
            <FontSettings />
          </div>
        </nav>
      </header>

      {/*背景overlay */}
      {isNavOpen && (
        <div 
          className="navOverlay" 
          onClick={() => setIsNavOpen(false)}
        />
      )}

      {/* Бокова панель */}
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
                  {chapter.title}
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