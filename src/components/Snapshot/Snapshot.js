import React from 'react'

export default function Snapshot() {
  return (
    <div className="widget_container">
      <h1>snapshot widget</h1>
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
