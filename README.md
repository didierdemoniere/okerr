<div style="text-align:center"><img src="https://raw.githubusercontent.com/didierdemoniere/okerr/main/logo.png" /></div>

A practical Result type inspired by Rust Result.

![Build & tests](https://github.com/didierdemoniere/okerr/actions/workflows/build-and-tests.yml/badge.svg)
![npm bundle size](https://img.shields.io/bundlephobia/minzip/okerr)

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

will import the `Ok` and `Err` global functions, `Result` type and add the `toResult` method to Promises.

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

// function validate(input: Input): Err<ValidationErrors> | Ok<Input>
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

### toResult

catch exceptions from a Promise<T> into a Promise<Ok<T> | Err<E>>

```ts
  import { toResult } from 'okerr';
  // or
  import 'okerr/globals';

  async function someAsyncFunction(value: string): string {
    ...
  }

  const result = await toResult<ApiErrors>(someAsyncFunction(value));
  // or
   const result = await toResult(someAsyncFunction(value), e => e as ApiErrors);
  // or if import 'okerr/globals'
  const result = await someAsyncFunction(value).toResult<ApiErrors>();
  // result: Ok<string> | Err<ApiErrors>
```

### mapOk

naturally bubble errors up the callstack until you want to deal with them.

notice how the following function do not throw
and instead describe precisely all errors it might return without any visible error handling.

```ts
// function getItemsFromApi(input: Input): Promise<Err<ValidationErrors> | Ok<string> | Err<ApiErrors>>
async function getItemsFromApi(input: Input) {
  const validateResult = validate(input);
  // validateResult: Err<ValidationErrors> | Ok<Input>

  const apiCallResult = await validateResult.mapOk(async (value) => {
    return await someAsyncFunction(value).toResult<ApiErrors>();
  });
  // apiCallResult: Err<ValidationErrors> | Ok<string> | Err<ApiErrors>

  return apiCallResult;
}
```

### isErr

```ts
const result = validate({ name: "John", email: "john@email.com" });
// result: Err<ValidationErrors> | Ok<Input>
if (result.isErr()) {
  // result.error: ValidationErrors
  toast(translate(result.error));
  return;
}

// result.data: Input
console.log(result.data);
```

### unwrap

```ts
const { error, data } = validate({ name: "John", email: "john@email.com" });
// error: ValidationErrors | undefined
// data: Input | undefined

if (error) {
  // error: ValidationErrors
  toast(translate(error));
  return;
}
// data: Input
console.log(data);
```

### resultify

transform a function returning Promise<T> into a function returning Promise<Ok<T> | Err<E>>

```ts
import { resultify } from "okerr";

const someAsyncResultFunction = resultify(someAsyncFunction);
// someAsyncResultFunction: <E = unknown>(value: string) => Promise<Ok<string> | Err<E>>

const result = await someAsyncResultFunction<ApiErrors>(value);
// result: Ok<string> | Err<ApiErrors>

// or
const someAsyncResultFunction = resultify(someAsyncFunction)<ApiErrors>;
// someAsyncResultFunction: (value: string) => Promise<Ok<string> | Err<ApiErrors>>

const result = await someAsyncResultFunction(value);
// result: Ok<string> | Err<ApiErrors>
```

### Result

keep return types readable by merging Ok and Err types

```ts
import { Result } from "okerr";
// import 'okerr/globals';

// function getItemsFromApi(input: Input): Promise<Result<string, ValidationErrors | ApiErrors>>
async function getItemsFromApi(
  input: Input
): Result<string, ValidationErrors | ApiErrors> {
  const validateResult = validate(input);
  // validateResult: Err<ValidationErrors> | Ok<Input>

  const apiCallResult = await validateResult.mapOk(async (value) => {
    return await someAsyncFunction(value).toResult<ApiErrors>();
  });
  // apiCallResult: Err<ValidationErrors> | Ok<string> | Err<ApiErrors>

  return apiCallResult;
}
```
