export default (
  _data: object,
  key: string
): { oldValue: any; data: object } => {
  const data = _data;
  let oldValue: any;
  let t: string = "";
  for (const e of key.split(".")) {
    t += `["${e}"]`;
    if (typeof eval(`data${t}`) == "undefined") break;
  }
  oldValue = eval(`data${t}`);
  if (typeof oldValue != "undefined") eval(`delete data${t}`);
  return { oldValue, data };
};
