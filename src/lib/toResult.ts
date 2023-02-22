import { Ok } from "./Ok";
import { Err } from "./Err";

export function toResult<T, E = unknown>(
  promise: Promise<T>
): Promise<Ok<T> | Err<E>> {
  return promise.then(Ok, Err);
}
