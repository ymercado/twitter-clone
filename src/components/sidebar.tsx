"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Search, Bell, Mail, User, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useCurrentUser } from "@/lib/store";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/home", icon: Home, label: "Home" },
  { href: "/explore", icon: Search, label: "Explore" },
  { href: "/notifications", icon: Bell, label: "Notifications" },
  { href: "/messages", icon: Mail, label: "Messages" },
];

export function Sidebar() {
  const pathname = usePathname();
  const currentUser = useCurrentUser();

  return (
    <div className="flex flex-col h-full py-2 px-2 xl:px-3">
      {/* X Logo */}
      <Link
        href="/home"
        className="flex items-center justify-center xl:justify-start p-3 rounded-full hover-surface w-fit"
        aria-label="Home"
      >
        <svg viewBox="0 0 24 24" className="w-7 h-7 fill-current">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      </Link>

      {/* Navigation */}
      <nav className="flex-1 mt-2">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center justify-center xl:justify-start gap-4 p-3 rounded-full hover-surface transition-colors w-fit",
                    isActive && "font-bold"
                  )}
                >
                  <Icon
                    className="w-7 h-7"
                    strokeWidth={isActive ? 2.5 : 2}
                  />
                  <span className="hidden xl:inline text-xl">{item.label}</span>
                </Link>
              </li>
            );
          })}

          {/* Profile link */}
          {currentUser && (
            <li>
              <Link
                href={`/${currentUser.handle}`}
                className={cn(
                  "flex items-center justify-center xl:justify-start gap-4 p-3 rounded-full hover-surface transition-colors w-fit",
                  pathname === `/${currentUser.handle}` && "font-bold"
                )}
              >
                <User
                  className="w-7 h-7"
                  strokeWidth={pathname === `/${currentUser.handle}` ? 2.5 : 2}
                />
                <span className="hidden xl:inline text-xl">Profile</span>
              </Link>
            </li>
          )}

          {/* More */}
          <li>
            <button className="flex items-center justify-center xl:justify-start gap-4 p-3 rounded-full hover-surface transition-colors w-fit">
              <MoreHorizontal className="w-7 h-7" />
              <span className="hidden xl:inline text-xl">More</span>
            </button>
          </li>
        </ul>
      </nav>

      {/* Post Button */}
      <Button
        className="mt-4 w-12 h-12 xl:w-full xl:h-[52px] rounded-full bg-accent hover:bg-accent-hover text-white font-bold text-lg"
        aria-label="Post"
      >
        {/* Feather icon for mobile */}
        <svg
          viewBox="0 0 24 24"
          className="w-6 h-6 fill-current xl:hidden"
        >
          <path d="M23 3c-6.62-.1-10.38 2.421-13.05 6.03C7.29 12.61 6 17.331 6 22h2c0-1.007.07-2.012.19-3H12c4.1 0 7.48-3.082 7.94-7.054C22.79 10.147 23.17 6.359 23 3zm-7 8h-1.5v2H16c.63-.016 1.2-.08 1.72-.188C16.95 15.24 14.68 17 12 17H8.55c.57-2.512 1.57-4.851 3-6.78 2.16-2.912 5.29-4.911 9.45-5.187C20.95 8.079 19.9 11 16 11zM4 9V6H1V4h3V1h2v3h3v2H6v3H4z" />
        </svg>
        <span className="hidden xl:inline">Post</span>
      </Button>

      {/* User Account Switcher */}
      {currentUser && (
        <button className="mt-auto flex items-center gap-3 p-3 rounded-full hover-surface w-full">
          <Avatar className="w-10 h-10">
            <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
            <AvatarFallback>{currentUser.name[0]}</AvatarFallback>
          </Avatar>
          <div className="hidden xl:flex flex-col items-start flex-1 min-w-0">
            <span className="font-bold text-sm truncate w-full text-left">
              {currentUser.name}
            </span>
            <span className="text-text-secondary text-sm truncate w-full text-left">
              @{currentUser.handle}
            </span>
          </div>
          <MoreHorizontal className="hidden xl:block w-5 h-5 text-text-secondary" />
        </button>
      )}
    </div>
  );
}
