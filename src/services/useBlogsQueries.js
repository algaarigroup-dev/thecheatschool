import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { API_BASE_URL, sanityClient, USE_BACKEND } from './api';

const getAllBlogs = async () => {
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

const getBlogBySlug = async (slug) => {
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


export const useGetAllBlogs = () => {
  return useQuery({
    queryKey: ['blogs', 'list'],
    queryFn: getAllBlogs,
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