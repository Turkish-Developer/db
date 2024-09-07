import get from "./get";

export default (
  _data: object,
  key: string,
  value: any
): { oldValue: any; data: object } => {
  const data = _data;
  let t: string = "";
  let oldValue: any;
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
    if (typeof eval(`data${t}`) == "undefined") eval(`data${t}={}`);
  });
  oldValue = get(data, key);
  eval(`data${t}=${JSON.stringify(value)}`);
  return { oldValue, data };
};
