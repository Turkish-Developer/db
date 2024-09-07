import isSameArray from "./isSameArray";

const isSameObject = (objectOne: object, objectTwo: object): boolean => {
  let isSame = true;
  for (const e of Object.keys(objectOne)) {
    if (!Object.keys(objectTwo).includes(e)) isSame = false;
  }
  for (const e of Object.keys(objectOne)) {
    if (!isSame) break;
    if (typeof objectOne[e] != typeof objectTwo[e]) return false;
    if (Array.isArray(objectOne[e])) {
      if (!isSameArray(objectOne[e], objectTwo[e])) return false;
    } else if (typeof objectOne[e] == "object") {
      if (!isSameObject(objectOne[e], objectTwo[e])) return false;
    } else if (objectOne[e] != objectTwo[e]) return false;
  }
  return isSame;
};
export default isSameObject;
