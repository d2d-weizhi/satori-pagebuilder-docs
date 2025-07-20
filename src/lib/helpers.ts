export function toKebabCase(str: string) {
  return str
    .toLowerCase()
    .replace(/[\s/]+/g, "-")   // Replace spaces or slashes with hyphens
    .replace(/[^a-z0-9-]/g, ""); // Remove any non-alphanumeric/hyphen chars
}