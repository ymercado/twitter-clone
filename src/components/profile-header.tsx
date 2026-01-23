"use client";

import { ArrowLeft, CalendarDays, Link as LinkIcon, MapPin } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useCurrentUserId, useUserActions } from "@/lib/store";
import { formatCount } from "@/lib/data";
import type { User } from "@/lib/types";
import { cn } from "@/lib/utils";

interface ProfileHeaderProps {
  user: User;
  tweetsCount: number;
}

export function ProfileHeader({ user, tweetsCount }: ProfileHeaderProps) {
  const router = useRouter();
  const currentUserId = useCurrentUserId();
  const { followUser, unfollowUser } = useUserActions();

  const isOwnProfile = currentUserId === user.id;
  const joinedDate = new Date(user.joinedAt).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  const handleFollowToggle = () => {
    if (user.isFollowing) {
      unfollowUser(user.id);
    } else {
      followUser(user.id);
    }
  };

  return (
    <div>
      {/* Top Bar */}
      <div className="sticky top-0 z-40 bg-background/80 backdrop-blur-md px-4 h-[53px] flex items-center gap-6">
        <button
          onClick={() => router.back()}
          className="p-2 -ml-2 rounded-full hover-surface"
          aria-label="Go back"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="font-bold text-xl leading-tight">{user.name}</h1>
          <p className="text-sm text-text-secondary">
            {formatCount(tweetsCount)} posts
          </p>
        </div>
      </div>

      {/* Banner */}
      <div className="h-[200px] bg-surface">
        {user.banner ? (
          <img
            src={user.banner}
            alt=""
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-accent/30 to-accent/10" />
        )}
      </div>

      {/* Profile Info */}
      <div className="px-4 pb-4">
        {/* Avatar & Actions Row */}
        <div className="flex justify-between items-start -mt-[67px] mb-3">
          <Avatar className="w-[134px] h-[134px] border-4 border-background">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback className="text-4xl">{user.name[0]}</AvatarFallback>
          </Avatar>

          <div className="mt-[76px] flex gap-2">
            {isOwnProfile ? (
              <Button
                variant="outline"
                className="rounded-full font-bold border-border hover:bg-white/10"
              >
                Edit profile
              </Button>
            ) : (
              <>
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full border-border hover:bg-white/10 w-9 h-9"
                  aria-label="More options"
                >
                  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                    <path d="M3 12c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm9 2c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm7 0c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z" />
                  </svg>
                </Button>
                <Button
                  onClick={handleFollowToggle}
                  className={cn(
                    "rounded-full font-bold px-5",
                    user.isFollowing
                      ? "bg-transparent border border-border text-text-primary hover:border-destructive hover:text-destructive"
                      : "bg-white text-black hover:bg-white/90"
                  )}
                >
                  {user.isFollowing ? "Following" : "Follow"}
                </Button>
              </>
            )}
          </div>
        </div>

        {/* Name & Handle */}
        <div className="mb-3">
          <div className="flex items-center gap-1">
            <h2 className="font-bold text-xl">{user.name}</h2>
            {user.verification !== "none" && (
              <VerificationBadge type={user.verification} />
            )}
          </div>
          <p className="text-text-secondary">@{user.handle}</p>
        </div>

        {/* Bio */}
        {user.bio && (
          <p className="mb-3 whitespace-pre-wrap">{user.bio}</p>
        )}

        {/* Meta Info */}
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-text-secondary mb-3">
          {user.location && (
            <span className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              {user.location}
            </span>
          )}
          {user.website && (
            <a
              href={user.website}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-accent hover:underline"
            >
              <LinkIcon className="w-4 h-4" />
              {user.website.replace(/^https?:\/\//, "")}
            </a>
          )}
          <span className="flex items-center gap-1">
            <CalendarDays className="w-4 h-4" />
            Joined {joinedDate}
          </span>
        </div>

        {/* Follow Stats */}
        <div className="flex gap-4">
          <Link href={`/${user.handle}/following`} className="hover:underline">
            <span className="font-bold">{formatCount(user.followingCount)}</span>
            <span className="text-text-secondary"> Following</span>
          </Link>
          <Link href={`/${user.handle}/followers`} className="hover:underline">
            <span className="font-bold">{formatCount(user.followersCount)}</span>
            <span className="text-text-secondary"> Followers</span>
          </Link>
        </div>
      </div>
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
