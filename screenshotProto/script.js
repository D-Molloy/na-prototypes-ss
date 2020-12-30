// https://developer.mozilla.org/en-US/docs/Web/API/WebRTC_API/Taking_still_photos

(function () {
  var width = 320;    //Whatever size the incoming video is, we're going to scale the resulting image to be 320 pixels wide.
  var height = 0;     // The output height of the image will be computed given the width and the aspect ratio of the stream.
  var streaming = false; //Indicates whether or not there is currently an active stream of video running.
  var video = null; //This will be a reference to the <video> element after the page is done loading.
  var canvas = null; //This will be a reference to the <canvas> element after the page is done loading.
  var photo = null;  //This will be a reference to the <img> element after the page is done loading.
  var startbutton = null; //This will be a reference to the <button> element that's used to trigger capture. We'll get that after the page is done loading.


  // run when the page is finished loading
  // requests access to the user's webcam, initializes the output img to a default state and establishes the event listeners needed to receive each frame of video from the camera and react when the button is clicked to capture an image
  function startup() {
    video = document.getElementById('video');
    canvas = document.getElementById('canvas');
    photo = document.getElementById('photo');
    startbutton = document.getElementById('startbutton');

    //  requesting video stream without audio
    navigator.mediaDevices.getUserMedia({ video: true, audio: false })
      .then(function (stream) {
        video.srcObject = stream;
        video.play();
      })
      .catch(function (err) {
        //Fires if no compatible camera connected OR USER DENIES ACCESS
        console.log("An error occurred: " + err);
      });

    // fired after calling .play() to avoid blocking while waiting for video to kick in
    // callback does nothing unless its the first itme its been called
    // If this is indeed the first run, we set the video's height based on the size difference between the video's actual size, video.videoWidth, and the width at which we're going to render it, width.
    video.addEventListener('canplay', function (ev) {
      if (!streaming) {
        height = video.videoHeight / (video.videoWidth / width);
        // Firefox currently has a bug where the height can't be read from
        // the video, so we will make assumptions if this happens.
        if (isNaN(height)) {
          height = width / (4 / 3);
        }
        video.setAttribute('width', width);
        video.setAttribute('height', height);
        canvas.setAttribute('width', width);
        canvas.setAttribute('height', height);
        // prevent the setup code from running again
        streaming = true;
      }
    }, false);

    startbutton.addEventListener('click', function (ev) {
      takepicture();
      // calls Event.preventDefault() on the received event to prevent the click from being handled more than once
      ev.preventDefault();
    }, false);

    clearphoto();
  }

  // Fill the photo with an indication that none has been
  // captured.

  function clearphoto() {
    // As is the case any time we need to work with the contents of a canvas, we start by getting the 2D drawing context for the hidden canvas.
    var context = canvas.getContext('2d');
    context.fillStyle = "#AAA";
    context.fillRect(0, 0, canvas.width, canvas.height);

    var data = canvas.toDataURL('image/png');
    photo.setAttribute('src', data);
  }

  // Capture a photo by fetching the current contents of the video
  // and drawing it into a canvas, then converting that to a PNG
  // format data URL. By drawing it on an offscreen canvas and then
  // drawing that to the screen, we can change its size and/or apply
  // other changes before drawing it.
  // There's one last function to define, and it's the point to the entire exercise: the takepicture() function, whose job it is to capture the currently displayed video frame, convert it into a PNG file, and display it in the captured frame box.
  function takepicture() {
    // As is the case any time we need to work with the contents of a canvas, we start by getting the 2D drawing context for the hidden canvas.
    var context = canvas.getContext('2d');
    // As is the case any time we need to work with the contents of a canvas, we start by getting the 2D drawing context for the hidden canvas.
    if (width && height) {
      canvas.width = width;
      canvas.height = height;
      // draw the current frame of the video into the context, filling the entire canvas with the frame image.
      context.drawImage(video, 0, 0, width, height);

      var data = canvas.toDataURL('image/png');
      photo.setAttribute('src', data);
    } else {
      clearphoto();
    }
  }
  // Set up our event listener to run the startup process
  // once loading is complete.
  window.addEventListener('load', startup, false);
})()