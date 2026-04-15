"use client"

import Image from 'next/image'
import { useState } from 'react'


const BlogDetailsLayout = ({ blog }: { blog: any }) => {
  const [copied, setCopied] = useState(false);

  const pageUrl = typeof window !== "undefined" ? window.location.href : `/${blog.id}`;

  const handleCopy = async () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(pageUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch {
        // ignore
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main column */}
        <article className="lg:col-span-2">
          <div className="relative overflow-hidden rounded-2xl shadow-lg">
            <Image
              src={blog.featuredImage || "/technology-team-meeting.jpg"}
              alt={blog.title}
              width={1400}
              height={700}
              className="object-cover w-full h-72 sm:h-96"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          </div>

          <header className="mt-6 md:mt-8">
            <h1 className="text-4xl font-extrabold leading-tight text-gray-900">
              {blog.title}
            </h1>

            <div className="mt-4 flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">By {blog.author.fullName}</span>
                <span className="text-xs text-gray-400">•</span>
                <span className="text-sm text-gray-500">
                  {new Date(blog.createdAt).toLocaleDateString()}
                </span>
              </div>
              <button
                onClick={handleCopy}
                className="text-sm text-blue-500 hover:underline"
              >
                {copied ? "Copied!" : "Copy link"}
              </button>
            </div>
          </header>

          <div className="prose prose-lg max-w-none mt-6 text-gray-700">
            {blog.content}
          </div>

          <section className="mt-8">
            <h2 className="text-xl font-semibold text-gray-900">Tags</h2>
            <div className="flex flex-wrap gap-2 mt-2">
              {blog.tags.map((tag:any) => (
                <span
                  key={tag}
                  className="bg-gray-200 text-gray-700 text-sm px-3 py-1 rounded-full shadow-sm"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </section>
        </article>

        {/* Sidebar */}
        <aside className="lg:col-span-1">
          <div className="sticky top-10 space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900">Author</h3>
              <div className="mt-4">
                <p className="text-sm text-gray-600 font-medium">{blog.author.fullName}</p>
                <p className="text-sm text-gray-500">{blog.author.email}</p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900">Statistics</h3>
              <div className="mt-4 space-y-2">
                <p className="text-sm text-gray-600">Views: {blog.viewCount}</p>
                <p className="text-sm text-gray-600">Likes: {blog.likeCount}</p>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default BlogDetailsLayout