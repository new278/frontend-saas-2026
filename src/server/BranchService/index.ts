"use server";

import axiosInstance from "@/src/lib/axiosInstance";

export const getBranches = async () => {
 
 const {data}  = await axiosInstance.get(`/platform-service/branches?page=${1}&limit=${20}`,);
 console.log("reponse",data)
  return data;

}

