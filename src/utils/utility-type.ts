export type Permutation<T, K = T> = [T] extends [never]
  ? []
  : K extends T
  ? [K, ...Permutation<Exclude<T, K>>]
  : never;
