import { fetchPosts } from '@/lib/api';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { Metadata } from 'next';
import PostsClient from './Posts.client';

interface PostsPageProps {
  params: Promise<{ slug: string[] }>;
}

export async function generateMetedata({ params }: PostsPageProps): Promise<Metadata> {
  const { slug } = await params;
  const userId = slug[0] === 'All' ? undefined : slug[0];
  const response = await fetchPosts({ searchText: '', page: 1, userId: userId });
  return {
    title: userId ? `Posts user ${userId}` : 'Posts - All Users',
    description: `${response.posts.length} posts found  by filter: ${userId || 'All'}`,
  };
}

export default async function PostsPage({ params }: PostsPageProps) {
  const queryClient = new QueryClient();

  const { slug } = await params;
  const userId = slug[0] === 'All' ? undefined : slug[0];

  const searchText = '';
  const page = 1;

  await queryClient.prefetchQuery({
    queryKey: ['posts', searchText, page, userId],
    queryFn: () => fetchPosts({ searchText, page, userId }),
  });
  const postsData = await fetchPosts({ searchText, page, userId });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PostsClient initialData={postsData} userId={userId}></PostsClient>
    </HydrationBoundary>
  );
}
