// Uploads an image file to imgbb and returns the hosted URL.
export async function uploadImage(file) {
  const key = process.env.NEXT_PUBLIC_IMGBB_KEY;
  if (!key) throw new Error("Image upload is not set up. Add NEXT_PUBLIC_IMGBB_KEY first.");
  if (file.size > 5 * 1024 * 1024) throw new Error("Pick an image smaller than 5 MB.");
  const form = new FormData();
  form.append("image", file);
  let res;
  try {
    res = await fetch(`https://api.imgbb.com/1/upload?key=${key}`, { method: "POST", body: form });
  } catch {
    throw new Error("The image could not be uploaded. Check your connection and try again.");
  }
  const json = await res.json().catch(() => ({}));
  if (!res.ok || !json?.data?.url) {
    throw new Error("The image could not be uploaded. Try a different file.");
  }
  return json.data.url;
}
