const loaderList = [
  "js",
  "jsx",
  "ts",
  "tsx",
  "css",
  "json",
  "text",
  "base64",
  "file",
  "dataurl",
  "binary",
  "default",
] as const;
export type Loader = (typeof loaderList)[number];
const isLoader = (loader: string): loader is Loader =>
  (loaderList as [
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
  ]).includes(loader);

export const getLoader = (
  url: string | URL,
  contentType?: string | null,
): Loader => {
  const ext = url.toString().split(".").pop();
  if (ext && isLoader(ext)) return ext;
  if (ext === "mjs") return "js";
  const mimeType = contentType?.split?.(";")?.[0]?.trim?.() ?? "text/plain";
  return mimeTypeToLoader(mimeType);
};

export const mimeTypeToLoader = (mimeType: string): Loader => {
  const subType = mimeType.split("/")[1] ?? "plain";
  if (/(?:^plain$|^xml|^svg|^x?html)/.test(subType)) {
    return "text";
  }
  if (subType.startsWith("json") || subType.endsWith("+json")) {
    return "json";
  }
  switch (subType) {
    case "javascript":
      return "js";
    case "typescript":
      return "ts";
    case "css":
      return "css";
    default:
      return "text";
  }
};
