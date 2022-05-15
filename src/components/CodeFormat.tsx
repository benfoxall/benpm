import { FC, useEffect, useState } from "react";
import "./code.scss";
import Worker from "./codeWorker.js?worker";

const CodeFormat: FC<{ children: string }> = ({ children }) => {
  const [formatted, setFormatted] = useState<string>();

  useEffect(() => {
    setFormatted(undefined);
    if (!children) return;

    const worker = new Worker();
    worker.postMessage(children);

    worker.addEventListener(
      "message",
      ({ data }) => {
        setFormatted(data);
      },
      { once: true }
    );

    () => worker.terminate();
  }, [children]);

  return (
    <>
      {formatted ? (
        <output dangerouslySetInnerHTML={{ __html: formatted }} />
      ) : (
        children
      )}
    </>
  );
};

export default CodeFormat;
