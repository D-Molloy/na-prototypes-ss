import { useRef, useCallback, useState } from 'react'
// https://www.npmjs.com/package/react-webcam
// https://medium.com/@razibul.ahmed/a-quick-and-dirty-primer-on-using-react-webcam-d3e65faa1a3
import Webcam from "react-webcam";
import styles from './snapshotWebCam.module.css'

// https://stackoverflow.com/questions/55655846/how-to-get-webcam-feed-with-react-hooks
// https://www.digitalocean.com/community/tutorials/front-and-rear-camera-access-with-javascripts-getusermedia

export default function SnapshotWebCam(props) {
  const webcamRef = useRef(null);
  const [imgSrc, setImgSrc] = useState(null);

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImgSrc(imageSrc);
  }, [webcamRef, setImgSrc])


  // need to useRef=> https://reactjs.org/docs/uncontrolled-components.html#the-file-input-tag
  const handleImg = e => {

  };

  return (
    <div className="widget_container">
      <h1>Snapshot Widget</h1>
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
      />
      <button className={styles.button} onClick={capture}>Capture photo</button>
      {/* image file selector - opens camera on mobile automatically */}
      <input type="file" accept="image/*" capture="camera" />
      {/* on mobile - prompts user to take a photo or select from album */}
      <input type="file" accept="image/png;capture=camera" onChange={handleImg} />
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