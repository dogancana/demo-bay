export const isNonNullish = <T>(ref: Nullable<T>): ref is T => {
  return ref !== undefined && ref !== null;
};
