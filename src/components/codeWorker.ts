import hljs from "highlight.js";

self.onmessage = (e) => {
  const result = hljs.highlightAuto(e.data);
  postMessage(result.value);
};
