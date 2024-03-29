import { Ok } from "./lib/Ok.js";
import { Err } from "./lib/Err.js";
import { toResult } from "./lib/toResult.js";

declare global {
  function Ok<T>(value: T): Ok<T>;
  function Err<E>(error: E): Err<E>;

  interface Promise<T> {
    toResult<E>(fn?: (reason: any) => E): ReturnType<typeof toResult<T, E>>;
  }

  type Result<T, E = unknown> = Ok<T> | Err<E>;
}

globalThis.Ok = Ok;
globalThis.Err = Err;

Promise.prototype.toResult = function (fn) {
  return toResult(this, fn);
};

export {};
