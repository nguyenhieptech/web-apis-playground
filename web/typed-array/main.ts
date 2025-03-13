// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray

// Code examples by ChatGPT
// 1️⃣ Reading and Writing a Binary File (File API)
// 📌 Use Case: Loading a binary file and extracting data efficiently.
// Imagine handling a.wav audio file, where the header contains metadata(bitrate, sample rate, etc.),
// and the rest is raw audio data.
async function readBinaryFile(file: File) {
  const arrayBuffer = await file.arrayBuffer();
  const dataView = new DataView(arrayBuffer);
  // Read the first 4 bytes as an unsigned integer (e.g., file size)
  const fileSize = dataView.getUint32(0, true);
  console.log(`File Size: ${fileSize} bytes`);
}
// 🔹 Why use this?
// arrayBuffer() loads binary data.
// DataView allows reading different data types at precise byte offsets.

// 2️⃣ Efficient Image Processing (Canvas API)
// 📌 Use Case: Manipulating pixel data from a canvas.
const canvas = document.createElement('canvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d')!;
canvas.width = 100;
canvas.height = 100;

// Draw something on the canvas
ctx.fillStyle = 'red';
ctx.fillRect(0, 0, 100, 100);

// Get pixel data
const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
const pixelArray = imageData.data; // Uint8ClampedArray (RGBA format)

for (let i = 0; i < pixelArray.length; i += 4) {
  // Invert colors (R = 255 - R, G = 255 - G, etc.)
  pixelArray[i] = 255 - pixelArray[i]; // Red
  pixelArray[i + 1] = 255 - pixelArray[i + 1]; // Green
  pixelArray[i + 2] = 255 - pixelArray[i + 2]; // Blue
}
ctx.putImageData(imageData, 0, 0);
// 🔹 Why use Uint8ClampedArray?
// Pixels are stored as [R, G, B, A] in Uint8ClampedArray.
// Fast and efficient for pixel manipulation

// 3️⃣ Streaming Large Data with WebSockets
// 📌 Use Case: Receiving and processing binary messages from a WebSocket server (e.g., live stock prices).
const socket = new WebSocket('wss://example.com');

socket.binaryType = 'arraybuffer'; // Expect binary data

socket.onmessage = (event) => {
  const buffer = event.data as ArrayBuffer;
  const view = new DataView(buffer);
  // Assume the first 4 bytes contain a float (stock price)
  const stockPrice = view.getFloat32(0, true);
  console.log(`New Stock Price: $${stockPrice}`);
};
// 🔹 Why use ArrayBuffer?
// Reduces network payload size compared to JSON.
// Allows precise parsing of binary formats.

// 4️⃣ Audio Processing (Web Audio API)
// 📌 Use Case: Generating an audio waveform buffer manually.
const audioContext = new AudioContext();
const sampleRate = audioContext.sampleRate;
const frameCount = sampleRate * 2; // 2 seconds of audio

const audioBuffer = audioContext.createBuffer(1, frameCount, sampleRate);
const bufferData = audioBuffer.getChannelData(0); // Float32Array

// Generate a simple sine wave
for (let i = 0; i < frameCount; i++) {
  bufferData[i] = Math.sin((i / sampleRate) * Math.PI * 2 * 440); // 440Hz tone
}

// Play the sound
const source = audioContext.createBufferSource();
source.buffer = audioBuffer;
source.connect(audioContext.destination);
source.start();
// 🔹 Why use Float32Array?
// Audio data requires high precision (floating-point).
// Float32Array optimizes performance for audio waveforms.

// 5️⃣ Working with Large Integers (Cryptography)
// 📌 Use Case: Generating secure random numbers for cryptographic applications.
const cryptoBuffer = new BigUint64Array(1);
crypto.getRandomValues(cryptoBuffer);
console.log(`Random Number: ${cryptoBuffer[0]}`);
// 🔹 Why use BigUint64Array?
// BigInt64Array and BigUint64Array allow handling large numbers securely.
// Useful for encryption keys, UUIDs, or blockchain hashes.

// 6️⃣ WebAssembly Integration
// 📌 Use Case: Passing binary data between JavaScript and WebAssembly (e.g., high-performance game engines).
const memory = new WebAssembly.Memory({ initial: 1 }); // 64KB memory
const buffer = new Uint8Array(memory.buffer);
buffer[0] = 42; // Example: Store a value in WebAssembly memory
console.log(`WASM Memory First Byte: ${buffer[0]}`);
// 🔹 Why use ArrayBuffer?
// Direct access to WebAssembly memory.
// Speeds up communication between JS and WASM.

