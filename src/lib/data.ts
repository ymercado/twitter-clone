import type { Tweet, User, TrendingTopic, UserId } from "./types";
import { createUserId, createTweetId } from "./types";

// Mock Users
export const mockUsers: User[] = [
  {
    id: createUserId("user-1"),
    name: "You",
    handle: "yourusername",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=you",
    banner: "https://images.unsplash.com/photo-1557683316-973673baf926?w=600&h=200&fit=crop",
    bio: "Building cool things with code. TypeScript enthusiast. Coffee lover.",
    location: "San Francisco, CA",
    website: "https://example.com",
    joinedAt: "2020-03-15",
    followersCount: 1234,
    followingCount: 567,
    verification: "blue",
    isFollowing: false,
  },
  {
    id: createUserId("user-2"),
    name: "Sarah Chen",
    handle: "sarahcodes",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
    banner: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=600&h=200&fit=crop",
    bio: "Senior Engineer @BigTech | Open source contributor | Speaker",
    location: "Seattle, WA",
    joinedAt: "2019-08-22",
    followersCount: 45200,
    followingCount: 892,
    verification: "blue",
    isFollowing: true,
  },
  {
    id: createUserId("user-3"),
    name: "Alex Rivera",
    handle: "alexr",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=alex",
    bio: "Design systems at scale. Previously @Figma",
    location: "New York, NY",
    joinedAt: "2021-01-10",
    followersCount: 12800,
    followingCount: 445,
    verification: "none",
    isFollowing: false,
  },
  {
    id: createUserId("user-4"),
    name: "TechNews",
    handle: "technews",
    avatar: "https://api.dicebear.com/7.x/identicon/svg?seed=technews",
    bio: "Breaking tech news and analysis. DM for tips.",
    joinedAt: "2018-05-01",
    followersCount: 890000,
    followingCount: 234,
    verification: "gold",
    isFollowing: true,
  },
  {
    id: createUserId("user-5"),
    name: "Maya Johnson",
    handle: "mayaj",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=maya",
    bio: "Startup founder | YC W24 | Building the future of work",
    location: "Austin, TX",
    joinedAt: "2022-06-15",
    followersCount: 8900,
    followingCount: 1200,
    verification: "blue",
    isFollowing: false,
  },
];

