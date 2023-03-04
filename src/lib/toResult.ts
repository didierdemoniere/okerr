import { Ok } from "./Ok.js";
import { Err } from "./Err.js";

export function toResult<T, E = unknown>(
  promise: Promise<T>,
  fn?: (reason: any) => E
): Promise<Ok<T> | Err<E>> {
  return promise.then(Ok, !fn ? Err : (e) => Err(fn(e)));
}
