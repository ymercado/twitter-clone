"use client";

import { Search } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { VerificationBadge } from "@/components/ui/verification-badge";
import { trendingTopics } from "@/lib/data";
import { formatCount } from "@/lib/data";
import { getStoreActions, useUsers } from "@/lib/store";
import Link from "next/link";

export function RightSidebar() {
  const users = useUsers();

  // Get users to suggest (not following)
  const suggestedUsers = users
    .filter((user) => !user.isFollowing)
    .slice(0, 3);

  return (
    <div className="py-3 space-y-4">
      {/* Search Bar */}
      <div className="sticky top-0 pb-3 bg-background z-10">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary" />
          <input
            type="text"
            placeholder="Search"
            className="w-full h-11 pl-12 pr-4 rounded-full bg-surface border border-transparent focus:border-accent focus:bg-background outline-none text-text-primary placeholder:text-text-secondary transition-colors"
          />
        </div>
      </div>

      {/* Trending */}
      <section className="bg-surface rounded-2xl overflow-hidden">
        <h2 className="font-bold text-xl px-4 py-3">Trends for you</h2>
        <div>
          {trendingTopics.map((topic) => (
            <Link
              key={topic.id}
              href={`/search?q=${encodeURIComponent(topic.name)}`}
              className="block px-4 py-3 hover-surface transition-colors"
            >
              <div className="text-xs text-text-secondary">{topic.category}</div>
              <div className="font-bold text-text-primary">{topic.name}</div>
              <div className="text-xs text-text-secondary">
                {formatCount(topic.postsCount)} posts
              </div>
            </Link>
          ))}
        </div>
        <Link
          href="/explore"
          className="block px-4 py-3 text-accent hover:bg-white/5 transition-colors"
        >
          Show more
        </Link>
      </section>

      {/* Who to follow */}
      {suggestedUsers.length > 0 && (
        <section className="bg-surface rounded-2xl overflow-hidden">
          <h2 className="font-bold text-xl px-4 py-3">Who to follow</h2>
          <div>
            {suggestedUsers.map((user) => (
              <div
                key={user.id}
                className="flex items-center gap-3 px-4 py-3 hover-surface transition-colors"
              >
                <Link href={`/${user.handle}`}>
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback>{user.name[0]}</AvatarFallback>
                  </Avatar>
                </Link>
                <div className="flex-1 min-w-0">
                  <Link
                    href={`/${user.handle}`}
                    className="flex items-center gap-1 hover:underline"
                  >
                    <span className="font-bold text-sm truncate">
                      {user.name}
                    </span>
                    {user.verification !== "none" && (
                      <VerificationBadge type={user.verification} />
                    )}
                  </Link>
                  <div className="text-sm text-text-secondary truncate">
                    @{user.handle}
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-full font-bold bg-white text-black hover:bg-white/90 border-0 h-8 px-4"
                  onClick={() => getStoreActions().followUser(user.id)}
                >
                  Follow
                </Button>
              </div>
            ))}
          </div>
          <Link
            href="/connect"
            className="block px-4 py-3 text-accent hover:bg-white/5 transition-colors"
          >
            Show more
          </Link>
        </section>
      )}

      {/* Footer */}
      <footer className="px-4 text-xs text-text-secondary">
        <div className="flex flex-wrap gap-x-3 gap-y-1">
          <a href="#" className="hover:underline">Terms of Service</a>
          <a href="#" className="hover:underline">Privacy Policy</a>
          <a href="#" className="hover:underline">Cookie Policy</a>
          <a href="#" className="hover:underline">Accessibility</a>
          <a href="#" className="hover:underline">Ads info</a>
          <a href="#" className="hover:underline">More</a>
        </div>
        <div className="mt-2">&copy; 2026 X Clone</div>
      </footer>
    </div>
  );
}
