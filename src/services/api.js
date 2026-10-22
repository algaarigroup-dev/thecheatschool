import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

// Blogs and events are read from Sanity unless a Spring Boot backend is
// explicitly configured. Previously this defaulted to 'springboot' on
// localhost:8080, which does not exist in production and broke both pages.
export const API_BASE_URL = import.meta.env.VITE_BACKEND_API || '';
export const HAS_BACKEND = Boolean(API_BASE_URL);
export const USE_BACKEND =
  import.meta.env.VITE_USE_BACKEND || (HAS_BACKEND ? 'springboot' : 'sanity');

export const sanityClient = createClient({
  projectId: '4x6wdy47',
  dataset: 'production',
  useCdn: true,
  apiVersion: '2024-01-01',
  timeout: 10000,
  maxRetries: 1
});

export const builder = imageUrlBuilder(sanityClient);

export const urlFor = (source) => {
  if (!source) return '';
  if (USE_BACKEND === 'sanity') {
    return builder.image(source).url();
  }
  if (!source?.asset?._ref) return '';
  const ref = source.asset._ref;
  const [, id, dimensions, format] = ref.split('-');
  return `https://cdn.sanity.io/images/4x6wdy47/production/${id}-${dimensions}.${format}`;
};

export const client = sanityClient;
