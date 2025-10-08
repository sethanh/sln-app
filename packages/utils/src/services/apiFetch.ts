import { IRequestOptions } from "./IRequestOptions.js";
import { getToken } from '../store'

const apiFetch = async <T>(
  url: string,
  options: IRequestOptions = {},
  appName?: string
): Promise<T> => {
  const { method = "GET", headers = {}, queryParams, routeParams, body } = options;

  // 1️⃣ Replace route params in the URL (e.g. /users/:id → /users/123)
  if (routeParams && typeof routeParams === "object") {
    for (const [key, value] of Object.entries(routeParams)) {
      url = url.replace(`:${key}`, encodeURIComponent(String(value)));
    }
  }

  // 2️⃣ Append query parameters safely
  if (queryParams && typeof queryParams === "object") {
    const searchParams = new URLSearchParams();

    for (const [key, value] of Object.entries(queryParams)) {
      if (value === undefined || value === null) continue;

      if (typeof value === "object") {
        // Nested object/array -> stringify
        searchParams.append(key, JSON.stringify(value));
      } else {
        searchParams.append(key, String(value));
      }
    }

    const queryString = searchParams.toString();
    if (queryString) {
      url += (url.includes("?") ? "&" : "?") + queryString;
    }
  }

  // 3️⃣ Add default headers & token
  const token = getToken(appName);
  const defaultHeaders: HeadersInit = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...headers,
  };

  // 4️⃣ Fetch API
  const response = await fetch(url, {
    method,
    headers: defaultHeaders,
    body: body ? JSON.stringify(body) : undefined,
  });

  // 5️⃣ Handle response
  if (!response.ok) {
    const errorText = await response.text().catch(() => "");
    throw new Error(`HTTP ${response.status}: ${response.statusText}\n${errorText}`);
  }

  // 6️⃣ Parse JSON safely
  try {
    return (await response.json()) as T;
  } catch {
    // Trường hợp API trả về text hoặc empty body
    return {} as T;
  }
};

export {apiFetch}