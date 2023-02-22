import { isPromise, isResult, Result } from "./utils";

class OK<T> {
  public readonly error: undefined;
  constructor(public readonly data: T) {}

  public isErr(): false {
    return false;
  }

  mapOk<R>(
    fn: (value: T) => R
  ): R extends Promise<infer X> ? Promise<chainedOK<X>> : chainedOK<R> {
    const nextVal = fn(this.data);
    if (isPromise(nextVal)) {
      return (nextVal as any).then((val: any) =>
        isResult(val) ? val : new OK(val)
      );
    }
    return isResult(nextVal) ? (nextVal as any) : new OK(nextVal);
  }

  mapErr(): Ok<T> {
    return this;
  }
}

type chainedOK<T> = T extends Result<any, any> ? T : Ok<T>;

export type Ok<T> = OK<T>;

export function Ok<T>(value: T): Ok<T> {
  return new OK(value);
}
