"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Compose } from "@/components/compose";
import { Tweet } from "@/components/tweet";
import { useTweets } from "@/lib/store";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

type FeedType = "for-you" | "following";

export default function HomePage() {
  const [feedType, setFeedType] = useState<FeedType>("for-you");
  const tweets = useTweets();

  return (
    <div className="min-h-screen">
      {/* Sticky Header */}
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-md border-b border-border">
        <Tabs
          value={feedType}
          onValueChange={(v) => setFeedType(v as FeedType)}
          className="w-full"
        >
          <TabsList className="w-full h-[53px] bg-transparent rounded-none p-0 gap-0">
            <TabsTrigger
              value="for-you"
              className="flex-1 h-full rounded-none font-bold text-base data-[state=active]:font-bold data-[state=inactive]:text-text-secondary data-[state=inactive]:font-normal hover:bg-white/5 transition-colors relative bg-transparent data-[state=active]:bg-transparent data-[state=active]:shadow-none"
            >
              For you
              {feedType === "for-you" && (
                <motion.div
                  layoutId="tab-indicator"
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 w-14 h-1 bg-accent rounded-full"
                />
              )}
            </TabsTrigger>
            <TabsTrigger
              value="following"
              className="flex-1 h-full rounded-none font-bold text-base data-[state=active]:font-bold data-[state=inactive]:text-text-secondary data-[state=inactive]:font-normal hover:bg-white/5 transition-colors relative bg-transparent data-[state=active]:bg-transparent data-[state=active]:shadow-none"
            >
              Following
              {feedType === "following" && (
                <motion.div
                  layoutId="tab-indicator"
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 w-14 h-1 bg-accent rounded-full"
                />
              )}
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </header>

      {/* Compose */}
      <Compose />

      {/* Feed */}
      <div>
        <AnimatePresence mode="popLayout">
          {tweets.map((tweet, index) => (
            <motion.div
              key={tweet.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{
                duration: 0.2,
                delay: index < 5 ? index * 0.05 : 0,
              }}
            >
              <Tweet tweet={tweet} />
            </motion.div>
          ))}
        </AnimatePresence>

        {tweets.length === 0 && (
          <div className="py-20 text-center">
            <h2 className="text-3xl font-bold mb-2">Welcome to X Clone!</h2>
            <p className="text-text-secondary">
              This is the best place to see what&apos;s happening in your world.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
