import { Ok } from "./Ok";
import { Err } from "./Err";
import { toResult } from "./toResult";

export function resultify<T, E = unknown>(
  fn: (...args: any[]) => Promise<T>
): (...args: any[]) => Promise<Ok<T> | Err<E>> {
  return (...args) => toResult(fn(...args));
}
