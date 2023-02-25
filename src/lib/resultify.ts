import { Ok } from "./Ok.js";
import { Err } from "./Err.js";
import { toResult } from "./toResult.js";

type PromiseType<T extends Promise<any>> = T extends Promise<infer X>
  ? X
  : never;
type ArgumentTypes<F extends Function> = F extends (...args: infer A) => any
  ? A
  : never;

export function resultify<T extends (...args: any[]) => Promise<any>>(
  fn: T
): <E = unknown>(
  ...args: ArgumentTypes<T>
) => Promise<Ok<PromiseType<ReturnType<T>>> | Err<E>> {
  return (...args) => toResult(fn(...args));
}
