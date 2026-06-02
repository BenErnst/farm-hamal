/* Stub for node:* built-ins pulled in by @anthropic-ai/sdk agent toolset.
   These code paths are never reached in the browser. */

const noop = () => Promise.resolve(undefined);
const noopSync = () => undefined;

// node:fs / node:fs/promises
export const realpath = noop;
export const lstat = noop;
export const readlink = noop;
export const open = noop;
export const rename = noop;
export const unlink = noop;
export const mkdir = noop;
export const readdir = noop;
export const readFile = noop;
export const writeFile = noop;
export const stat = noop;
export const access = noop;
export const createReadStream = noopSync;
export const createWriteStream = noopSync;

// node:path
export const resolve = (...args: string[]) => args.join("/");
export const dirname = (p: string) => p;
export const basename = (p: string) => p;
export const join = (...args: string[]) => args.join("/");
export const isAbsolute = () => false;
export const sep = "/";

// node:crypto
export const randomUUID = () => "";

// node:util
export const promisify = () => () => Promise.resolve(undefined);

// node:child_process
export const execFile = noopSync;

// node:stream
export class Readable {}

// node:stream/promises
export const pipeline = noop;

export default {};
