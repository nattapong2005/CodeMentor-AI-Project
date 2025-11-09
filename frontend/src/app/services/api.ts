export const API_URL = "http://localhost:3001/api/v1";

type FetchOptions = RequestInit & { params?: Record<string, any> };

async function fetchApi<T>(endpoint: string, options: FetchOptions = {}): Promise<T> {
  const { params, ...fetchOptions } = options;

  // สร้าง query string ถ้ามี params
  let url = `${API_URL}${endpoint}`;
  if (params) {
    const queryString = new URLSearchParams(params).toString();
    url += `?${queryString}`;
  }

  try {
    const response = await fetch(url, {
      ...fetchOptions,
      headers: {
        "Content-Type": "application/json",
        ...(fetchOptions.headers || {}),
      },
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Response error:", {
        url,
        status: response.status,
        data,
      });
      throw new Error(data.message || "API request failed");
    }

    return data;
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
}