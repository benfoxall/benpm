import hljs from "highlight.js";

self.onmessage = (e) => {
  const { code, filename } = e.data;

  const language = filename.split(".").pop();

  try {
    const result = hljs.highlight(code, { language });
    postMessage(result.value);
  } catch (e) {
    postMessage(code);
  }
};
