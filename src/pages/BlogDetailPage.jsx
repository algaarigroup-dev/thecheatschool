import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { urlFor } from '../services/api';
import { useGetBlogBySlug } from '../services/useBlogsQueries';
import PortableText from 'react-portable-text';
import { ArrowLeft, Calendar, User, Clock } from 'lucide-react';
import Loader from '../components/global/Loader';
import ErrorDisplay from '../components/global/ErrorDisplay';
import usePageMeta from '../hooks/usePageMeta';

const BlogDetailPage = () => {
  const { slug } = useParams();
  const { data: blog, isLoading, isError, error } = useGetBlogBySlug(slug);

  const excerpt = Array.isArray(blog?.body)
    ? blog.body
        .filter((b) => b?._type === 'block')
        .map((b) => (b.children || []).map((c) => c.text).join(''))
        .join(' ')
        .slice(0, 155)
    : undefined;
  usePageMeta({
    title: blog?.title ? `${blog.title} | The Cheat School` : 'Blog | The Cheat School',
    description: excerpt,
    path: `/blogs/${slug}`,
    image: blog?.mainImage ? urlFor(blog.mainImage) : undefined
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-dark-grey">
        <Loader />
      </div>);

  }

  if (isError || !blog) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-dark-grey px-4">
        <div className="text-center max-w-md">
          <ErrorDisplay
            heading={error?.message || 'Blog not found!'}
            message="The article you're looking for doesn't exist or has been removed." />
          
          <div className="mt-6">
            <Link
              to="/blogs"
              className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-lg font-secondary font-medium transition-all duration-300 hover:gap-3">
              
              <ArrowLeft className="w-5 h-5" />
              Back to Blogs
            </Link>
          </div>
        </div>
      </div>);

  }

  const readingTime = blog.body ? Math.ceil(JSON.stringify(blog.body).length / 1000) : 5;

  return (
    <div className="min-h-screen bg-dark-grey">
      <div className="max-w-5xl mx-auto px-4 pt-8 mt-21 pb-4">
        <Link
          to="/blogs"
          className="inline-flex items-center gap-2 text-secondary hover:text-primary font-secondary font-medium transition-all duration-300 group">
          
          <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
          Back to Blogs
        </Link>
      </div>

      {}
      {blog.mainImage &&
      <div className="max-w-5xl mx-auto px-4 mb-8">
          <div className="relative overflow-hidden rounded-xl shadow-2xl aspect-[21/9]">
            <img
            src={urlFor(blog.mainImage)}
            alt={blog.title}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
          
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
          </div>
        </div>
      }

      {}
      <article className="max-w-4xl mx-auto px-4 pb-16">
        {}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-primary font-bold text-secondary leading-tight mb-6">
          {blog.title}
        </h1>

        {}
        <div className="flex flex-wrap items-center gap-6 text-muted-foreground font-secondary mb-8 pb-8 border-b border-border">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Written by</p>
              <p className="text-secondary font-medium">{blog.author?.name || 'Anonymous'}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">Published</p>
              <p className="text-secondary font-medium">
                {new Date(blog.publishedAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">Reading time</p>
              <p className="text-secondary font-medium">{readingTime} min read</p>
            </div>
          </div>
        </div>

        {}
        <div className="prose prose-lg max-w-none font-secondary text-foreground">
          {blog.body &&
          <PortableText
            content={blog.body}
            serializers={{
              h1: (props) =>
              <h1 className="text-4xl font-primary font-bold text-secondary mt-12 mb-6 leading-tight" {...props} />,

              h2: (props) =>
              <h2 className="text-3xl font-primary font-bold text-secondary mt-10 mb-5 leading-tight" {...props} />,

              h3: (props) =>
              <h3 className="text-2xl font-primary font-semibold text-secondary mt-8 mb-4" {...props} />,

              normal: (props) =>
              <p className="text-lg leading-relaxed text-foreground/90 mb-6" {...props} />,

              li: ({ children }) =>
              <li className="ml-6 mb-2 text-lg leading-relaxed text-foreground/90">{children}</li>,

              ul: ({ children }) =>
              <ul className="list-disc list-outside ml-6 mb-6 space-y-2">{children}</ul>,

              ol: ({ children }) =>
              <ol className="list-decimal list-outside ml-6 mb-6 space-y-2">{children}</ol>,

              blockquote: ({ children }) =>
              <blockquote className="border-l-4 border-primary pl-6 py-2 my-8 italic text-xl text-muted-foreground bg-light-grey rounded-r-lg">
                    {children}
                  </blockquote>,

              code: ({ children }) =>
              <code className="bg-light-grey text-primary px-2 py-1 rounded text-sm font-mono">
                    {children}
                  </code>,

              link: ({ children, href }) =>
              <a
                href={href}
                className="text-primary hover:text-primary/80 underline underline-offset-4 transition-colors"
                target="_blank"
                rel="noopener noreferrer">
                
                    {children}
                  </a>

            }} />

          }
        </div>

        {}
        <div className="mt-16 pt-8 border-t border-border">
          <div className="bg-light-grey rounded-xl p-8 text-center">
            <h3 className="text-2xl font-primary font-bold text-secondary mb-3">
              Enjoyed this article?
            </h3>
            <p className="text-muted-foreground font-secondary mb-6">
              Explore more insightful articles and stay updated with our latest content.
            </p>
            <Link
              to="/blogs"
              className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-lg font-secondary font-semibold transition-all duration-300 hover:gap-3">
              
              View All Articles
              <ArrowLeft className="w-5 h-5 rotate-180" />
            </Link>
          </div>
        </div>
      </article>
    </div>);

};

export default BlogDetailPage;