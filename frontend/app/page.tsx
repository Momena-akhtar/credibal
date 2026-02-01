"use client";

import { useState, useEffect } from "react";
import { Search } from "lucide-react";

export default function Home() {
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isFocused, setIsFocused] = useState(false);

  const words = ["transparent", "reliable", "credible"];

  useEffect(() => {
    const word = words[currentWordIndex];
    let timeout: NodeJS.Timeout;

    if (isTyping) {
      if (displayedText.length < word.length) {
        timeout = setTimeout(() => {
          setDisplayedText(word.slice(0, displayedText.length + 1));
        }, 100);
      } else {
        timeout = setTimeout(() => {
          if (currentWordIndex < words.length - 1) {
            setIsTyping(false);
          }
        }, 1500);
      }
    } else {
      if (displayedText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayedText(displayedText.slice(0, -1));
        }, 50);
      } else {
        setCurrentWordIndex((prev) => prev + 1);
        setIsTyping(true);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayedText, isTyping, currentWordIndex]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="w-full max-w-2xl flex flex-col items-center gap-12">
        {/* Typing Animation */}
        <div className="text-center">
          <h1 className="text-5xl font-bold mb-2">
            Because it's <span className="bg-primary text-foreground rounded-full px-2">{displayedText}</span>
            <span className="animate-pulse">|</span>
          </h1>
        </div>

        {/* Search Bar */}
        <div className="w-full flex gap-2 justify-center">
          <div
            className={`transition-all duration-300 ease-out border-3 border-primary rounded-full px-6 py-3 flex items-center ${
              isFocused ? "w-full" : "w-120"
            }`}
          >
            <input
              type="text"
              placeholder="What do you want to search?"
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              className="bg-transparent outline-none text-foreground placeholder-foreground/50 w-full"
            />
          </div>
          <button className="bg-primary text-foreground rounded-full cursor-pointer p-3 hover:opacity-90 transition-opacity flex items-center justify-center">
            <Search size={24} />
          </button>
        </div>
      </div>
    </main>
  );
}