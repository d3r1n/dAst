const start = document.querySelector(".start");
const stop = document.querySelector(".stop");
const video = document.querySelector("video");
const link = document.querySelector('a');
let recorder, stream;

link.addEventListener("click",tabs)

async function startRecording() {
  stream = await navigator.mediaDevices.getDisplayMedia({
    video: { mediaSource: "screen" }
  });
  recorder = new MediaRecorder(stream);

  const chunks = [];
  recorder.ondataavailable = e => chunks.push(e.data);
  recorder.onstop = e => {
    const completeBlob = new Blob(chunks, { type: chunks[0].type });
    video.src = URL.createObjectURL(completeBlob);
  };

  recorder.start();
}

start.addEventListener("click", () => {
  start.setAttribute("disabled", true);
  stop.removeAttribute("disabled");

  startRecording();
});

stop.addEventListener("click", () => {
  stop.setAttribute("disabled", true);
  start.removeAttribute("disabled");

  recorder.stop();
  video.style.display = "block";
  stream.getVideoTracks()[0].stop();
});

// stop : <i class="fas fa-stop"></i>

function tabs(e) {
    window.open("http://www.github.com/d3r1n",'');
    window.open("http://www.patreon.com/d3r1n",'');
}
