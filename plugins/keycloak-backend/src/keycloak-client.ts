export async function dynamicImport<T>(packageName: string): Promise<T> {
  return import(`${packageName}`);
}

// export async function dynamicImport<T>(packageName: string): Promise<T> {
//   return import(packageName) as Promise<T>;
// }
