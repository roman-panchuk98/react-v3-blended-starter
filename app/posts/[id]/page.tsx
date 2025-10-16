import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';

import { fetchPostById } from '@/lib/api';
import PostDetailsClient from './PostDetails.client';
import { Metadata } from 'next';

interface PostDetailsProps {
  params: Promise<{ id: number }>;
}

export async function generateMetadata({ params }: PostDetailsProps): Promise<Metadata> {
  const { id } = await params;
  const user = await fetchPostById(id);

  return {
    title: user.title,
    description: user.body.slice(0, 30),
  };
}

export default async function PostDetails({ params }: PostDetailsProps) {
  const queryClient = new QueryClient();
  const { id } = await params;

  await queryClient.prefetchQuery({
    queryKey: ['postId', id],
    queryFn: () => fetchPostById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PostDetailsClient />
    </HydrationBoundary>
  );
}
