import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../store/store";
import { Post } from "./postSlice";

export const selectAllPosts = (state: RootState) => state.posts.posts;
export const getPostsStatus = (state: RootState) => state.posts.status;

export const selectAllPostsSelector = createSelector(
  [selectAllPosts],
  (posts: Post[]) => posts
);

export const getPostsStatusSelector = createSelector(
  [getPostsStatus],
  (status: string) => status
);

export const selectPostsByIdSelector = createSelector(
  [selectAllPosts, (state, postId: number) => postId],
  (posts, postId) => posts.find((post) => post.id === postId)
);
