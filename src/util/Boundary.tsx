import { FC, Suspense } from "react";

export const Boundary: FC<{ children: React.ReactNode }> = ({ children }) => {
  return <Suspense fallback={"loading"}>{children}</Suspense>;
};
