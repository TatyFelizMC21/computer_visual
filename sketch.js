//Classifier Variable
let classifier;
// Model URL
let imageModelURL = "https://teachablemachine.withgoogle.com/models/WlWnhPG8W/";

// Video
let video;
let flippedVideo;
// To store the classification
let etiqueta = "";
let confiaza = 0;

// Load the model first
function preload() {
  classifier = ml5.imageClassifier(imageModelURL + "model.json");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  // Create the video
  video = createCapture(VIDEO);
  video.size(windowWidth, windowHeight);
  video.hide();

  // flippedVideo = ml5.flipImage(video);
  // Start classifying
  classifyVideo();
}

function draw() {
  background(0);
  // Draw the video
  image(video, 0, 0);

  if (etiqueta == "CORAZÓN" && confiaza > 0.9) {
    filter(BLUR, 2);
    filter(POSTERIZE, 5);
  } else if (etiqueta == "LIKE" && confiaza > 0.9) {
    filter(INVERT);
    filter(POSTERIZE, 5);
  }
}

// Get a prediction for the current video frame
function classifyVideo() {
  classifier.classify(video, gotResult);
}

// When we get a result
function gotResult(results, error) {
  // If there is an error
  if (error) {
    console.error(error);
    return;
  }

  // The results are in an array ordered by confidence.
  // console.log(results[0]);
  etiqueta = results[0].label;
  confiaza = results[0].confidence;
  // Classifiy again!
  classifyVideo();
}
