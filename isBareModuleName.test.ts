import {assert} from "./deps/assert.ts";
import { isBareModuleName } from "./isBareModuleName.ts";
Deno.test("isBareModuleName", async (t) => {
  await t.step("should return true for bare module names", () => {
    assert(isBareModuleName("react"));
    assert(isBareModuleName("lodash"));
    assert(isBareModuleName("my-package"));
  });

  await t.step("should return false for non-bare module names", () => {
    assert(!isBareModuleName("./relative/path"));
    assert(!isBareModuleName("../relative/path"));
    assert(!isBareModuleName("/absolute/path"));
    assert(!isBareModuleName("http://example.com"));
    assert(!isBareModuleName("https://example.com"));
    assert(!isBareModuleName("file://localhost/absolute/path"));
    assert(!isBareModuleName("file:///absolute/path"));
  });
});