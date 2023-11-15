import { assert } from "./deps/assert.ts";
import { getLoader, mimeTypeToLoader } from "./loader.ts";

Deno.test("getLoader", async (t) => {
  await t.step("getLoader with valid extension", () => {
    const url = new URL("https://example.com/file.txt");
    const loader = getLoader(url, "text/plain");
    assert(loader === "text");
  });

  await t.step("getLoader with mjs extension", () => {
    const url = new URL("https://example.com/file.mjs");
    const loader = getLoader(url, "text/plain");
    assert(loader === "js");
  });

  await t.step("getLoader with valid mime type", () => {
    const url = new URL("https://example.com/file");
    const loader = getLoader(url, "application/json");
    assert(loader === "json");
  });

  await t.step("getLoader with invalid extension and mime type", () => {
    const url = new URL("https://example.com/file.xyz");
    const loader = getLoader(url, "application/octet-stream");
    assert(loader === "text");
  });
});

Deno.test("mimeTypeToLoader", () => {
  assert(mimeTypeToLoader("text/plain") === "text");
  assert(mimeTypeToLoader("text/html") === "text");
  assert(mimeTypeToLoader("text/xml") === "text");
  assert(mimeTypeToLoader("text/svg+xml") === "text");
  assert(mimeTypeToLoader("application/xml") === "text");
  assert(mimeTypeToLoader("application/xhtml+xml") === "text");
  assert(mimeTypeToLoader("application/json") === "json");
  assert(mimeTypeToLoader("application/ld+json") === "json");
  assert(mimeTypeToLoader("application/vnd.api+json") === "json");
  assert(mimeTypeToLoader("application/javascript") === "js");
  assert(mimeTypeToLoader("application/typescript") === "ts");
  assert(mimeTypeToLoader("text/css") === "css");
  assert(mimeTypeToLoader("application/octet-stream") === "text");
});
