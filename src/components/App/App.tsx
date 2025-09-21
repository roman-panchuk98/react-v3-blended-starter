import Modal from "../Modal/Modal";
import PostList from "../PostList/PostList";
import SearchBox from "../SearchBox/SearchBox";
import Pagination from "../Pagination/Pagination";

import css from "./App.module.css";
import { useEffect, useState } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchPosts } from "../../services/postService";
import toast, { Toaster } from "react-hot-toast";
import { useDebouncedCallback } from "use-debounce";
import PostForm from "../CreatePostForm/CreatePostForm";

export default function App() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchWord, setSearchWord] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  // const [isCreatePost, setIsCreatePost] = useState();
  // const [isEditPost, setIsEditPost] = useState();

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

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox value={searchWord} onSearch={handleChange} />
        <Toaster />
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
      {data && data?.posts.length > 0 && <PostList posts={data.posts} />}
    </div>
  );
}
