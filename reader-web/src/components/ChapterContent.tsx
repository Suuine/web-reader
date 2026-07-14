import { useEffect, useRef } from "react";
import { FontSettings } from "./FontSettings";
import "./style/ChapterContent.css";

type ChapterContentProps = {
  id: number;
  title: string;
  content: string;
  wordCount: number;
};

export function ChapterContent({ id, title, content, wordCount }: ChapterContentProps) {
  const rawParagraphs = content.split("\n\n");
  const paragraphs = rawParagraphs.map((para) => para.trim());
  const isRestoring = useRef(false);

  // Restore scroll position when ID or content changes
  useEffect(() => {
    const savedScroll = localStorage.getItem(`reader_scroll_${id}`);
    const targetScroll = savedScroll ? parseInt(savedScroll, 10) : 0;
    
    isRestoring.current = true;
    window.scrollTo(0, targetScroll);
    
    const timer = setTimeout(() => {
      isRestoring.current = false;
    }, 150);
    
    return () => clearTimeout(timer);
  }, [id, content]);

  // Save scroll position on user scroll
  useEffect(() => {
    let timeoutId: number;
    
    function handleScroll() {
      if (isRestoring.current) return;
      
      clearTimeout(timeoutId);
      timeoutId = window.setTimeout(() => {
        localStorage.setItem(`reader_scroll_${id}`, window.scrollY.toString());
      }, 100);
    }
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timeoutId);
    };
  }, [id]);

  return (
    <div className="ChapterContent">
      <FontSettings />
      <h2 className="chapter-title">
        {title}
        <span className="chapter-word-count-badge">{wordCount} слів</span>
      </h2>
      <div className="chapter-content">
        {paragraphs.map((para, i) => {
          if (para === "") {
            return <div key={i} className="chapter-spacer" />;
          }
          return (
            <p
              key={i}
              className="chapter-paragraph"
              dangerouslySetInnerHTML={{ __html: para }}
            />
          );
        })}
      </div>
      <div className="chapter-footer">
        <br />
      </div>
    </div>
  );
}