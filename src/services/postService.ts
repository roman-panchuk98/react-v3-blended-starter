import axios from "axios";
import { Post } from "../types/post";

axios.defaults.baseURL = "https://jsonplaceholder.typicode.com/posts";

interface PostHttpResponse {
  posts: Post[];
  totalPosts: number;
}

interface CreatePostProps {
  title: string;
  body: string;
}

export interface EditPostProps {
  id: number;
  title: string;
  body: string;
}

export const fetchPosts = async (searchText: string, page: number): Promise<PostHttpResponse> => {
  const response = await axios.get<Post[]>("", {
    params: {
      q: searchText,
      _page: page,
      _limit: 10,
    },
  });

  const totalPosts = response.headers["x-total-count"] / 10;

  return { totalPosts, posts: response.data };
};

export const createPost = async (newPost: CreatePostProps): Promise<Post> => {
  const postResponse = await axios.post<Post>("", newPost);

  return postResponse.data;
};

export const editPost = async ({ title, body, id }: EditPostProps): Promise<Post> => {
  const editResponse = await axios.patch("" + id, { title, body });
  console.log(editResponse.data);

  return editResponse.data;
};

export const deletePost = async (postId: number): Promise<Post> => {
  const deleteResponse = await axios.delete("/" + postId);

  return deleteResponse.data;
};
