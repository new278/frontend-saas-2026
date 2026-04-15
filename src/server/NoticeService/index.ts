"use server";

import axiosInstance from "@/src/lib/axiosInstance";

export const getNotice = async () => {
 
 const {data}  = await axiosInstance.get(`/platform-service/notices?page=${1}&limit=${20}`,);
  return data;

}