// Mock Tweets
export const mockTweets: Tweet[] = [
  {
    id: createTweetId("tweet-1"),
    authorId: createUserId("user-2"),
    content: "Just shipped a major update to our design system! 🚀\n\nNew features:\n• Dark mode support\n• Improved accessibility\n• 40% smaller bundle size\n\nCheck it out and let me know what you think!",
    createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 min ago
    stats: { replies: 45, reposts: 234, likes: 1893, views: 45200 },
    isLiked: false,
    isReposted: false,
    isBookmarked: false,
  },
  {
    id: createTweetId("tweet-2"),
    authorId: createUserId("user-4"),
    content: "BREAKING: Major tech company announces revolutionary AI assistant that can actually understand context and nuance. Industry experts call it a 'paradigm shift' in human-computer interaction.",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
    stats: { replies: 892, reposts: 4521, likes: 12400, views: 890000 },
    isLiked: true,
    isReposted: false,
    isBookmarked: true,
  },
  {
    id: createTweetId("tweet-3"),
    authorId: createUserId("user-3"),
    content: "Hot take: The best code is the code you don't write.\n\nBefore adding a new feature, ask:\n1. Do users actually need this?\n2. Can we solve it with existing code?\n3. What's the maintenance cost?\n\nSimplicity wins every time.",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString(), // 4 hours ago
    stats: { replies: 156, reposts: 892, likes: 4521, views: 78900 },
    isLiked: false,
    isReposted: true,
    isBookmarked: false,
  },
  {
    id: createTweetId("tweet-4"),
    authorId: createUserId("user-5"),
    content: "6 months ago we were 2 people with an idea.\n\nToday we're 15 people, serving 10,000+ customers.\n\nWhat I've learned:\n• Speed beats perfection\n• Listen to customers obsessively\n• Hire slow, fire fast\n• Culture is everything\n\nThe journey is just beginning 🙏",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString(), // 6 hours ago
    images: ["https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=400&fit=crop"],
    stats: { replies: 234, reposts: 567, likes: 3400, views: 56700 },
    isLiked: true,
    isReposted: false,
    isBookmarked: false,
  },
  {
    id: createTweetId("tweet-5"),
    authorId: createUserId("user-2"),
    content: "TypeScript tip of the day:\n\nUse branded types to prevent mixing up IDs!\n\n```typescript\ntype UserId = string & { __brand: 'UserId' }\ntype PostId = string & { __brand: 'PostId' }\n\n// Now these can't be mixed up\nfunction getUser(id: UserId) { ... }\n```\n\nSmall change, big safety improvement.",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 8).toISOString(), // 8 hours ago
    stats: { replies: 67, reposts: 445, likes: 2100, views: 34500 },
    isLiked: false,
    isReposted: false,
    isBookmarked: true,
  },
  {
    id: createTweetId("tweet-6"),
    authorId: createUserId("user-1"),
    content: "Working on something exciting today! Can't wait to share more soon 👀",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(), // 12 hours ago
    stats: { replies: 12, reposts: 5, likes: 89, views: 1200 },
    isLiked: false,
    isReposted: false,
    isBookmarked: false,
  },
  {
    id: createTweetId("tweet-7"),
    authorId: createUserId("user-3"),
    content: "Design systems aren't about having the perfect components.\n\nThey're about having consistent, well-documented components that your team actually uses.\n\nPerfection is the enemy of adoption.",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 18).toISOString(), // 18 hours ago
    stats: { replies: 89, reposts: 234, likes: 1567, views: 23400 },
    isLiked: true,
    isReposted: true,
    isBookmarked: false,
  },
  {
    id: createTweetId("tweet-8"),
    authorId: createUserId("user-4"),
    content: "The next generation of web frameworks is here. Faster builds, better DX, smaller bundles. The JavaScript ecosystem continues to evolve at breakneck speed.\n\nFull analysis in the thread below 👇",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
    stats: { replies: 456, reposts: 1234, likes: 5600, views: 234000 },
    isLiked: false,
    isReposted: false,
    isBookmarked: false,
  },
  {
    id: createTweetId("tweet-9"),
    authorId: createUserId("user-5"),
    content: "Reminder: Your first version doesn't need to be perfect.\n\nIt just needs to exist.\n\nShip it, learn from it, improve it.",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 36).toISOString(), // 1.5 days ago
    stats: { replies: 45, reposts: 567, likes: 2800, views: 45600 },
    isLiked: false,
    isReposted: false,
    isBookmarked: false,
  },
  {
    id: createTweetId("tweet-10"),
    authorId: createUserId("user-2"),
    content: "The best meetings are the ones that could have been an async message.\n\nProtect your team's focus time. Default to async.",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(), // 2 days ago
    stats: { replies: 234, reposts: 890, likes: 4500, views: 78900 },
    isLiked: true,
    isReposted: false,
    isBookmarked: false,
  },
];

// Trending Topics
export const trendingTopics: TrendingTopic[] = [
  { id: "trend-1", category: "Technology", name: "Next.js 16", postsCount: 45200 },
  { id: "trend-2", category: "Programming", name: "TypeScript", postsCount: 23400 },
  { id: "trend-3", category: "Trending", name: "#BuildInPublic", postsCount: 12800 },
  { id: "trend-4", category: "Technology", name: "AI Development", postsCount: 89000 },
  { id: "trend-5", category: "Business", name: "Startup Funding", postsCount: 5600 },
];

// Helper to get user by ID
export const getUserById = (id: UserId): User | undefined => {
  return mockUsers.find((user) => user.id === id);
};

// Helper to format numbers (1234 -> 1.2K)
export const formatCount = (count: number): string => {
  if (count >= 1000000) {
    return `${(count / 1000000).toFixed(1)}M`;
  }
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}K`;
  }
  return count.toString();
};

// Helper to format relative time
export const formatRelativeTime = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) return `${diffInSeconds}s`;
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h`;
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d`;

  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
};
