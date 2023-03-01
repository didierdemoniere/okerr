import { Err } from "./Err.js";

describe("Err", () => {
  test("Err is a function", () => {
    expect(typeof Err).toBe("function");
  });

  test("Err returns an object with a data property that is undefined", () => {
    expect(Err(1).data).toBeUndefined();
  });

  test("Err returns an object with an error property that is the same as the argument", () => {
    expect(Err(1).error).toBe(1);
  });

  test("Err returns an object with an isErr method that returns true", () => {
    expect(Err(1).isErr()).toBe(true);
  });

  test("Err returns an object with a mapOk method", () => {
    expect(Err(1)).toHaveProperty("mapOk");
  });

  test("Err returns an object with a mapErr method", () => {
    expect(Err(1)).toHaveProperty("mapErr");
  });

  test("Err returns an object with a mapOk method that returns the same object", () => {
    //@ts-ignore
    expect(Err(1).mapOk(() => "some value")).toEqual(Err(1));
  });
});
