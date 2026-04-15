"use client";

import envConfig from "../config";

type FetchOptions = RequestInit & { params?: Record<string, string> };

/**
 * Public fetch wrapper for accessing public APIs without authentication.
 * Provides consistent error handling and supports query parameters.
 */
export async function PublicServerFetch(input: string, options?: FetchOptions) {
  const base = input.startsWith("http") ? input : `${envConfig.backendURL}${input}`;
  // Allow callers to pass `params` (query parameters) via options.params
  const urlObj = new URL(base);
  const params = options?.params;
  if (params) {
    Object.keys(params).forEach((k) => {
      // skip empty keys which would produce malformed query strings like "=value"
      if (!k || String(k).trim() === "") return;
      const v = params[k];
      if (v !== undefined && v !== null) urlObj.searchParams.set(k, String(v));
    });
  }
  const url = urlObj.toString();

  const headers: Record<string, string> = {};
  if (options?.headers) {
    // copy existing headers into plain object
    const h = options.headers as Record<string, string> | Headers;
    if (h instanceof Headers) {
      h.forEach((v, k) => (headers[k] = v));
    } else {
      Object.assign(headers, h as Record<string, string>);
    }
  }

  const fetchOptions: FetchOptions = {
    ...options,
    headers,
  };

  const res = await fetch(url, fetchOptions as RequestInit);
  return res;
}

export async function PublicServerFetchJson(input: string, options?: FetchOptions) {
  const res = await PublicServerFetch(input, options);
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Request failed: ${res.status} ${text}`);
  }
  return res.json();
}

export default PublicServerFetch;