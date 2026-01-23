"use client";

import { Search } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { trendingTopics } from "@/lib/data";
import { formatCount } from "@/lib/data";
import { useUserActions, useUsers } from "@/lib/store";
import Link from "next/link";

export function RightSidebar() {
  const users = useUsers();
  const { followUser } = useUserActions();

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
                  onClick={() => followUser(user.id)}
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
