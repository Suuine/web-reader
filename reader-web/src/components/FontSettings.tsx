import { useState, useEffect } from "react";
import "./style/FontSettings.css";
import { GearIcon, X } from "@phosphor-icons/react";

export function FontSettings() {
  const [fontSize, setFontSize] = useState<number>(() => {
    const saved = localStorage.getItem("reader-font-size");
    return saved ? Number(saved) : 19;
  });
  const [lineHeight, setLineHeight] = useState<number>(() => {
    const saved = localStorage.getItem("reader-line-height");
    return saved ? Number(saved) : 1.8;
  });
  const [fontFamily, setFontFamily] = useState<string>(() => {
    return localStorage.getItem("reader-font-family") || "EB Garamond";
  });
  const [theme, setTheme] = useState<string>(() => {
    return localStorage.getItem("reader-theme") || "light";
  });
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const possibleFontFamilies = [
    "EB Garamond",
    "Lora",
    "Merriweather",
    "Inter",
    "Arial",
    "Times New Roman",
  ];
  const possibleThemes = ["light", "dark", "sepia"];

  useEffect(() => {
    document.documentElement.style.setProperty("--font-size", `${fontSize}px`);
    document.documentElement.style.setProperty("--line-height", lineHeight.toString());
    document.documentElement.style.setProperty("--font-family", fontFamily);
    document.documentElement.setAttribute("data-theme", theme);

    localStorage.setItem("reader-font-size", fontSize.toString());
    localStorage.setItem("reader-line-height", lineHeight.toString());
    localStorage.setItem("reader-font-family", fontFamily);
    localStorage.setItem("reader-theme", theme);
  }, [fontSize, lineHeight, fontFamily, theme]);

  return (
    <div className="FontSettings">
      <button 
        className={`settingsToggleBtn ${isSettingsOpen ? "active" : ""}`} 
        onClick={() => setIsSettingsOpen(!isSettingsOpen)}
        aria-label="Налаштування шрифту"
      >
        <GearIcon size={28} weight="regular" />
      </button>

      {isSettingsOpen && (
        <div className="settingsPanel">
          <div className="settingsHeader">
            <h3>Налаштування</h3>
            <button 
              className="closeSettingsBtn" 
              onClick={() => setIsSettingsOpen(false)}
              aria-label="Закрити"
            >
              <X size={18} weight="bold" />
            </button>
          </div>

          <div className="settingsBody">
            <div className="settingGroup">
              <div className="settingLabelRow">
                <label htmlFor="font-size">Розмір шрифту</label>
                <span className="valueBadge">{fontSize}px</span>
              </div>
              <input
                id="font-size"
                type="range"
                min="12"
                max="24"
                value={fontSize}
                onChange={(e) => setFontSize(Number(e.target.value))}
              />
            </div>

            <div className="settingGroup">
              <div className="settingLabelRow">
                <label htmlFor="line-height">Висота рядка</label>
                <span className="valueBadge">{lineHeight}x</span>
              </div>
              <input
                id="line-height"
                type="range"
                min="1.2"
                max="2.5"
                step="0.1"
                value={lineHeight}
                onChange={(e) => setLineHeight(Number(e.target.value))}
              />
            </div>

            <div className="settingGroup">
              <div className="settingLabelRow">
                <label htmlFor="font-family">Шрифт</label>
              </div>
              <div className="selectWrapper">
                <select
                  id="font-family"
                  value={fontFamily}
                  onChange={(e) => setFontFamily(e.target.value)}
                >
                  {possibleFontFamilies.map((family) => (
                    <option key={family} value={family}>
                      {family}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="settingGroup">
              <div className="settingLabelRow">
                <label>Тема оформлення</label>
              </div>
              <div className="themeButtons">
                {possibleThemes.map((t) => (
                  <button
                    key={t}
                    className={`themeBtnOption ${t} ${theme === t ? "active" : ""}`}
                    onClick={() => setTheme(t)}
                    title={t === "light" ? "Світла" : t === "dark" ? "Темна" : "Сепія"}
                  >
                    <span className="themeColorDot" />
                    <span className="themeLabel">
                      {t === "light" ? "Світла" : t === "dark" ? "Темна" : "Сепія"}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}