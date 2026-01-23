"use client";

import { useState } from "react";
import Link from "next/link";
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
import { useUserById, useTweetActions } from "@/lib/store";
import { formatRelativeTime, formatCount } from "@/lib/data";
import type { Tweet as TweetType } from "@/lib/types";
import { cn } from "@/lib/utils";

interface TweetProps {
  tweet: TweetType;
}

export function Tweet({ tweet }: TweetProps) {
  const author = useUserById(tweet.authorId);
  const { likeTweet, unlikeTweet, repostTweet, unrepostTweet } = useTweetActions();
  const [showLikeAnimation, setShowLikeAnimation] = useState(false);

  if (!author) return null;

  const handleLike = () => {
    if (tweet.isLiked) {
      unlikeTweet(tweet.id);
    } else {
      likeTweet(tweet.id);
      setShowLikeAnimation(true);
      setTimeout(() => setShowLikeAnimation(false), 500);
    }
  };

  const handleRepost = () => {
    if (tweet.isReposted) {
      unrepostTweet(tweet.id);
    } else {
      repostTweet(tweet.id);
    }
  };

  return (
    <article className="px-4 py-3 border-b border-border hover-surface transition-colors cursor-pointer">
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

function VerificationBadge({ type }: { type: "blue" | "gold" | "gray" }) {
  const colors = {
    blue: "#1D9BF0",
    gold: "#E2B719",
    gray: "#71767B",
  };

  return (
    <svg
      viewBox="0 0 22 22"
      className="w-5 h-5 flex-shrink-0"
      style={{ color: colors[type] }}
    >
      <path
        fill="currentColor"
        d="M20.396 11c-.018-.646-.215-1.275-.57-1.816-.354-.54-.852-.972-1.438-1.246.223-.607.27-1.264.14-1.897-.131-.634-.437-1.218-.882-1.687-.47-.445-1.053-.75-1.687-.882-.633-.13-1.29-.083-1.897.14-.273-.587-.704-1.086-1.245-1.44S11.647 1.62 11 1.604c-.646.017-1.273.213-1.813.568s-.969.854-1.24 1.44c-.608-.223-1.267-.272-1.902-.14-.635.13-1.22.436-1.69.882-.445.47-.749 1.055-.878 1.688-.13.633-.08 1.29.144 1.896-.587.274-1.087.705-1.443 1.245-.356.54-.555 1.17-.574 1.817.02.647.218 1.276.574 1.817.356.54.856.972 1.443 1.245-.224.606-.274 1.263-.144 1.896.13.634.433 1.218.877 1.688.47.443 1.054.747 1.687.878.633.132 1.29.084 1.897-.136.274.586.705 1.084 1.246 1.439.54.354 1.17.551 1.816.569.647-.016 1.276-.213 1.817-.567s.972-.854 1.245-1.44c.604.239 1.266.296 1.903.164.636-.132 1.22-.447 1.68-.907.46-.46.776-1.044.908-1.681s.075-1.299-.165-1.903c.586-.274 1.084-.705 1.439-1.246.354-.54.551-1.17.569-1.816zM9.662 14.85l-3.429-3.428 1.293-1.302 2.072 2.072 4.4-4.794 1.347 1.246z"
      />
    </svg>
  );
}
