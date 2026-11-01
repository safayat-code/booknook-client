export const formatDate = (d) =>
  new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });

export const safeRedirect = (value) =>
  value && value.startsWith("/") && !value.startsWith("//") ? value : "/";
