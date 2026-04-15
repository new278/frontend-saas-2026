"use server";

import axiosInstance from "@/src/lib/axiosInstance";

export const getTeam = async () => {
 
 const {data}  = await axiosInstance.get(`/platform-service/team?page=${1}&limit=${20}`,);
 console.log("reponse",data)
  return data;

}

