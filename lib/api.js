const BASE = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000").replace(/\/$/, "");

// Asks Better Auth (same origin) for a short-lived JWT for the logged in user.
async function getToken() {
  try {
    const res = await fetch("/api/auth/token", { credentials: "include", cache: "no-store" });
    if (res.ok) {
      const json = await res.json();
      if (json?.token) return json.token;
    }
  } catch {}
  throw new Error("Your session has expired. Please log in again.");
}

// Small fetch wrapper. With auth: true it attaches the Better Auth JWT.
export async function api(path, { method = "GET", body, auth = false } = {}) {
  const headers = {};
  if (body) headers["Content-Type"] = "application/json";
  if (auth) {
    const token = await getToken();
    headers.Authorization = `Bearer ${token}`;
  }
  let res;
  try {
    res = await fetch(BASE + path, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
      cache: "no-store",
    });
  } catch {
    throw new Error("Could not reach the server. Check your connection and try again.");
  }
  const json = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(json.message || "Something went wrong. Please try again.");
  return json;
}
