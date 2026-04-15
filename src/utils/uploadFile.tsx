'use server';

import axiosInstance from "../lib/axiosInstance";



export interface ImageRes {
  data: { fileUrl: string; message: string; status: number };
}

export const uploadFile = async (file: File): Promise<string | null> => {
  const formData = new FormData();
  formData.append("file", file);

  try {
    // server mounts file routes under /file and exposes /single for single uploads
    const response = await axiosInstance.post(
      `/file/single`,
      formData,
      { headers: { "Content-Type": "multipart/form-data" } }
    );

    // server response shape: { success, message, data: <fileInfo> }
    const payload = response?.data;
    const fileInfo = payload?.data;

    // Prefer fullUrl, then url, then fileUrl fields depending on backend
    const url = fileInfo?.fullUrl || fileInfo?.url || fileInfo?.fileUrl || null;
    console.log("uploadFile response:", { payload, url });
    return url ?? null;
  } catch (error) {
    console.error("File upload error:", error);
    return null;
  }
};

/**
 * Upload multiple files in a single request to the server endpoint `/file/multiple`.
 * Returns an array of resolved URLs (or an empty array on failure).
 */
export const uploadFiles = async (files: File[]): Promise<string[]> => {
  if (!files || files.length === 0) return [];

  const formData = new FormData();
  // server expects field name `files` for the array
  files.forEach((f) => formData.append("files", f));

  try {
    const response = await axiosInstance.post(`/file/multiple`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    const payload = response?.data;
    const data = payload?.data;

    // `data` may be an array of fileInfo objects
    if (Array.isArray(data)) {
      const urls = data
        .map((fi: Record<string, unknown>) => String(fi?.fullUrl ?? fi?.url ?? fi?.fileUrl ?? ""))
        .filter((u) => u.length > 0);
    
      return urls;
    }

    return [];
  } catch (err) {
    console.error("Batch file upload error:", err);
    return [];
  }
};