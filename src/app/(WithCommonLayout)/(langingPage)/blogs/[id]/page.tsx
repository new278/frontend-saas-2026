import BlogDetailsLayout from '@/src/modules/blogs/components/BlogDetailsLayout'
import { getBlogById } from '@/src/server/BlogService';
import React from 'react'

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

    const data =  await getBlogById(id);
    const blog = data?.data ;
  
  return (
    <main className="min-h-screen max-w-7xl w-7xl mx-auto py-12 md:py-20">
      <BlogDetailsLayout blog={blog} />
    </main>
  );
}

export default Page