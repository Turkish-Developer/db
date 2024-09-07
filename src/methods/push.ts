import get from "./get";

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

    if (typeof eval(`data${t}`) == "undefined" && i != a.length - 1)
      eval(`data${t}={}`);
  });
  if (!Array.isArray(eval(`data${t}`)) && typeof get(data, key) == "undefined")
    eval(`data${t}=[]`);
  else if (
    !Array.isArray(eval(`data${t}`)) &&
    typeof get(data, key) != "undefined"
  )
    throw TypeError(
      `${t
        .replaceAll('"', "")
        .replaceAll("[", "")
        .replaceAll("]", ".")
        .slice(0, -1)} is not an array`
    );
  eval(`data${t}`).push(value);
  return { data, array: eval(`data${t}`) };
};
