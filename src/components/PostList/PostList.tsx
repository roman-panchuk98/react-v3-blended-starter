import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Post } from "../../types/post";
import css from "./PostList.module.css";
import { deletePost } from "../../services/postService";
import toast from "react-hot-toast";

interface PostListProps {
  posts: Post[];
  isOpenEdit: (post: Post) => void;
}

export default function PostList({ posts, isOpenEdit }: PostListProps) {
  const queryClient = useQueryClient();
  const mutationDelete = useMutation({
    mutationFn: async (id: number) => {
      const res = await deletePost(id);
      return res;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myPosts"] });
      toast.success("You post has been deleted");
    },
  });

  const handleDeleteNote = (id: number) => {
    mutationDelete.mutate(id);
  };

  return (
    <ul className={css.list}>
      {posts.map((el) => (
        <li className={css.listItem} key={el.id}>
          <h2 className={css.title}>{el.title}</h2>
          <p className={css.content}>{el.body}</p>
          <div className={css.footer}>
            <button className={css.edit} onClick={() => isOpenEdit(el)}>
              Edit
            </button>
            <button className={css.delete} onClick={() => handleDeleteNote(el.id)}>
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
