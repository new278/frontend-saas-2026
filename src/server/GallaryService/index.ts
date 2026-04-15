"use server";

import axiosInstance from "@/src/lib/axiosInstance";

export const getGallary = async () => {
 
 const {data}  = await axiosInstance.get(`/platform-service/gallery?page=${1}&limit=${20}`,);
 console.log("reponse",data)
  return data;

}

