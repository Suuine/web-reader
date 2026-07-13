import { ArrowUp, ArrowDown } from "@phosphor-icons/react";
import "./style/ScrollButtons.css";

export function ScrollButtons() {
  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  function scrollToBottom() {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  }

  return (
    <div className="scrollButtonsContainer">
      <button 
        className="scrollBtn scrollBtnTop" 
        onClick={scrollToTop} 
        aria-label="Вгору"
        title="На початок сторінки"
      >
        <ArrowUp size={20} weight="bold" />
      </button>
      <button 
        className="scrollBtn scrollBtnBottom" 
        onClick={scrollToBottom} 
        aria-label="Вниз"
        title="На кінець сторінки"
      >
        <ArrowDown size={20} weight="bold" />
      </button>
    </div>
  );
}
