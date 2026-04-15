"use server";

import axiosInstance from "@/src/lib/axiosInstance";

export const getBlogs = async () => {
 
 const {data}  = await axiosInstance.get(`/platform-service/blogs?page=${1}&limit=${20}`,);

  return data;

}


export const getBlogById = async (id: string) => {
  const {data}  = await axiosInstance.get(`/platform-service/blogs/${id}`);
  return data;
}

