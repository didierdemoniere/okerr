class ERR<E> {
  public readonly data: undefined;
  constructor(public readonly error: E) {}

  public isErr(): this is Err<E> {
    return true;
  }

  mapOk(): Err<E> {
    return this;
  }
}

export type Err<E> = ERR<E>;

export function Err<E>(error: E): Err<E> {
  return new ERR(error);
}
