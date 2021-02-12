// https://www.typescriptlang.org/docs/handbook/advanced-types.html#index-types
export default function getProperty<T, K extends keyof T>(o: T, propertyName: K): T[K] {
  return o[propertyName];
}