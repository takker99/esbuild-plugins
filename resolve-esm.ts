import type { Plugin } from "./deps/esbuild.ts";
import { isBareModuleName } from "./isBareModuleName.ts";

export interface ResolveESMOptions {
  baseURL: URL;
}

export const resolveESM = (
  options: ResolveESMOptions,
): Plugin => ({
  name: "resolve-esm",
  setup({ onResolve, initialOptions: { external = [] } }) {
    const {
      baseURL,
    } = options ?? {};

    external = external.map((path) =>
      isBareModuleName(path) ? path : new URL(path, baseURL).href
    );

    onResolve(
      { filter: /.*/ },
      (args) => {
        if (isBareModuleName(args.path)) {
          return { external: true, path: args.path };
        }
        const importer = args.importer === "<stdin>"
          ? baseURL.href
          : args.importer;
        const path = new URL(args.path, importer).href;

        if (external.includes(path)) return { external: true, path };

        return { path: decodeURI(path), namespace: "resolve-esm"};
      },
    );
  },
});
