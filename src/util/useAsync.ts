import { DependencyList, useState, useEffect } from "react";

export function useAsync<K>(
  resolve: (control: AbortController) => Promise<K>,
  deps: DependencyList
) {
  const [value, setValue] = useState<K>();

  useEffect(() => {
    const control = new AbortController();

    const proxy: typeof setValue = (value) =>
      control.signal.aborted === false && setValue(value);

    resolve(control).then(
      (value) => proxy(value),
      (err) => {
        if (err.name !== "AbortError")
          proxy(() => {
            throw err;
          });
      }
    );

    return () => {
      control.abort();
    };
  }, deps);

  return value;
}
