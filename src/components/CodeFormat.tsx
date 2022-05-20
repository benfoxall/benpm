import { FC, useEffect, useRef, useState } from "react";
import "./code.scss";
import Worker from "./codeWorker.js?worker";

const worker = new Worker();

const CodeFormat: FC<{ children: string }> = ({ children }) => {
  const [formatted, setFormatted] = useState<string>();

  useEffect(() => {
    setFormatted(undefined);
    if (!children) return;

    // todo, use pool
    worker.postMessage(children);
    worker.addEventListener(
      "message",
      ({ data }) => {
        setFormatted(data);
      },
      { once: true }
    );
  }, [children]);

  return (
    <div>
      {formatted ? (
        <output dangerouslySetInnerHTML={{ __html: formatted }} />
      ) : (
        children
      )}
    </div>
  );
};

export default CodeFormat;
