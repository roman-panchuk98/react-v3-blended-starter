'use client';

import Loading from '@/app/loading';
import css from './PostDetails.module.css';
import { fetchPostById, fetchUserById } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';

export default function PostDetailsClient() {
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
    <>
      <main className={css.main}>
        <div className={css.container}>
          <div className={css.item}>
            <button className={css.backBtn} onClick={() => router.back()}>
              ← Back
            </button>

            <div className={css.post}>
              <div className={css.wrapper}>
                <div className={css.header}>
                  <h2>{post?.title}</h2>
                </div>

                <p className={css.content}>{post?.body}</p>
                <p className={css.user}>Author: {user?.name}</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
