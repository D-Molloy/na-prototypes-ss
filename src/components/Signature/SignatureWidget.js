import { useRef, useState } from "react";
import SignaturePad from "react-signature-canvas";
// https://www.npmjs.com/package/react-signature-canvas
import styles from "./signature.module.css";

export default function SignatureWidget() {
  const sigCanvas = useRef({});
  const [src, setSrc] = useState("");

  const close = () => {
    sigCanvas.current.clear();
    setSrc("");
  };

  const save = () => {
    const base64Str = sigCanvas.current
      .getTrimmedCanvas()
      .toDataURL("image/png");
    console.log("base64Str", base64Str);
    setSrc(base64Str);
  };

  return (
    <div className="widget_container">
      <h1>Signature Widget</h1>
      <SignaturePad
        ref={sigCanvas}
        canvasProps={{ className: styles.sig_canvas }}
      />
      <br />
      <button onClick={close}>Clear</button>
      <button onClick={save}>Save</button>
      <hr />
      <h3>Result</h3>
      <div style={{ backgroundColor: "lightgrey" }}>
        {src && (
          <img src={src} className={styles.sig_img} alt="signature output" />
        )}
      </div>
    </div>
  );
}
