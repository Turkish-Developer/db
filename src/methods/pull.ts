import isSameObject from "../utils/isSameObject";

export default (
  _data: object,
  key: string,
  value: any
): { data: object; array: any } => {
  const data = _data;
  let t: string = "";
  key.split(".").forEach((e, i, a) => {
    t += `["${e}"]`;
    if (
      typeof eval(`data${t}`) !== "object" &&
      typeof eval(`data${t}`) !== "undefined" &&
      key.includes(".") &&
      i != a.length - 1
    )
      throw TypeError(
        `${t
          .replaceAll('"', "")
          .replaceAll("[", "")
          .replaceAll("]", ".")
          .slice(0, -1)} is not an object`
      );
    if (typeof eval(`data${t}`) === "undefined")
      throw TypeError(
        `${t
          .replaceAll('"', "")
          .replaceAll("[", "")
          .replaceAll("]", ".")
          .slice(0, -1)} is not an array`
      );
  });
  const array = eval(`data${t}`);

  if (typeof value === "object" && !Array.isArray(value))
    eval(
      `data${t}=${JSON.stringify(array.filter((k) => !isSameObject(k, value)))}`
    );
  else eval(`data${t}=${JSON.stringify(array.filter((e) => e != value))}`);

  return { data, array: eval(`data${t}`) };
};
