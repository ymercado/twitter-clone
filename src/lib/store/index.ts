import { create } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { useShallow } from "zustand/react/shallow";
import type { Tweet, User, TweetId, UserId } from "@/lib/types";
import { createTweetId } from "@/lib/types";
import { mockTweets, mockUsers } from "@/lib/data";

interface AppStore {
  // State
  tweets: Tweet[];
  users: User[];
  currentUserId: UserId | null;
  _hasHydrated: boolean;

  // Hydration
  setHasHydrated: (state: boolean) => void;

  // Tweet actions
  addTweet: (content: string, authorId: UserId, images?: string[]) => void;
  likeTweet: (tweetId: TweetId) => void;
  unlikeTweet: (tweetId: TweetId) => void;
  repostTweet: (tweetId: TweetId) => void;
  unrepostTweet: (tweetId: TweetId) => void;
  deleteTweet: (tweetId: TweetId) => void;

  // User actions
  setCurrentUser: (userId: UserId) => void;
  followUser: (userId: UserId) => void;
  unfollowUser: (userId: UserId) => void;
}

export const useStore = create<AppStore>()(
  persist(
    immer((set) => ({
      // Initial state - start with mock data
      tweets: mockTweets,
      users: mockUsers,
      currentUserId: mockUsers[0]?.id ?? null,
      _hasHydrated: false,

      setHasHydrated: (state) => {
        set({ _hasHydrated: state });
      },

      // Tweet actions
      addTweet: (content, authorId, images) =>
        set((state) => {
          const newTweet: Tweet = {
            id: createTweetId(`tweet-${Date.now()}-${Math.random().toString(36).slice(2)}`),
            authorId,
            content,
            createdAt: new Date().toISOString(),
            images,
            stats: {
              replies: 0,
              reposts: 0,
              likes: 0,
              views: Math.floor(Math.random() * 100),
            },
            isLiked: false,
            isReposted: false,
            isBookmarked: false,
          };
          state.tweets.unshift(newTweet);
        }),

      likeTweet: (tweetId) =>
        set((state) => {
          const tweet = state.tweets.find((t) => t.id === tweetId);
          if (tweet && !tweet.isLiked) {
            tweet.isLiked = true;
            tweet.stats.likes += 1;
          }
        }),

      unlikeTweet: (tweetId) =>
        set((state) => {
          const tweet = state.tweets.find((t) => t.id === tweetId);
          if (tweet && tweet.isLiked) {
            tweet.isLiked = false;
            tweet.stats.likes -= 1;
          }
        }),

      repostTweet: (tweetId) =>
        set((state) => {
          const tweet = state.tweets.find((t) => t.id === tweetId);
          if (tweet && !tweet.isReposted) {
            tweet.isReposted = true;
            tweet.stats.reposts += 1;
          }
        }),

      unrepostTweet: (tweetId) =>
        set((state) => {
          const tweet = state.tweets.find((t) => t.id === tweetId);
          if (tweet && tweet.isReposted) {
            tweet.isReposted = false;
            tweet.stats.reposts -= 1;
          }
        }),

      deleteTweet: (tweetId) =>
        set((state) => {
          const index = state.tweets.findIndex((t) => t.id === tweetId);
          if (index !== -1) {
            state.tweets.splice(index, 1);
          }
        }),

      // User actions
      setCurrentUser: (userId) =>
        set((state) => {
          state.currentUserId = userId;
        }),

      followUser: (userId) =>
        set((state) => {
          const user = state.users.find((u) => u.id === userId);
          const currentUser = state.users.find((u) => u.id === state.currentUserId);
          if (user && !user.isFollowing) {
            user.isFollowing = true;
            user.followersCount += 1;
            if (currentUser) {
              currentUser.followingCount += 1;
            }
          }
        }),

      unfollowUser: (userId) =>
        set((state) => {
          const user = state.users.find((u) => u.id === userId);
          const currentUser = state.users.find((u) => u.id === state.currentUserId);
          if (user && user.isFollowing) {
            user.isFollowing = false;
            user.followersCount -= 1;
            if (currentUser) {
              currentUser.followingCount -= 1;
            }
          }
        }),
    })),
    {
      name: "twitter-clone",
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
      partialize: (state) => ({
        tweets: state.tweets,
        users: state.users,
        currentUserId: state.currentUserId,
      }),
    }
  )
);

// Selectors for optimal re-renders with useShallow to prevent unnecessary re-renders
export const useTweets = () => useStore(useShallow((state) => state.tweets));
export const useUsers = () => useStore(useShallow((state) => state.users));
export const useCurrentUserId = () => useStore((state) => state.currentUserId);
export const useCurrentUser = () =>
  useStore(
    useShallow((state) => state.users.find((u) => u.id === state.currentUserId))
  );
export const useHasHydrated = () => useStore((state) => state._hasHydrated);

export const useTweetById = (tweetId: TweetId) =>
  useStore(
    useShallow((state) => state.tweets.find((t) => t.id === tweetId))
  );

export const useUserById = (userId: UserId) =>
  useStore(
    useShallow((state) => state.users.find((u) => u.id === userId))
  );

export const useTweetsByUser = (userId: UserId) =>
  useStore(
    useShallow((state) => state.tweets.filter((t) => t.authorId === userId))
  );

// Actions - access directly from store to avoid creating new objects
export const getStoreActions = () => {
  const state = useStore.getState();
  return {
    addTweet: state.addTweet,
    likeTweet: state.likeTweet,
    unlikeTweet: state.unlikeTweet,
    repostTweet: state.repostTweet,
    unrepostTweet: state.unrepostTweet,
    deleteTweet: state.deleteTweet,
    setCurrentUser: state.setCurrentUser,
    followUser: state.followUser,
    unfollowUser: state.unfollowUser,
  };
};
