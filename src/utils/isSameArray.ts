import isSameObject from "./isSameObject";

const isSameArray = (arrayOne: Array<any>, arrayTwo: Array<any>) => {
  let isSame = true;
  arrayOne.forEach((e) => {
    if (Array.isArray(e)) {
      let same = false;
      arrayTwo.forEach((j) => {
        if (isSameArray(j, e)) same = true;
      });
      if (!same) isSame = false;
    } else if (typeof e == "object") {
      let same = false;
      arrayTwo.forEach((j) => {
        if (isSameObject(e, j)) same = true;
      });
      if (!same) isSame = false;
    } else {
      let same = false;
      arrayTwo.forEach((j) => {
        if (e == j) same = true;
      });
      if (!same) isSame = false;
    }
  });
  return isSame;
};
export default isSameArray;
