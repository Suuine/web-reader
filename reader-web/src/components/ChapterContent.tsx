import { FontSettings } from "./FontSettings";
import "./style/ChapterContent.css";

type ChapterContentProps = {
  title: string;
  content: string;
  wordCount: number;
};

export function ChapterContent({ title, content, wordCount }: ChapterContentProps) {
  const rawParagraphs = content.split("\n\n");
  
  const paragraphs = rawParagraphs.map((para) => para.trim());

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