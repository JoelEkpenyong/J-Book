import "./style.scss";
import { useEffect, useRef } from "react";

interface PreviewProps {
  code: string;
  error: string;
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
      const handleError = (err) => {
        const root = document.querySelector('#root');
        root.innerHTML = '<div style="color: red;"> <h4>Runtime Error</h4>' + err + '</div>'
        console.error(err)
      }
      window.addEventListener('error', event => {
        event.preventDefault()
        handleError(event.error)
      })
      window.addEventListener('message', event => {
        try {
          eval(event.data);
        } catch (err) {
          handleError(err)
        }
      }, false);
    </script>
  </body>
</html>
`;

const Preview: React.FC<PreviewProps> = ({ code, error }) => {
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

      {error && <div className="preview-error">{error}</div>}
    </div>
  );
};

export default Preview;
