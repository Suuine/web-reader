import { useState, useRef, useEffect } from "react";
import { User, CheckCircle } from "@phosphor-icons/react";
import "./style/AccountMenu.css";

type AccountMenuProps = {
  currentUser: string;
  onLogin: (username: string) => void;
  readChaptersCount: number;
  totalChaptersCount: number;
};

export function AccountMenu({ currentUser, onLogin, readChaptersCount, totalChaptersCount }: AccountMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [usernameInput, setUsernameInput] = useState(currentUser);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setUsernameInput(currentUser);
  }, [currentUser]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleSave(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = usernameInput.trim();
    if (trimmed) {
      onLogin(trimmed);
      setIsOpen(false);
    }
  }

  return (
    <div className="AccountMenu" ref={menuRef}>
      <button 
        className={`account-trigger ${currentUser ? "active-user" : ""}`}
        onClick={() => setIsOpen(!isOpen)}
        title="Мій акаунт"
      >
        <User size={24} />
        {currentUser && <span className="username-badge">{currentUser}</span>}
      </button>

      {isOpen && (
        <div className="account-dropdown">
          <h3>Профіль читача</h3>
          
          <form onSubmit={handleSave} className="username-form">
            <label htmlFor="username-input">Ім'я користувача:</label>
            <div className="input-group">
              <input
                id="username-input"
                type="text"
                value={usernameInput}
                onChange={(e) => setUsernameInput(e.target.value)}
                placeholder="Введіть ім'я..."
                maxLength={20}
              />
              <button type="submit" className="save-user-btn">Увійти</button>
            </div>
          </form>

          <div className="user-stats">
            <div className="stat-item">
              <CheckCircle size={20} color="var(--accent-color)" weight="fill" />
              <span>Прочитано: <strong>{readChaptersCount} з {totalChaptersCount}</strong> глав</span>
            </div>
            {totalChaptersCount > 0 && (
              <div className="progress-bar-container">
                <div 
                  className="progress-bar-fill" 
                  style={{ width: `${(readChaptersCount / totalChaptersCount) * 100}%` }}
                />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
