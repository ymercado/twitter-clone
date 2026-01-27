"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { ImageIcon, Smile, MapPin, CalendarDays } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useCurrentUser, getStoreActions } from "@/lib/store";
import { cn } from "@/lib/utils";

const MAX_CHARS = 280;

interface ComposeProps {
  placeholder?: string;
  onPostSuccess?: () => void;
  className?: string;
}

export function Compose({
  placeholder = "What is happening?!",
  onPostSuccess,
  className,
}: ComposeProps) {
  const [content, setContent] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const currentUser = useCurrentUser();

  const charsRemaining = MAX_CHARS - content.length;
  const isOverLimit = charsRemaining < 0;
  const canPost = content.trim().length > 0 && !isOverLimit;

  const handleSubmit = () => {
    if (!canPost || !currentUser) return;

    const { addTweet } = getStoreActions();
    addTweet(content.trim(), currentUser.id);
    setContent("");
    setIsFocused(false);
    onPostSuccess?.();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && (e.metaKey || e.ctrlKey) && canPost) {
      e.preventDefault();
      handleSubmit();
    }
  };

  // Auto-resize textarea
  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  if (!currentUser) return null;

  return (
    <div className={cn("px-4 py-3 border-b border-border", className)}>
      <div className="flex gap-3">
        {/* Avatar */}
        <Avatar className="w-10 h-10 flex-shrink-0">
          <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
          <AvatarFallback>{currentUser.name[0]}</AvatarFallback>
        </Avatar>

        {/* Input Area */}
        <div className="flex-1 min-w-0">
          {/* Audience Selector (shown when focused) */}
          {isFocused && (
            <motion.button
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-1 px-3 py-0.5 mb-3 text-sm font-bold text-accent border border-accent rounded-full hover:bg-accent/10 transition-colors"
            >
              Everyone
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                <path d="M3.543 8.96l1.414-1.42L12 14.59l7.043-7.05 1.414 1.42L12 17.41 3.543 8.96z" />
              </svg>
            </motion.button>
          )}

          {/* Textarea */}
          <textarea
            ref={textareaRef}
            value={content}
            onChange={handleInput}
            onKeyDown={handleKeyDown}
            onFocus={() => setIsFocused(true)}
            placeholder={placeholder}
            className="w-full bg-transparent text-xl text-text-primary placeholder:text-text-secondary outline-none resize-none min-h-[56px] max-h-[300px]"
            rows={1}
          />

          {/* Reply settings (shown when focused) */}
          {isFocused && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-2 text-sm font-bold text-accent hover:bg-accent/10 rounded-full px-3 py-1.5 -ml-3 mb-3"
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                <path d="M12 1.75C6.34 1.75 1.75 6.34 1.75 12S6.34 22.25 12 22.25 22.25 17.66 22.25 12 17.66 1.75 12 1.75zm-.25 10.48L10.5 17.5l-2-1.5v-3.5L7.5 9 6.25 5.5h11.5L16.5 9l-1 3.5v3.5l-2 1.5-1.25-5.27z" />
              </svg>
              Everyone can reply
            </motion.button>
          )}

          {/* Divider */}
          {isFocused && <div className="h-px bg-border mb-3" />}

          {/* Actions */}
          <div className="flex items-center justify-between">
            {/* Media Buttons */}
            <div className="flex items-center -ml-2">
              <button
                className="p-2 rounded-full text-accent hover:bg-accent/10 transition-colors"
                aria-label="Add image"
              >
                <ImageIcon className="w-5 h-5" />
              </button>
              <button
                className="p-2 rounded-full text-accent hover:bg-accent/10 transition-colors"
                aria-label="Add GIF"
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                  <path d="M19 10.5V8.8h-4.4v6.4h1.7v-2h2v-1.7h-2v-1H19zm-7.3-1.7h1.7v6.4h-1.7V8.8zm-3.6 1.6c.4 0 .9.2 1.2.5l1.2-1C9.9 9.2 9 8.8 8.1 8.8c-1.8 0-3.2 1.4-3.2 3.2s1.4 3.2 3.2 3.2c1 0 1.8-.4 2.4-1.1v-2.5H7.7v1.2h1.2v.6c-.2.1-.5.2-.8.2-.9 0-1.6-.7-1.6-1.6 0-.8.7-1.6 1.6-1.6z" />
                </svg>
              </button>
              <button
                className="p-2 rounded-full text-accent hover:bg-accent/10 transition-colors"
                aria-label="Add poll"
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                  <path d="M6 5c-1.1 0-2 .895-2 2v10c0 1.105.9 2 2 2h12c1.1 0 2-.895 2-2V7c0-1.105-.9-2-2-2H6zm1.998 2h6v2h-6V7zm0 4h10v2h-10v-2zm0 4h4v2h-4v-2z" />
                </svg>
              </button>
              <button
                className="p-2 rounded-full text-accent hover:bg-accent/10 transition-colors"
                aria-label="Add emoji"
              >
                <Smile className="w-5 h-5" />
              </button>
              <button
                className="p-2 rounded-full text-accent hover:bg-accent/10 transition-colors"
                aria-label="Schedule"
              >
                <CalendarDays className="w-5 h-5" />
              </button>
              <button
                className="p-2 rounded-full text-accent hover:bg-accent/10 transition-colors"
                aria-label="Add location"
              >
                <MapPin className="w-5 h-5" />
              </button>
            </div>

            {/* Character Count & Post Button */}
            <div className="flex items-center gap-3">
              {content.length > 0 && (
                <div className="flex items-center gap-2">
                  {/* Character counter circle */}
                  <div className="relative w-5 h-5">
                    <svg className="w-5 h-5 -rotate-90">
                      <circle
                        cx="10"
                        cy="10"
                        r="9"
                        fill="none"
                        stroke="#2F3336"
                        strokeWidth="2"
                      />
                      <circle
                        cx="10"
                        cy="10"
                        r="9"
                        fill="none"
                        stroke={
                          isOverLimit
                            ? "#F4212E"
                            : charsRemaining <= 20
                            ? "#FFD400"
                            : "#1D9BF0"
                        }
                        strokeWidth="2"
                        strokeDasharray={`${Math.max(0, (1 - content.length / MAX_CHARS)) * 56.5} 56.5`}
                      />
                    </svg>
                  </div>
                  {charsRemaining <= 20 && (
                    <span
                      className={cn(
                        "text-sm",
                        isOverLimit ? "text-destructive" : "text-text-secondary"
                      )}
                    >
                      {charsRemaining}
                    </span>
                  )}
                  <div className="w-px h-8 bg-border" />
                </div>
              )}

              <Button
                onClick={handleSubmit}
                disabled={!canPost}
                className="rounded-full bg-accent hover:bg-accent-hover text-white font-bold px-4 h-9 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Post
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
