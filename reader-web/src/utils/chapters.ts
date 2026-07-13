export type Chapter = {
  id: number;
  title: string;
  content: string;
  wordCount: number;
};

// Сканує .txt для контенту (raw text)
const chapterTextModules = import.meta.glob<string>(
  "../.data/*.txt",
  { query: "?raw", import: "default", eager: true }
);

export function getAllChapters(): Chapter[] {
  console.log("📄 chapterTextModules keys:", Object.keys(chapterTextModules));
  
  const chapters = Object.entries(chapterTextModules).map(([path, rawContent]) => {
    // Отримуємо назву та ID файлу з його імені (наприклад, ../.data/chapter-1.txt)
    const match = path.match(/chapter-(\d+)\.txt$/);
    const id = match ? parseInt(match[1], 10) : 0;
    const title = `Глава ${id}`;
    
    // Розбиваємо текст на абзаци за переносом рядка
    const lines = rawContent.split(/\r?\n/).map((line) => line.trim());

    // Видаляємо початкові та кінцеві порожні рядки
    let start = 0;
    while (start < lines.length && lines[start] === "") {
      start++;
    }
    let end = lines.length - 1;
    while (end >= start && lines[end] === "") {
      end--;
    }
    const trimmedLines = lines.slice(start, end + 1);

    // Усуваємо кілька послідовних пустих рядків (залишаємо максимум один)
    const collapsedLines: string[] = [];
    for (const line of trimmedLines) {
      if (line === "") {
        if (collapsedLines.length > 0 && collapsedLines[collapsedLines.length - 1] !== "") {
          collapsedLines.push("");
        }
      } else {
        collapsedLines.push(line);
      }
    }

    // Об'єднуємо назад в один рядок
    const content = collapsedLines.join("\n\n");

    // Рахуємо кількість слів
    const cleanText = rawContent.replace(/<[^>]*>/g, "").trim();
    const wordCount = cleanText ? cleanText.split(/\s+/).filter((w) => w.length > 0).length : 0;

    return {
      id,
      title,
      content,
      wordCount
    };
  });

  console.log("✅ Завантажені глави:", chapters);
  return chapters.sort((a, b) => a.id - b.id);
}

export function getChapter(id: number): Chapter | undefined {
  return getAllChapters().find((c) => c.id === id);
}