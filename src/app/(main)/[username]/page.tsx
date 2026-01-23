"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ProfileHeader } from "@/components/profile-header";
import { Tweet } from "@/components/tweet";
import { useUsers, useTweets } from "@/lib/store";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

type ProfileTab = "posts" | "replies" | "media" | "likes";

export default function ProfilePage() {
  const params = useParams();
  const username = params.username as string;
  const [activeTab, setActiveTab] = useState<ProfileTab>("posts");

  const users = useUsers();
  const tweets = useTweets();

  const user = users.find((u) => u.handle === username);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-2">This account doesn&apos;t exist</h1>
          <p className="text-text-secondary">Try searching for another.</p>
        </div>
      </div>
    );
  }

  const userTweets = tweets.filter((t) => t.authorId === user.id);

  // Filter tweets based on active tab
  const filteredTweets = (() => {
    switch (activeTab) {
      case "posts":
        return userTweets.filter((t) => !t.replyToId);
      case "replies":
        return userTweets.filter((t) => t.replyToId);
      case "media":
        return userTweets.filter((t) => t.images && t.images.length > 0);
      case "likes":
        return tweets.filter((t) => t.isLiked);
      default:
        return userTweets;
    }
  })();

  return (
    <div className="min-h-screen">
      <ProfileHeader user={user} tweetsCount={userTweets.length} />

      {/* Profile Tabs */}
      <Tabs
        value={activeTab}
        onValueChange={(v) => setActiveTab(v as ProfileTab)}
        className="border-b border-border"
      >
        <TabsList className="w-full h-[53px] bg-transparent rounded-none p-0 gap-0 justify-start">
          {(["posts", "replies", "media", "likes"] as const).map((tab) => (
            <TabsTrigger
              key={tab}
              value={tab}
              className="flex-1 max-w-[150px] h-full rounded-none font-bold text-base capitalize data-[state=active]:font-bold data-[state=inactive]:text-text-secondary data-[state=inactive]:font-normal hover:bg-white/5 transition-colors relative bg-transparent data-[state=active]:bg-transparent data-[state=active]:shadow-none"
            >
              {tab}
              {activeTab === tab && (
                <motion.div
                  layoutId="profile-tab-indicator"
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 w-14 h-1 bg-accent rounded-full"
                />
              )}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      {/* Tweets */}
      <div>
        <AnimatePresence mode="popLayout">
          {filteredTweets.map((tweet, index) => (
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

        {filteredTweets.length === 0 && (
          <div className="py-20 text-center px-8">
            {activeTab === "posts" && (
              <>
                <h2 className="text-3xl font-bold mb-2">No posts yet</h2>
                <p className="text-text-secondary">
                  When @{user.handle} posts, they&apos;ll show up here.
                </p>
              </>
            )}
            {activeTab === "replies" && (
              <>
                <h2 className="text-3xl font-bold mb-2">No replies yet</h2>
                <p className="text-text-secondary">
                  When @{user.handle} replies to posts, they&apos;ll show up here.
                </p>
              </>
            )}
            {activeTab === "media" && (
              <>
                <h2 className="text-3xl font-bold mb-2">No media yet</h2>
                <p className="text-text-secondary">
                  When @{user.handle} posts photos or videos, they&apos;ll show up here.
                </p>
              </>
            )}
            {activeTab === "likes" && (
              <>
                <h2 className="text-3xl font-bold mb-2">No likes yet</h2>
                <p className="text-text-secondary">
                  When @{user.handle} likes posts, they&apos;ll show up here.
                </p>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
