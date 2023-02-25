import { Ok } from "./lib/Ok.js";
import { Err } from "./lib/Err.js";
import { toResult } from "./lib/toResult.js";

declare global {
  function Ok<T>(value: T): Ok<T>;
  function Err<E>(error: E): Err<E>;

  interface Promise<T> {
    toResult<E>(): ReturnType<typeof toResult<T, E>>;
  }
}

globalThis.Ok = Ok;
globalThis.Err = Err;

Promise.prototype.toResult = function () {
  return toResult(this);
};

export {};
