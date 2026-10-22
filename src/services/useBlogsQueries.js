import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { API_BASE_URL, sanityClient, USE_BACKEND } from './api';
import { ARTICLES, getArticle, ARTICLE_AUTHOR } from '@/content/articles';

// Local cheat sheet articles shaped like CMS posts so the pages can list them together.
const toPost = (a) => ({
  _id: `local-${a.slug}`,
  local: true,
  title: a.title,
  slug: { current: a.slug },
  publishedAt: a.date,
  author: { name: ARTICLE_AUTHOR },
  excerpt: a.description,
  description: a.description,
  category: a.category,
  blocks: a.body
});
const LOCAL_POSTS = ARTICLES.map(toPost);

const getRemoteBlogs = async () => {
  if (USE_BACKEND === 'sanity') {

    const query = `*[_type == "post"] | order(publishedAt desc) {
      _id,
      title,
      slug,
      mainImage,
      publishedAt,
      author->{name},
      body
    }`;
    const data = await sanityClient.fetch(query);

    return data;
  } else {
    console.log('📡 Fetching all blogs from SPRING BOOT API:', `${API_BASE_URL}/api/blogs`);
    const response = await axios.get(`${API_BASE_URL}/api/blogs`);
    console.log('✅ Spring Boot returned:', response.data.data.length, 'blogs');
    return response.data.data;
  }
};

// Local articles always show, even if the CMS is unreachable.
const getAllBlogs = async () => {
  let remote = [];
  try {
    remote = (await getRemoteBlogs()) || [];
  } catch (e) {
    console.error('Blog CMS unavailable, showing built in articles only', e);
  }
  return [...LOCAL_POSTS, ...remote].sort(
    (a, b) => new Date(b.publishedAt) - new Date(a.publishedAt)
  );
};

const getRemoteBlogBySlug = async (slug) => {
  if (USE_BACKEND === 'sanity') {
    console.log('📡 Fetching blog by slug from SANITY DIRECT API:', slug);
    const query = `*[_type == "post" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      mainImage,
      publishedAt,
      author->{name},
      body
    }`;
    const data = await sanityClient.fetch(query, { slug });
    console.log('✅ Sanity returned blog:', data?.title);
    return data;
  } else {
    console.log('📡 Fetching blog by slug from SPRING BOOT API:', `${API_BASE_URL}/api/blogs/${slug}`);
    const response = await axios.get(`${API_BASE_URL}/api/blogs/${slug}`);
    console.log('✅ Spring Boot returned blog:', response.data.data?.title);
    return response.data.data;
  }
};


const getBlogBySlug = async (slug) => {
  const local = getArticle(slug);
  if (local) return toPost(local);
  return getRemoteBlogBySlug(slug);
};

const LOCAL_SORTED = [...LOCAL_POSTS].sort(
  (a, b) => new Date(b.publishedAt) - new Date(a.publishedAt)
);

export const useGetAllBlogs = () => {
  return useQuery({
    queryKey: ['blogs', 'list'],
    queryFn: getAllBlogs,
    // Show built in articles instantly; CMS posts merge in when they arrive.
    placeholderData: LOCAL_SORTED,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    refetchOnReconnect: true,
    retry: 1,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000)
  });
};


export const useGetBlogBySlug = (slug) => {
  return useQuery({
    queryKey: ['blogs', 'detail', slug],
    queryFn: () => getBlogBySlug(slug),
    enabled: !!slug,
    staleTime: 10 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    refetchOnReconnect: true,
    retry: 1,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000)
  });
};