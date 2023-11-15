import type { Loader, Plugin } from "./deps/esbuild.ts";

export interface File {
  path: string;
  contents?: string | Uint8Array;
  loader?: Loader;
}
export const virtualFiles = (files: File[]): Plugin => ({
  name: "virtual-files",
  setup({ onLoad }) {
    onLoad({ filter: /.*/ }, (args) => {
      const file = files.find((f) => f.path === args.path);
      if (!file) return;
      return { contents: file.contents, loader: file.loader };
    });
  },
});
