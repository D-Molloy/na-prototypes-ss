/**
 * SignaturePad npm - https://github.com/szimek/signature_pad
 */

const canvas = document.getElementById("signature-pad");
const resultImg = document.querySelector("#result");
const savePngBtn = document.getElementById("save-png");
const saveJpgBtn = document.getElementById("save-jpeg");
const saveSVGBtn = document.getElementById("save-svg");
const drawBtn = document.getElementById("draw");
const clearBtn = document.getElementById("erase");
// Adjust canvas coordinate space taking into account pixel ratio,
// to make it look crisp on mobile devices.
// This also causes canvas to be cleared.
function resizeCanvas() {
  console.log("resizing");
  // When zoomed out to less than 100%, for some very strange reason,
  // some browsers report devicePixelRatio as less than 1
  // and only part of the canvas is cleared then.
  var ratio = Math.max(window.devicePixelRatio || 1, 1);
  canvas.width = canvas.offsetWidth * ratio;
  canvas.height = canvas.offsetHeight * ratio;
  canvas.getContext("2d").scale(ratio, ratio);
}

window.onresize = resizeCanvas;
resizeCanvas();

const displayImg = (base64) => {
  resultImg.src = base64;
};

var signaturePad = new SignaturePad(canvas, {
  backgroundColor: "rgb(255, 255, 255)", // necessary for saving image as JPEG; can be removed is only saving as PNG or SVG
});

// fetch('//httpbin.org/post', {
//   method: 'POST',
//   headers: {
//     'Content-Type': 'application/json'
//   },
//   body
// });

savePngBtn.addEventListener("click", function () {
  if (signaturePad.isEmpty()) {
    return alert("Please provide a signature first.");
  }

  var data = signaturePad.toDataURL("image/png");
  console.log(`===============PNG==================`);
  console.log(data);
  displayImg(data);
});

saveJpgBtn.addEventListener("click", function () {
  if (signaturePad.isEmpty()) {
    return alert("Please provide a signature first.");
  }

  var data = signaturePad.toDataURL("image/jpeg");
  console.log(`===============JPEG==================`);
  console.log(data);
  displayImg(data);
});

saveSVGBtn.addEventListener("click", function () {
  if (signaturePad.isEmpty()) {
    return alert("Please provide a signature first.");
  }

  var data = signaturePad.toDataURL("image/svg+xml");

  console.log(`===============SVG==================`);
  console.log(data);
  /**
   * atob - https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/atob
   * decode base64 strings
   */
  console.log(atob(data.split(",")[1]));
  displayImg(data);
});

document.getElementById("clear").addEventListener("click", function () {
  signaturePad.clear();
});

/**
 * ctx.globalCompositeOperation - https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/globalCompositeOperation
 */
drawBtn.addEventListener("click", function () {
  var ctx = canvas.getContext("2d");
  ctx.globalCompositeOperation = "source-over"; // default value
});

clearBtn.addEventListener("click", function () {
  var ctx = canvas.getContext("2d");
  ctx.globalCompositeOperation = "destination-out";
});
