const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

export const apiFetch = async (endpoint, options = {}) => {
  const token = localStorage.getItem("token");

  const headers = new Headers(options.headers || {});

  if (
    options.body &&
    !(options.body instanceof FormData) &&
    !headers.has("Content-Type")
  ) {
    headers.set("Content-Type", "application/json");
  }

  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  let data = null;

  const contentType = response.headers.get("content-type") || "";

  try {
    if (contentType.includes("application/json")) {
      data = await response.json();
    } else {
      const text = await response.text();
      data = text ? { message: text } : null;
    }
  } catch {
    data = null;
  }

if (!response.ok) {
  console.error("API ERROR:", {
    endpoint,
    status: response.status,
    data,
  });

  const error = new Error(
    data?.message ||
      data?.error ||
      data?.errors?.[0]?.message ||
      `Request failed with status ${response.status}`
  );

  error.status = response.status;
  error.data = data;

  throw error;
}

  return data;
};

export default apiFetch;