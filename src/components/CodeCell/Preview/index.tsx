import "./style.scss";
import { useEffect, useRef } from "react";

interface PreviewProps {
  code: string;
}

const html = `
<html>
  <head>
    <style>
      html {
        background-color: white;
      }
    </style>
  </head>
  <body>
    <div id="root"></div>
    <script>
      window.addEventListener('message', event => {
        try {
          eval(event.data);
        } catch (err) {
          const root = document.querySelector('#root');
          root.innerHTML = '<div style="color: red;"> <h4>Runtime Error</h4>' + err + '</div>'
          throw err
        }
      }, false);
    </script>
  </body>
</html>
`;

const Preview: React.FC<PreviewProps> = ({ code }) => {
  const iFrame = useRef<any>();

  useEffect(() => {
    iFrame.current.srcdoc = html;
    setTimeout(() => {
      iFrame.current.contentWindow.postMessage(code, "*");
    }, 50);
  }, [code]);

  return (
    <div className="preview-wrapper">
      <iframe
        ref={iFrame}
        srcDoc={html}
        title="preview"
        sandbox="allow-scripts allow-modals"
      ></iframe>
    </div>
  );
};

export default Preview;
