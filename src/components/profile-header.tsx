"use client";

import { ArrowLeft, CalendarDays, Link as LinkIcon, MapPin } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { VerificationBadge } from "@/components/ui/verification-badge";
import { useCurrentUserId, getStoreActions } from "@/lib/store";
import { formatCount } from "@/lib/data";
import type { User } from "@/lib/types";
import { cn, isValidUrl } from "@/lib/utils";

interface ProfileHeaderProps {
  user: User;
  tweetsCount: number;
}

export function ProfileHeader({ user, tweetsCount }: ProfileHeaderProps) {
  const router = useRouter();
  const currentUserId = useCurrentUserId();

  const isOwnProfile = currentUserId === user.id;
  const joinedDate = new Date(user.joinedAt).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  const handleFollowToggle = () => {
    const { followUser, unfollowUser } = getStoreActions();
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
          {user.website && isValidUrl(user.website) && (
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
