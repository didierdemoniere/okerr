import { isPromise, isResult, Result } from "./utils.js";

class ERR<E> {
  public readonly data: undefined;
  constructor(public readonly error: E) {}

  public isErr(): this is Err<E> {
    return true;
  }

  mapOk(): Err<E> {
    return this;
  }

  mapErr<R>(
    fn: (err: E) => R
  ): R extends Promise<infer X> ? Promise<chainedErr<X>> : chainedErr<R> {
    const nextErr = fn(this.error);
    if (isPromise(nextErr)) {
      return (nextErr as any).then((err: any) =>
        isResult(err) ? err : new ERR(err)
      );
    }
    return isResult(nextErr) ? (nextErr as any) : new ERR(nextErr);
  }
}

type chainedErr<E> = E extends Result<any, any> ? E : Err<E>;

export type Err<E> = ERR<E>;

export function Err<E>(error: E): Err<E> {
  return new ERR(error);
}
