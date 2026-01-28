"use client";

import { useState, useCallback, KeyboardEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageCircle,
  Repeat2,
  Heart,
  Share,
  MoreHorizontal,
  Bookmark,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { VerificationBadge } from "@/components/ui/verification-badge";
import { useUserById, getStoreActions } from "@/lib/store";
import { formatRelativeTime, formatCount } from "@/lib/data";
import type { Tweet as TweetType } from "@/lib/types";
import { cn } from "@/lib/utils";

interface TweetProps {
  tweet: TweetType;
}

export function Tweet({ tweet }: TweetProps) {
  const router = useRouter();
  const author = useUserById(tweet.authorId);
  const [showLikeAnimation, setShowLikeAnimation] = useState(false);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLElement>) => {
      // Only navigate if Enter/Space and not from a nested interactive element
      if (
        (e.key === "Enter" || e.key === " ") &&
        e.target === e.currentTarget
      ) {
        e.preventDefault();
        if (author) {
          router.push(`/${author.handle}/status/${tweet.id}`);
        }
      }
    },
    [author, router, tweet.id]
  );

  if (!author) return null;

  const handleLike = () => {
    const { likeTweet, unlikeTweet } = getStoreActions();
    if (tweet.isLiked) {
      unlikeTweet(tweet.id);
    } else {
      likeTweet(tweet.id);
      setShowLikeAnimation(true);
      setTimeout(() => setShowLikeAnimation(false), 500);
    }
  };

  const handleRepost = () => {
    const { repostTweet, unrepostTweet } = getStoreActions();
    if (tweet.isReposted) {
      unrepostTweet(tweet.id);
    } else {
      repostTweet(tweet.id);
    }
  };

  return (
    <article
      tabIndex={0}
      role="article"
      onKeyDown={handleKeyDown}
      aria-label={`Tweet by ${author.name}: ${tweet.content.slice(0, 100)}${tweet.content.length > 100 ? "..." : ""}`}
      className="px-4 py-3 border-b border-border hover-surface transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-inset"
    >
      <div className="flex gap-3">
        {/* Avatar */}
        <Link href={`/${author.handle}`} className="flex-shrink-0">
          <Avatar className="w-10 h-10">
            <AvatarImage src={author.avatar} alt={author.name} />
            <AvatarFallback>{author.name[0]}</AvatarFallback>
          </Avatar>
        </Link>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Header */}
          <div className="flex items-center gap-1 text-sm">
            <Link
              href={`/${author.handle}`}
              className="font-bold text-text-primary hover:underline truncate"
            >
              {author.name}
            </Link>
            {author.verification !== "none" && (
              <VerificationBadge type={author.verification} />
            )}
            <Link
              href={`/${author.handle}`}
              className="text-text-secondary truncate"
            >
              @{author.handle}
            </Link>
            <span className="text-text-secondary">·</span>
            <time className="text-text-secondary hover:underline whitespace-nowrap">
              {formatRelativeTime(tweet.createdAt)}
            </time>
            <button
              className="ml-auto p-2 -m-2 rounded-full action-reply text-text-secondary"
              aria-label="More options"
            >
              <MoreHorizontal className="w-5 h-5" />
            </button>
          </div>

          {/* Tweet Text */}
          <div className="mt-1 text-text-primary whitespace-pre-wrap break-words">
            {tweet.content}
          </div>

          {/* Images */}
          {tweet.images && tweet.images.length > 0 && (
            <div className="mt-3 rounded-2xl overflow-hidden border border-border">
              {tweet.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt=""
                  className="w-full max-h-[510px] object-cover"
                  loading="lazy"
                />
              ))}
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center justify-between mt-3 max-w-md -ml-2">
            {/* Reply */}
            <button
              className="flex items-center gap-1 group"
              aria-label={`Reply, ${tweet.stats.replies} replies`}
            >
              <div className="p-2 rounded-full action-reply text-text-secondary group-hover:text-accent transition-colors">
                <MessageCircle className="w-5 h-5" />
              </div>
              <span className="text-sm text-text-secondary group-hover:text-accent transition-colors">
                {tweet.stats.replies > 0 && formatCount(tweet.stats.replies)}
              </span>
            </button>

            {/* Repost */}
            <button
              className="flex items-center gap-1 group"
              onClick={handleRepost}
              aria-label={`Repost, ${tweet.stats.reposts} reposts`}
              aria-pressed={tweet.isReposted}
            >
              <motion.div
                className={cn(
                  "p-2 rounded-full action-repost transition-colors",
                  tweet.isReposted ? "text-repost" : "text-text-secondary"
                )}
                whileTap={{ scale: 0.9 }}
              >
                <Repeat2 className="w-5 h-5" />
              </motion.div>
              <span
                className={cn(
                  "text-sm transition-colors",
                  tweet.isReposted
                    ? "text-repost"
                    : "text-text-secondary group-hover:text-repost"
                )}
              >
                {tweet.stats.reposts > 0 && formatCount(tweet.stats.reposts)}
              </span>
            </button>

            {/* Like */}
            <button
              className="flex items-center gap-1 group relative"
              onClick={handleLike}
              aria-label={`Like, ${tweet.stats.likes} likes`}
              aria-pressed={tweet.isLiked}
            >
              <motion.div
                className={cn(
                  "p-2 rounded-full action-like transition-colors",
                  tweet.isLiked ? "text-like" : "text-text-secondary"
                )}
                whileTap={{ scale: 0.9 }}
                animate={showLikeAnimation ? { scale: [1, 1.3, 1] } : {}}
                transition={{ duration: 0.3 }}
              >
                <Heart
                  className="w-5 h-5"
                  fill={tweet.isLiked ? "currentColor" : "none"}
                />
              </motion.div>
              <AnimatePresence>
                {showLikeAnimation && (
                  <motion.div
                    initial={{ scale: 0, opacity: 1 }}
                    animate={{ scale: 2, opacity: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="absolute left-2 top-2 pointer-events-none"
                  >
                    <Heart className="w-5 h-5 text-like fill-current" />
                  </motion.div>
                )}
              </AnimatePresence>
              <span
                className={cn(
                  "text-sm transition-colors",
                  tweet.isLiked
                    ? "text-like"
                    : "text-text-secondary group-hover:text-like"
                )}
              >
                {tweet.stats.likes > 0 && formatCount(tweet.stats.likes)}
              </span>
            </button>

            {/* Views */}
            <button
              className="flex items-center gap-1 group"
              aria-label={`${tweet.stats.views} views`}
            >
              <div className="p-2 rounded-full action-reply text-text-secondary transition-colors">
                <svg
                  viewBox="0 0 24 24"
                  className="w-5 h-5"
                  fill="currentColor"
                >
                  <path d="M8.75 21V3h2v18h-2zM18 21V8.5h2V21h-2zM4 21l.004-10h2L6 21H4zm9.248 0v-7h2v7h-2z" />
                </svg>
              </div>
              <span className="text-sm text-text-secondary group-hover:text-accent transition-colors">
                {formatCount(tweet.stats.views)}
              </span>
            </button>

            {/* Share/Bookmark */}
            <div className="flex items-center gap-0">
              <button
                className="p-2 rounded-full action-reply text-text-secondary transition-colors"
                aria-label="Bookmark"
              >
                <Bookmark className="w-5 h-5" />
              </button>
              <button
                className="p-2 rounded-full action-reply text-text-secondary transition-colors"
                aria-label="Share"
              >
                <Share className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
