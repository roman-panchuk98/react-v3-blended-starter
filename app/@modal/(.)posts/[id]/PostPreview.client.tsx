'use client';

import { useQuery } from '@tanstack/react-query';
import Modal from '@/components/Modal/Modal';
import { fetchPostById, fetchUserById } from '@/lib/api';
import { useParams, useRouter } from 'next/navigation';

import css from './PostPreview.module.css';
import Loading from '@/app/loading';

export default function PostPreviewClient() {
  const router = useRouter();
  const { id } = useParams();
  const parseId = Number(id);

  const { data: post, isLoading: postLoading } = useQuery({
    queryKey: ['postId', parseId],
    queryFn: () => fetchPostById(parseId),
    refetchOnMount: false,
  });

  const { data: user, isLoading: userLoading } = useQuery({
    queryKey: ['user', post?.userId],
    queryFn: () => fetchUserById(post!.userId),
  });

  if (postLoading || userLoading) return <Loading />;

  return (
    <Modal onClose={() => router.back()}>
      <button className={css.backBtn} onClick={() => router.back()}>
        ← Back
      </button>
      <div className={css.post}>
        <div className={css.wrapper}>
          <div className={css.header}>
            <h2>{post?.title}</h2>
          </div>

          <p className={css.content}>{post?.body}</p>
        </div>
        <p className={css.user}>{user?.name}</p>
      </div>
    </Modal>
  );
}
