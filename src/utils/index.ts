// eslint-disable-next-line no-unused-vars
export type FAs<T, V> = [
  // eslint-disable-next-line no-unused-vars
  (args: V) => Promise<T | null>,
  {
    loading: boolean;
    data: T | null;
  },
];

export default {};
