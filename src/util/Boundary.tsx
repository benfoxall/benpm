import { FC, Suspense } from "react";

export const Boundary: FC<{ children: React.ReactNode }> = ({ children }) => {
  return <Suspense fallback={<Fallback />}>{children}</Suspense>;
};

const Fallback = () => <div style={{ opacity: 0.4, padding: 30 }}>…</div>;
