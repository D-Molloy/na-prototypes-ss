import React from 'react'
// https://stackoverflow.com/questions/55655846/how-to-get-webcam-feed-with-react-hooks
export default function Snapshot() {
  // var is_mobile = !!navigator.userAgent.match(/iphone|android|blackberry/ig) || false;
  // if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
  //   // true for mobile device
  //   document.write("mobile device");
  // }else{
  //   // false for not mobile device
  //   document.write("not mobile device");
  // }
  console.log('/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)', /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))
  var is_mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)


  return (
    <div className="widget_container">
      <h1>snapshot widget</h1>
      <h1>User is on: {is_mobile ? "Mobile" : "Desktop"}</h1>
      <div className="camera">
        <video id="video">Video stream not available.</video>
        <button id="startbutton">Take photo</button>
      </div>
      <canvas id="canvas">
      </canvas>
      <div className="output">
        <img id="photo" alt="The screen capture will appear in this box." />
      </div>

    </div>
  )
}

