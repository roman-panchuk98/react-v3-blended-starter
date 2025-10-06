import css from "./App.module.css";
import Modal from "../Modal/Modal";
import PostList from "../PostList/PostList";
import SearchBox from "../SearchBox/SearchBox";
import Pagination from "../Pagination/Pagination";
import PostForm from "../CreatePostForm/CreatePostForm";
import { fetchPosts } from "../../services/postService";

import { useEffect, useState } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useDebouncedCallback } from "use-debounce";
import toast from "react-hot-toast";
import EditPostForm from "../EditPostForm/EditPostForm";
import { Post } from "../../types/post";

export default function App() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchWord, setSearchWord] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isEditPost, setIsEditOpen] = useState<boolean>(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const handleChange = useDebouncedCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchWord(event.target.value);
    setCurrentPage(1);
  }, 300);

  const { data } = useQuery({
    queryKey: ["myPosts", searchWord, currentPage],
    queryFn: () => fetchPosts(searchWord, currentPage),
    placeholderData: keepPreviousData,
  });

  useEffect(() => {
    if (data?.posts.length === 0) {
      toast.error("There is nothing on request.");
    }
  }, [data]);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleOpenEdit = (post: Post) => {
    setSelectedPost(post);
    setIsEditOpen(true);
  };
  const handleCloseEdit = () => {
    setIsEditOpen(false);
  };

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox value={searchWord} onSearch={handleChange} />

        {data && data.posts.length > 1 && (
          <Pagination
            totalPages={data?.totalPosts ?? 0}
            currentPage={currentPage}
            onPageChange={(selected) => setCurrentPage(selected)}
          />
        )}
        <button className={css.button} onClick={handleOpenModal}>
          Create post
        </button>
      </header>
      {isModalOpen && (
        <Modal onClose={handleCloseModal}>
          <PostForm onClose={handleCloseModal} />
        </Modal>
      )}
      {isEditPost && selectedPost && (
        <Modal onClose={handleCloseEdit}>
          <EditPostForm onClose={handleCloseEdit} post={selectedPost} />
        </Modal>
      )}
      {data && data?.posts.length > 0 && (
        <PostList posts={data.posts} isOpenEdit={handleOpenEdit} />
      )}
    </div>
  );
}
