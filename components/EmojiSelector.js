import React from "react";

const EmojiSelector = ({ emojis, onSelect }) => {
  return (
    <div className="grid grid-cols-3 gap-0 mt-5">
      {emojis.map((emoji, index) => (
        <button
          key={emoji}
          onClick={() => onSelect(emoji)}
          className={`p-4 text-2xl border border-slate-700 transition  duration-300 hover:bg-blue-100 hover:scale-110 ${
            index === 0 ? "rounded-tl-lg" : ""
          } ${index === 2 ? "rounded-tr-lg" : ""} ${
            index === emojis.length - 3 ? "rounded-bl-lg" : ""
          } ${index === emojis.length - 1 ? "rounded-br-lg" : ""}`}
        >
          {emoji}
        </button>
      ))}
    </div>
  );
};

export default EmojiSelector;
