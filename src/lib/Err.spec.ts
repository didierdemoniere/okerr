import { Err } from "./Err";

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

  test("Err returns an object with a mapErr method that returns a new Err object", () => {
    expect(Err(1).mapErr((x) => x + 1)).toEqual(Err(2));
  });

  test("Err returns an object with a mapErr method that support chaining", () => {
    expect(Err(1).mapErr((x) => Err(x + 4))).toEqual(Err(5));
  });

  test("Err returns an object with a mapErr method that support chaining with a promise", async () => {
    expect(await Err(1).mapErr(async (x) => x + 4)).toEqual(Err(5));
  });

  test("Err returns an object with a mapErr method that support double chaining", async () => {
    expect(await Err(1).mapErr(async (x) => Err(x + 4))).toEqual(Err(5));
  });
});
