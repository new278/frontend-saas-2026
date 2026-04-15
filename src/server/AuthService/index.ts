"use server";


import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";
import axiosInstance from "@/src/lib/axiosInstance";
import { IDecodedToken } from "@/src/types/auth.types";


export const registerUser = async (userData: FieldValues) => {
  try {
    // Map legacy field names to API contract if needed
    const payload: Record<string, unknown> = { ...userData };
    if (!payload["businessCategoryId"] && payload["businessCategoryMain"]) {
      payload["businessCategoryId"] = payload["businessCategoryMain"];
    }
    if (!payload["subBusinessCategoryId"] && payload["businessCategorySub"]) {
      payload["subBusinessCategoryId"] = payload["businessCategorySub"];
    }

    // Drop empty-string optional fields so server-side optional validations don't get tripped
    if (typeof payload["subBusinessCategoryId"] === "string" && !(payload["subBusinessCategoryId"] as string).trim()) {
      delete payload["subBusinessCategoryId"];
    }

    // Remove non-API fields
    if ("confirmPassword" in payload) {
      delete payload["confirmPassword"];
    }

    const { data } = await axiosInstance.post("/auth/register", payload);

    if (data?.success) {
      const cookieStore = await cookies();
      // Typed local view of the backend payload to avoid `any` usage
      const payload = data?.data as { token?: string; accessToken?: string; refreshToken?: string } | undefined;
  const token = payload?.token || payload?.accessToken;
      if (token) {
        cookieStore.set("accessToken", token);
      }
      // Only persist token as cookie. We no longer write a separate `user` cookie.
    }
    return data
  } catch (error: unknown) {
    // Extract the actual error message from the backend response
    const err = error as { response?: { data?: { message?: string; errorSources?: Array<{ path?: string; message?: string }> } }; message?: string };
    const baseMessage = err?.response?.data?.message || err?.message || 'Registration failed';
    // Include field-level errors if present
    const fieldErrors = err?.response?.data?.errorSources
      ?.map((e) => `${e.path}: ${e.message}`)
      .join(", ");
    const finalMessage = fieldErrors ? `${baseMessage} - ${fieldErrors}` : baseMessage;
    console.error('Registration error:', err?.response?.data);
    throw new Error(finalMessage);
  }
};

export const loginUser = async (userData: FieldValues) => {
  try {
    const { data } = await axiosInstance.post("/auth/login", userData);

    if (data?.success) {
      const cookieStore = await cookies();
      // Server returns { token } under data
      const token = data?.data?.token;
      if (token) {
        cookieStore.set("accessToken", token);
      }
    }
    return data
  } catch (error: unknown) {
    // Extract the actual error message from the backend response
    const err = error as { response?: { data?: { message?: string } }; message?: string };
    const errorMessage = err?.response?.data?.message || err?.message || 'Login failed';
    console.error('Login error:', err?.response?.data);
    throw new Error(errorMessage);
  }
};

export const logout = async () => {
  const cookieStore = await cookies()
  try {
    await axiosInstance.post("/auth/logout");
  } catch {
    // ignore logout API errors
  }
  cookieStore.delete("accessToken");
  cookieStore.delete("user");
}


export const getCurrentUser = async () => {
const cookieStore = await cookies();
// Try to read access token cookie and decode the payload to return a user-like object
const token = cookieStore.get("accessToken")?.value;
if (!token) return null;
try {
  // decode base64url payload
  const parts = token.split('.');
  if (parts.length < 2) return null;
  let payload = parts[1];
  payload = payload.replace(/-/g, '+').replace(/_/g, '/');
  while (payload.length % 4 !== 0) payload += '=';
  const json = Buffer.from(payload, 'base64').toString('utf8');
  const parsed = JSON.parse(json) as IDecodedToken;
  console.log('Decoded token payload:', parsed);
  return parsed;
} catch {
  // If something goes wrong decoding, remove the corrupt cookie and return null
  try { cookieStore.delete("accessToken"); } catch {}
  return null;
}

}


export const getNewAccessToken = async () => {
  try {
    const cookieStore = await cookies()
    const refreshToken = cookieStore.get("refreshToken")?.value;
    const res = await axiosInstance({
      url: "/auth/refresh-token",
      method: "POST",
      withCredentials: true,
      headers: {
        cookies: `refreshToken=${refreshToken}`
      }
    })
    return res.data;
  } catch (error: unknown) {
    console.error('Token refresh error:', error);
    throw new Error("Failed to get new access token")
  }
}

export const requestPasswordReset = async (payload: { email: string }) => {
  const { data } = await axiosInstance.post("/auth/forgot-password", payload);
  return data;
}

export const confirmPasswordReset = async (password: string, token: string) => {
  const { data } = await axiosInstance.post(
    "/auth/reset-password",
    { password },
    { headers: { Authorization: token } }
  );
  return data;
}

export async function serverUser() {
  // const cookieData = await get_server_session();

  // return new Promise((resolve) =>
  //   setTimeout(() => {
  //     resolve(cookieData);
  //   }, 1000)
  // );
}




