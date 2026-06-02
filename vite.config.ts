import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
const stubNodeBuiltins = {
  name: "stub-node-builtins",
  enforce: "pre" as const,
  resolveId(id: string) {
    if (id.startsWith("node:")) return "\0node-stub";
  },
  load(id: string) {
    if (id !== "\0node-stub") return;
    return `
const noop = () => Promise.resolve(undefined);
const noopSync = () => undefined;
export const realpath = noop; export const lstat = noop; export const readlink = noop;
export const open = noop; export const rename = noop; export const unlink = noop;
export const mkdir = noop; export const readdir = noop; export const readFile = noop;
export const writeFile = noop; export const stat = noop; export const access = noop;
export const createReadStream = noopSync; export const createWriteStream = noopSync;
export const resolve = (...a) => a.join('/'); export const dirname = p => p;
export const basename = p => p; export const join = (...a) => a.join('/');
export const isAbsolute = () => false; export const sep = '/';
export const randomUUID = () => ''; export const promisify = () => () => Promise.resolve();
export const execFile = noopSync; export class Readable {} export const pipeline = noop;
export default {};
`;
  },
};

export default defineConfig({
  plugins: [react(), stubNodeBuiltins],
  base: "/farm-hamal/",
});
