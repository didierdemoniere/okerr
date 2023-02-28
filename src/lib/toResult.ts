import { Ok } from "./Ok.js";
import { Err } from "./Err.js";
import { Result } from "./utils.js";

export function toResult<T, E = unknown>(
  promise: Promise<T>
): Promise<Result<T, E>> {
  return promise.then(Ok, Err);
}
