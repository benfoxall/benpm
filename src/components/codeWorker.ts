// import Worker from './worker.js?worker'

import hljs from "highlight.js";

self.onmessage = (e) => {
  console.log("Working:", e.data);
  const result = hljs.highlightAuto(e.data);
  postMessage(result.value);
};