// Conclusion
// ArrayBuffer & DataView -> Handle raw binary data.
// Typed Arrays (Uint8Array, Float32Array, etc.) -> Efficiently store and process numbers.
// Real-world use cases:
// 1. Binary file processing (ArrayBuffer, DataView)
// 2. Image processing (Uint8ClampedArray)
// 3. WebSockets for binary streaming (ArrayBuffer)
// 4. Audio synthesis (Float32Array)
// 5. Cryptography (BigUint64Array)
// 6. WebAssembly memory handling (ArrayBuffer, Uint8Array)

// Machine Learning Examples Using Low-Level JavaScript Data Structures 🚀
// In machine learning, performance and memory efficiency are crucial.
// JavaScript’s Typed Arrays(Float32Array, Int32Array, etc.) and
// ArrayBuffer help optimize data storage and processing, especially when working
// with WebGL, TensorFlow.js, or WebAssembly.

// 1️⃣ Storing and Manipulating Large Datasets Efficiently
// 📌 Use Case: Loading and normalizing a dataset for model training.
// Simulate a dataset with 1 million floating-point numbers (e.g., pixel intensities)
const dataset = new Float32Array(1_000_000);

// Fill with random values between 0 and 255 (simulating image pixel data)
for (let i = 0; i < dataset.length; i++) {
  dataset[i] = Math.random() * 255;
}

// Normalize to range [0,1]
for (let i = 0; i < dataset.length; i++) {
  dataset[i] /= 255;
}

console.log(dataset.slice(0, 10)); // Print first 10 values
// 🔹 Why use Float32Array?
// Uses 4 bytes per number, reducing memory usage.
// Faster math operations (compared to Number[]).
// Optimized for WebGL & TensorFlow.js.

// 2️⃣ Matrix Operations (Vectorized Computation)
// 📌 Use Case: Implementing a basic neural network layer with matrix multiplication.
function dotProduct(A: Float32Array, B: Float32Array, size: number): Float32Array {
  const result = new Float32Array(size);
  for (let i = 0; i < size; i++) {
    result[i] = A[i] * B[i]; // Element-wise multiplication
  }
  return result;
}

// Example: Multiply two vectors of size 5
const A = new Float32Array([1, 2, 3, 4, 5]);
const B = new Float32Array([6, 7, 8, 9, 10]);

console.log(dotProduct(A, B, 5)); // Output: [6, 14, 24, 36, 50]
// 🔹 Why use Typed Arrays?
// Enables vectorized operations, making them faster than loops over regular arrays.
// TensorFlow.js internally uses similar optimizations.

// 3️⃣ WebGPU for Accelerated Model Inference
// 📌 Use Case: Running ML models using GPU acceleration (WebGPU API).
async function gpuCompute() {
  // @ts-expect-error
  if (!navigator.gpu) {
    console.error('WebGPU is not supported!');
    return;
  }
  // @ts-expect-error
  const adapter = await navigator.gpu.requestAdapter();
  const device = await adapter?.requestDevice();
  const buffer = new Float32Array([1.5, 2.5, 3.5]);
  console.log('GPU computation with TypedArrays ready!', buffer);
}

gpuCompute();
// 🔹 Why use WebGPU?
// Uses GPU for parallel computation, speeding up ML tasks.
// Float32Array is used for optimized tensor processing.

// 4️⃣ Working with TensorFlow.js
// 📌 Use Case: Running a deep learning model with raw Float32Array tensors.
// @ts-expect-error
import * as tf from '@tensorflow/tfjs';

// Create a 3x3 matrix using Float32Array
const tensor = tf.tensor2d(new Float32Array([1, 2, 3, 4, 5, 6, 7, 8, 9]), [3, 3]);

tensor.print(); // Print the matrix

// 🔹 Why use Typed Arrays?
// TensorFlow.js uses Float32Array for GPU acceleration (via WebGL).
// Helps reduce memory overhead in large datasets.

// 5️⃣ Streaming Sensor Data for ML Predictions
// 📌 Use Case: Processing live data (e.g., from IoT sensors or brainwave devices).
const sensorData = new Float32Array(1000); // Buffer for 1000 sensor readings

setInterval(() => {
  // Simulate real-time sensor updates
  for (let i = 0; i < sensorData.length; i++) {
    sensorData[i] = Math.random();
  }

  console.log('Sensor data updated:', sensorData.slice(0, 10));
}, 1000);
// 🔹 Why use Typed Arrays?
// Efficiently stores sensor data (reducing memory fragmentation).
// Fast real-time updates.

// Conclusion
// Typed Arrays (Float32Array, Int32Array) optimize large-scale numerical computations.
// ArrayBuffer & DataView help efficiently store and manipulate binary data.
// Practical ML applications:
// 1. Dataset storage & normalization (Float32Array)
// 2. Matrix operations (dot product, convolution) (Float32Array)
// 3. GPU-based ML (WebGPU, WebGL) (Float32Array for tensor computation)
// 4. Real-time data processing (IoT, brainwave sensors)
