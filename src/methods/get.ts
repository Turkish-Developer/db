export default (data: object, key: string) => {
  let t = data;
  for (const e of key.split(".")) {
    t = t[e];
    if (typeof t == "undefined") break;
  }
  return t;
};
