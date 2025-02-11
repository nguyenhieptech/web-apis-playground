// https://www.youtube.com/watch?v=y84tBZo8GFo

import './canvas.css';

const canvas = document.querySelector('#canvas') as HTMLCanvasElement,
  toolButtons = document.querySelectorAll('.tool') as NodeListOf<HTMLButtonElement>,
  fillColor = document.querySelector('#fill-color') as HTMLInputElement,
  sizeSlider = document.querySelector('#size-slider') as HTMLInputElement,
  colorButtons = document.querySelectorAll('.colors .option') as NodeListOf<HTMLButtonElement>,
  colorPicker = document.querySelector('#color-picker')! as HTMLInputElement,
  clearCanvas = document.querySelector('.clear-canvas')! as HTMLButtonElement,
  saveImg = document.querySelector('.save-img') as HTMLButtonElement,
  // context — an object representing entire canvas bitmap
  // https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D
  ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

window.addEventListener('load', () => {
  // Setting canvas width/height.. offset width/height returns viewable width/height of an element
  if (ctx) {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    setCanvasBackground();
  }
});

// Global variables with default value
let prevMouseX: number,
  prevMouseY: number,
  snapshot: ImageData,
  isDrawing = false,
  selectedTool: SelectedTool = 'brush',
  brushWidth = 5,
  selectedColor = '#000';

type SelectedTool = 'brush' | 'eraser' | 'rectangle' | 'circle' | 'triangle';

function setCanvasBackground() {
  // setting whole canvas background to white, so the downloaded img background will be white
  ctx.fillStyle = '#fff';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = selectedColor; // setting fillStyle back to the selectedColor, it'll be the brush color
}

function startDraw(e: MouseEvent) {
  isDrawing = true;
  prevMouseX = e.offsetX; // passing current mouseX position as prevMouseX value
  prevMouseY = e.offsetY; // passing current mouseY position as prevMouseY value
  ctx.beginPath(); // creating new path to draw
  ctx.lineWidth = brushWidth; // passing brushSize as line width
  ctx.strokeStyle = selectedColor; // passing selectedColor as stroke style
  ctx.fillStyle = selectedColor; // passing selectedColor as fill style

  // copying canvas data & passing as snapshot value.. this avoids dragging the image
  snapshot = ctx.getImageData(0, 0, canvas.width, canvas.height);
}

function drawing(e: MouseEvent) {
  if (!isDrawing) return; // if isDrawing is false return from here
  ctx.putImageData(snapshot, 0, 0); // adding copied canvas data on to this canvas
  if (selectedTool === 'brush' || selectedTool === 'eraser') {
    // if selected tool is eraser then set strokeStyle to white
    // to paint white color on to the existing canvas content else set the stroke color to selected color
    ctx.strokeStyle = selectedTool === 'eraser' ? '#fff' : selectedColor;
    ctx.lineTo(e.offsetX, e.offsetY); // creating line according to the mouse pointer
    ctx.stroke(); // drawing/filling line with color
  } else if (selectedTool === 'rectangle') {
    drawRectangle(e);
  } else if (selectedTool === 'circle') {
    drawCircle(e);
  } else {
    drawTriangle(e);
  }
}

function stopDraw() {
  isDrawing = false;
}

function drawRectangle(e: MouseEvent) {
  // if fillColor isn't checked draw a rect with border else draw rect with background
  if (!fillColor?.checked) {
    // creating circle according to the mouse pointer
    return ctx.strokeRect(e.offsetX, e.offsetY, prevMouseX - e.offsetX, prevMouseY - e.offsetY);
  }
  ctx.fillRect(e.offsetX, e.offsetY, prevMouseX - e.offsetX, prevMouseY - e.offsetY);
}

function drawCircle(e: MouseEvent) {
  ctx.beginPath(); // creating new path to draw circle
  // getting radius for circle according to the mouse pointer
  const radius = Math.sqrt(Math.pow(prevMouseX - e.offsetX, 2) + Math.pow(prevMouseY - e.offsetY, 2));
  ctx.arc(prevMouseX, prevMouseY, radius, 0, 2 * Math.PI); // creating circle according to the mouse pointer
  fillColor.checked ? ctx.fill() : ctx.stroke(); // if fillColor is checked fill circle else draw border circle
}

function drawTriangle(e: MouseEvent) {
  ctx.beginPath(); // creating new path to draw circle
  ctx.moveTo(prevMouseX, prevMouseY); // moving triangle to the mouse pointer
  ctx.lineTo(e.offsetX, e.offsetY); // creating first line according to the mouse pointer
  ctx.lineTo(prevMouseX * 2 - e.offsetX, e.offsetY); // creating bottom line of triangle
  ctx.closePath(); // closing path of a triangle so the third line draw automatically
  fillColor.checked ? ctx.fill() : ctx.stroke(); // if fillColor is checked fill triangle else draw border
}

toolButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    // adding click event to all tool option
    // removing active class from the previous option and adding on current clicked option
    document.querySelector('.options .active')?.classList.remove('active');
    btn.classList.add('active');
    selectedTool = btn.id as SelectedTool;
  });
});

sizeSlider.addEventListener('change', () => (brushWidth = Number(sizeSlider.value))); // passing slider value as brushSize

colorButtons.forEach((button) => {
  button.addEventListener('click', () => {
    // adding click event to all color button
    // removing selected class from the previous option and adding on current clicked option
    const previousSelectedColor = document.querySelector('.options .selected');
    previousSelectedColor?.classList.remove('selected');
    button.classList.add('selected');
    // passing selected btn background color as selectedColor value
    selectedColor = window.getComputedStyle(button).getPropertyValue('background-color');
  });
});

colorPicker.addEventListener('change', () => {
  // passing picked color value from color picker to last color btn background
  colorPicker.parentElement!.style.background = colorPicker.value;
  colorPicker.parentElement!.click();
});

clearCanvas.addEventListener('click', () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // clearing whole canvas
  setCanvasBackground();
});

saveImg.addEventListener('click', () => {
  const link = document.createElement('a'); // creating <a> element
  link.download = `${Date.now()}.jpg`; // passing current date as link download value
  link.href = canvas.toDataURL(); // passing canvasData as link href value
  link.click(); // clicking link to download image
});

canvas.addEventListener('mousedown', startDraw);
canvas.addEventListener('mousemove', drawing);
canvas.addEventListener('mouseup', stopDraw);
