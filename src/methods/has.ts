import get from "./get";

export default (data: object, key: string): boolean => {
  if (get(data, key)) return true;
  else return false;
};
