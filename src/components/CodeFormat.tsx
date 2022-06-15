import { FC, Fragment, useEffect, useRef, useState } from "react";
import "./code.scss";
import Worker from "./codeWorker.js?worker";

const worker = new Worker();

const CodeFormat: FC<{ children: string; filename: string }> = ({
  children,
  filename,
}) => {
  const [formatted, setFormatted] = useState<string>();

  useEffect(() => {
    setFormatted(undefined);
    if (!children || !filename) return;

    // todo, use pool
    worker.postMessage({ code: children, filename });
    worker.addEventListener(
      "message",
      ({ data }) => {
        setFormatted(data);
      },
      { once: true }
    );
  }, [children, filename]);

  return (
    <pre>
      <code>
        {formatted ? (
          <div dangerouslySetInnerHTML={{ __html: formatted }} />
        ) : (
          children
        )}
      </code>
    </pre>
  );
};

export default CodeFormat;
