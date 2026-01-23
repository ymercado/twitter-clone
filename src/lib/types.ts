// Branded types to prevent ID mixing
declare const __brand: unique symbol;
type Brand<T, B> = T & { readonly [__brand]: B };

export type UserId = Brand<string, "UserId">;
export type TweetId = Brand<string, "TweetId">;

// Helper to create branded IDs
export const createUserId = (id: string): UserId => id as UserId;
export const createTweetId = (id: string): TweetId => id as TweetId;

export type VerificationType = "none" | "blue" | "gold" | "gray";

export interface User {
  id: UserId;
  name: string;
  handle: string;
  avatar: string;
  banner?: string;
  bio?: string;
  location?: string;
  website?: string;
  joinedAt: string;
  followersCount: number;
  followingCount: number;
  verification: VerificationType;
  isFollowing: boolean;
}

export interface Tweet {
  id: TweetId;
  authorId: UserId;
  content: string;
  createdAt: string;
  images?: string[];
  replyToId?: TweetId;
  quotedTweetId?: TweetId;
  stats: {
    replies: number;
    reposts: number;
    likes: number;
    views: number;
  };
  isLiked: boolean;
  isReposted: boolean;
  isBookmarked: boolean;
}

export interface TrendingTopic {
  id: string;
  category: string;
  name: string;
  postsCount: number;
}

// Notification types with discriminated union
export type Notification =
  | { type: "like"; userId: UserId; tweetId: TweetId; createdAt: string }
  | { type: "repost"; userId: UserId; tweetId: TweetId; createdAt: string }
  | { type: "follow"; userId: UserId; createdAt: string }
  | { type: "reply"; userId: UserId; tweetId: TweetId; replyId: TweetId; createdAt: string };
