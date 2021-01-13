import React, { useRef, useEffect, useState } from "react";
// https://stackoverflow.com/questions/55655846/how-to-get-webcam-feed-with-react-hooks
// https://davidwalsh.name/browser-camera

// Remove data base64prefix: https://pqina.nl/doka/blog/converting-a-file-to-a-base64-string/
export default function Snapshot() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [imgData, setImgData] = useState("");
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );

  useEffect(() => {
    if (!videoRef) return;
    // Get access to the camera!
    if (
      !isMobile &&
      navigator.mediaDevices &&
      navigator.mediaDevices.getUserMedia
    ) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then(function (stream) {
          const video = videoRef.current;
          video.srcObject = stream;
          video.play();
        });
    }
  }, [videoRef, isMobile]);

  const takeScreenshot = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    const video = videoRef.current;

    context.drawImage(video, 0, 0, 640, 480);

    const dataUrl = canvas.toDataURL("image/png");
    // base64 string
    console.log("dataUrl", dataUrl);
    setImgData(dataUrl);
  };

  const clearScreenshot = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);
    setImgData("");
  };

  const handleImgSelect = (e) => {
    if (e.target.files && e.target.files[0]) {
      var file = e.target.files[0];
      var reader = new FileReader();
      reader.onloadend = () => {
        // base64 string
        console.log(reader.result);
        setImgData(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="widget_container">
      <h1>snapshot widget</h1>
      <h1>User is on: {isMobile ? "Mobile" : "Desktop"}</h1>
      {isMobile ? (
        <>
          <input
            type="file"
            accept="image/*"
            capture="camera"
            onChange={(e) => handleImgSelect(e)}
          />
          {imgData && <img src={imgData} alt="User Profile" width="320" />}
        </>
      ) : (
        <>
          <video
            id="video"
            ref={videoRef}
            width="640"
            height="480"
            autoPlay
          ></video>
          <button id="snap" onClick={takeScreenshot}>
            Snap Photo
          </button>
          {imgData && <button onClick={clearScreenshot}>Clear</button>}
          <br></br>
          <canvas id="canvas" ref={canvasRef} width="640" height="480"></canvas>
        </>
      )}
    </div>
  );
}
