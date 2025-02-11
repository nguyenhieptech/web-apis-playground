import './style.css';
import typescriptLogo from '/typescript.svg';
import viteLogo from '/vite.svg';

function setupCounter(element: HTMLButtonElement) {
  let counter = 0;
  function setCounter(count: number) {
    counter = count;
    element.innerHTML = `count is ${counter}`;
  }
  element.addEventListener('click', () => setCounter(counter + 1));
  setCounter(0);
}

const app = document.querySelector('#app') as HTMLDivElement;
const btn = document.querySelector('#counter') as HTMLButtonElement;

app.innerHTML = `
  <div>
    <a href="https://vite.dev" target="_blank">
      <img src="${viteLogo}" class="logo" alt="Vite logo" />
    </a>
    <a href="https://www.typescriptlang.org/" target="_blank">
      <img src="${typescriptLogo}" class="logo vanilla" alt="TypeScript logo" />
    </a>
    <h1>Vite + TypeScript</h1>
    <div class="card">
      <button id="counter" type="button">Counter</button>
    </div>
    <p class="text-2xl">
      Click on the Vite and TypeScript logos to learn more
    </p>
  </div>
`;

setupCounter(btn);
