import { createSlice, PayloadAction, nanoid } from "@reduxjs/toolkit";
import { sub } from "date-fns";
import { fetchPosts, addNewPost, updatePost, deletePost } from "./postServices";

export interface Post {
  author: string;
  body: string;
  date: string;
  id: number;
  thumbsUp: number;
  title: string;
  userId: number | string;
}

export interface PostState {
  posts: Post[];
  status: string;
  error: string;
}

const initialState: PostState = {
  posts: [],
  status: "idle",
  error: "",
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    reactToPost(state: PostState, action: PayloadAction<number>) {
      const postId = action.payload;
      const postToReact = state.posts.find((post) => post.id === postId);
      if (postToReact) {
        postToReact.thumbsUp++;
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchPosts.pending, (state: PostState) => {
        state.status = "loading";
      })
      .addCase(
        fetchPosts.fulfilled,
        (state: PostState, action: PayloadAction<Post[]>) => {
          state.status = "succeeded";
          let min = 1;
          const loadedPosts = action.payload.map((post) => {
            post.date = sub(new Date(), { minutes: min++ }).toISOString();
            post.thumbsUp = 0;
            post.author = "Unknown Author";
            return post;
          });
          state.posts = loadedPosts;
        }
      )
      .addCase(fetchPosts.rejected, (state: PostState) => {
        state.status = "failed";
      })
      .addCase(
        addNewPost.fulfilled,
        (state: PostState, action: PayloadAction<Post>) => {
          const extendedPost = {
            ...action.payload,
            id: state.posts[state.posts.length - 1].id + 111,
            date: new Date().toISOString(),
            thumbsUp: 0,
          };
          state.posts.push(extendedPost);
        }
      )
      .addCase(
        updatePost.fulfilled,
        (state: PostState, action: PayloadAction<Post>) => {
          if (!action.payload?.id) {
            state.status = "failed";
          }

          const { id } = action.payload;
          action.payload.date = new Date().toISOString();
          const posts = state.posts.map((post) =>
            post.id === id ? action.payload : post
          );
          state.posts = posts;
        }
      )
      .addCase(
        deletePost.fulfilled,
        (state: PostState, action: PayloadAction<{ id: number }>) => {
          const { id } = action.payload;
          if (!id) {
            state.status = "failed";
          }

          const posts = state.posts.filter((post) => post.id !== id);
          state.posts = posts;
        }
      );
  },
});

export const { reactToPost } = postsSlice.actions;

export default postsSlice.reducer;
