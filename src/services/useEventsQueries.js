import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { API_BASE_URL, sanityClient, USE_BACKEND } from './api';

export const getAllEvents = async () => {
  if (USE_BACKEND === 'sanity') {

    const query = `*[_type == "event"] | order(date desc) {
      _id,
      title,
      slug,
      description,
      eventImage,
      date,
      time,
      mode,
      location,
      guestSpeakers[]{
        name,
        title,
        photo
      },
      registrationLink
    }`;
    const data = await sanityClient.fetch(query);

    return data;
  } else {
    console.log('📡 Fetching all events from SPRING BOOT API:', `${API_BASE_URL}/api/events`);
    const response = await axios.get(`${API_BASE_URL}/api/events`);
    console.log('✅ Spring Boot returned:', response.data.data.length, 'events');
    return response.data.data;
  }
};

export const getEventBySlug = async (slug) => {
  if (USE_BACKEND === 'sanity') {
    console.log('📡 Fetching event by slug from SANITY DIRECT API:', slug);
    const query = `*[_type == "event" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      description,
      eventImage,
      date,
      time,
      mode,
      location,
      guestSpeakers[]{
        name,
        title,
        photo
      },
      registrationLink
    }`;
    const data = await sanityClient.fetch(query, { slug });
    console.log('✅ Sanity returned event:', data?.title);
    return data;
  } else {
    console.log('📡 Fetching event by slug from SPRING BOOT API:', `${API_BASE_URL}/api/events/${slug}`);
    const response = await axios.get(`${API_BASE_URL}/api/events/${slug}`);
    console.log('✅ Spring Boot returned event:', response.data.data?.title);
    return response.data.data;
  }
};


export const useGetAllEvents = () => {
  return useQuery({
    queryKey: ['events', 'list'],
    queryFn: getAllEvents,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    refetchOnReconnect: true,
    retry: 1,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000)
  });
};


export const useGetEventBySlug = (slug) => {
  return useQuery({
    queryKey: ['events', 'detail', slug],
    queryFn: () => getEventBySlug(slug),
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