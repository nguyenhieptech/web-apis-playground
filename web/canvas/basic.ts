const canvas = document.querySelector('#my-canvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
canvas.width = 800;
canvas.height = 600;

// Basic transform
ctx.translate(100, 100); // Moves the origin to (100,100)
ctx.rotate(Math.PI / 4); // Rotates 45 degrees
ctx.scale(2, 2); // Doubles the size

// Save and Restore Context
ctx.save(); // Saves the current transformation
ctx.translate(50, 50);
ctx.restore(); // Reverts to the previous state

// Drawing Basics

// Rectangles
ctx.fillStyle = 'hsl(173.4 80.4% 40%)'; // teal-500
ctx.fillRect(50, 50, 100, 100); // x, y, width, height
ctx.strokeStyle = 'hsl(175.3 77.4% 26.1%)'; // teal-700
ctx.strokeRect(50, 50, 100, 100); // Draws only the border
ctx.fillStyle = 'hsl(192.9 82.3% 31%)'; // cyan-700
ctx.fillRect(50, 50, 100, 100); // x, y, width, height
ctx.fillStyle = 'hsl(201.3 96.3% 32.2%)'; // sky-700
ctx.fillRect(100, 100, 100, 100);

// Arcs / Circles
ctx.beginPath();
ctx.arc(100, 100, 50, 0, Math.PI * 2);
ctx.fill();

// Lines
ctx.beginPath();
ctx.moveTo(50, 50); // x, y starting point
ctx.lineTo(150, 150); // x, y ending point
ctx.lineTo(200, 200); // x, y ending point
ctx.strokeStyle = '#56abe2'; // Change color
ctx.stroke(); // Draws the line

// Animating with requestAnimationFrame
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear frame
  ctx.fillRect(Math.random() * 400, 50, 100, 100); // Redraw object
  requestAnimationFrame(draw); // Calls draw repeatedly
}
draw();

// Handle images & textures
const img = new Image();
img.src = 'image.png';
img.onload = function () {
  ctx.drawImage(img, 50, 50, 100, 100);
};

// Working with text
ctx.font = '30px Inter';
ctx.fillText('Hello Canvas', 50, 50);

// Interactions
canvas.addEventListener('click', (e) => {
  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  console.log(`Clicked at (${x}, ${y})`);
});

// WebGL
const gl = canvas.getContext('webgl');
console.log(gl); // WebGLRenderingContext
