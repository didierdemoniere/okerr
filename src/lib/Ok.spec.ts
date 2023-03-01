import { Ok } from "./Ok.js";

describe("Ok", () => {
  test("Ok is a function", () => {
    expect(typeof Ok).toBe("function");
  });

  test("Ok returns an object with a data property that is the same as the argument", () => {
    expect(Ok(1).data).toBe(1);
  });

  test("Ok returns an object with an error property that is undefined", () => {
    expect(Ok(1).error).toBeUndefined();
  });

  test("Ok returns an object with an isErr method that returns false", () => {
    expect(Ok(1).isErr()).toBe(false);
  });

  test("Ok returns an object with a mapOk method", () => {
    expect(Ok(1)).toHaveProperty("mapOk");
  });

  test("Ok returns an object with a mapOk method that returns a new Ok object", () => {
    expect(Ok(1).mapOk((x) => x + 1)).toEqual(Ok(2));
  });

  test("Ok returns an object with a mapOk method that support chaining", () => {
    expect(Ok(1).mapOk((x) => Ok(x + 4))).toEqual(Ok(5));
  });

  test("Ok returns an object with a mapOk method that support chaining with a promise", async () => {
    expect(await Ok(1).mapOk(async (x) => x + 4)).toEqual(Ok(5));
  });

  test("Ok returns an object with a mapOk method that support double chaining", async () => {
    expect(await Ok(1).mapOk(async (x) => Ok(x + 4))).toEqual(Ok(5));
  });
});
