import { useRef, useCallback, useState } from 'react'
// https://www.npmjs.com/package/react-webcam
// https://medium.com/@razibul.ahmed/a-quick-and-dirty-primer-on-using-react-webcam-d3e65faa1a3
import Webcam from "react-webcam";
import styles from './snapshot.module.css'


export default function Snapshot(props) {
  const webcamRef = useRef(null);
  const [imgSrc, setImgSrc] = useState(null);

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImgSrc(imageSrc);
  }, [webcamRef, setImgSrc]);

  return (
    <div className="widget_container">
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
      />
      <button className={styles.button} onClick={capture}>Capture photo</button>
      <hr />
      <h3>Result</h3>
      {imgSrc && (
        <img
          src={imgSrc}
          className={styles.img}
          alt="webcam screenshot"
        />
      )}
    </div>
  );
}