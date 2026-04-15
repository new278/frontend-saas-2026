"use client";

import FormatDate from "@/src/utils/FormatDate";
import Image from "next/image";
import Link from "next/link";
import { BlogProps } from "../types/blog.type";

export default function BlogCard({ blog }: { blog: BlogProps }) {
  return (
    <article className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-transform transform hover:-translate-y-1">
      <Link href={`/blogs/${blog.id}`} className="block">
        <div className="relative h-44 md:h-48 w-full">
          <Image
            src={blog.featuredImage || "/technology-team-meeting.jpg"}
            alt={blog.title}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent" />
          <div className="absolute left-3 bottom-3 bg-white/90 text-xs text-gray-800 px-2 py-1 rounded">
            {FormatDate(blog.createdAt)}
          </div>
        </div>

        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-900 leading-tight">
            {blog.title}
          </h3>
          {blog.excerpt && (
            <p className="text-sm text-gray-600 mt-2 line-clamp-3">
              {blog.excerpt}
            </p>
          )}

          <div className="mt-4 flex items-center justify-between">
            <span className="text-sm text-secondary font-semibold">Read more</span>
            <span className="text-xs text-gray-400">{blog.category}</span>
          </div>
        </div>
      </Link>
    </article>
  );
}
