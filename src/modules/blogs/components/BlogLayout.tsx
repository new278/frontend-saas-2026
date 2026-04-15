import React from 'react'
import BlogList from './BlogList'
import { getBlogs } from '@/src/server/BlogService'

const BlogLayout = async () => {
  const data =  await getBlogs();
  const blogs = data?.data ;


  return (

      <BlogList initialData={blogs} />
  )
}

export default BlogLayout