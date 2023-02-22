# OkErr

A practical Result type inspired by Rust Result.

## Why

Errors are normal in an applications lifecycle, they should be regular values and we should be able to know them by looking at function type signatures.

try/catch should be reserved to unexpected events recovery.

## Goals

- integrate nicely with typescript/javascript
- small api surface
- practical over academical

## install

```sh
npm i okerr
```

## usage

```ts
import { Ok, Err } from "okerr";
```

or

```ts
import "okerr/globals";
```

will import `Ok`, `Err` as globals and add the `toResult` method to Promises.

## API

### Ok/Err

```ts
import { Ok, Err } from "okerr";
// import 'okerr/globals';

enum ValidationErrors {
  NameEmpty = "NameEmpty",
  EmailEmpty = "EmailEmpty",
}

interface Input {
  name: string;
  email: string;
}

function validate(input: Input) {
  if (!input.name) {
    return Err(ValidationErrors.NameEmpty);
  }
  if (!input.email) {
    return Err(ValidationErrors.EmailEmpty);
  }
  return Ok(input);
}
```

### unwrap

```ts
const { error, data } = validate({ name: "John", email: "john@email.com" });
if (error) {
  toast(translate(error));
  return;
}

console.log(data);
```

### isErr

```ts
const result = validate({ name: "John", email: "john@email.com" });
if (result.isErr()) {
  toast(translate(result.error));
  return;
}

console.log(result.data);
```

### toResult

transform a Promise<T> into a Promise<Ok<T> | Err<E>>

```ts
  import { toResult } from 'okerr';
  // import 'okerr/globals';

  async function someAsyncFunction(value) {
    ...
  }

  const { error, data } = await toResult<ApiErrors>(someAsyncFunction(value));
  // const { error, data } = await someAsyncFunction(value).toResult<ApiErrors>();
```

### resultify

transform a function returning Promise<T> into a function returning Promise<Ok<T> | Err<E>>

```ts
import { resultify } from "okerr";

const someAsyncResultFunction = resultify(someAsyncFunction);

const { error, data } = await someAsyncResultFunction(value);
```

### mapOk/mapErr

```ts
async function getItemsFromApi(input: Input) {
  return validate(input).mapOk(async (value) => {
    const result = await someAsyncFunction(value).toResult<ApiErrors>();
    if (result.isErr()) {
      return result;
    }
    return doSomeStuff(result.data);
  });
}
```
