import { createAsyncThunk } from "@reduxjs/toolkit";
import { Post } from "./postSlice";
import axios from "axios";

const POSTS_URL = "https://jsonplaceholder.typicode.com/posts";

interface SavedPost {
  author: string;
  body: string;
  userId: number | string;
  title: string;
}

export const fetchPosts = createAsyncThunk("fetchPosts", async () => {
  const response = await axios.get<Post[]>(POSTS_URL);
  return response.data;
});

export const addNewPost = createAsyncThunk(
  "addPost",
  async (post: SavedPost) => {
    const response = await axios.post(POSTS_URL, post);
    return response.data;
  }
);

export const updatePost = createAsyncThunk(
  "updatePost",
  async (post: Omit<Post, "date">) => {
    const { id } = post;
    try {
      const response = await axios.put(`${POSTS_URL}/${id}`, post);
      return response.data;
    } catch (err) {
      return post;
    }
  }
);

export const deletePost: any = createAsyncThunk(
  "deletePost",
  async (post: Post) => {
    const { id } = post;
    const response = await axios.delete(`${POSTS_URL}/${id}`);
    if (response?.status === 200) return post;
  }
);
