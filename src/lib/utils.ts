import { Ok } from "./Ok";
import { Err } from "./Err";

export function isResult(value: any): boolean {
  return value && typeof value.mapOk === "function";
}

export function isPromise(value: any): boolean {
  return value && typeof value.then === "function";
}

export type Result<T, E = unknown> = Ok<T> | Err<E>;
