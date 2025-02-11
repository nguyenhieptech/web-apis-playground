// https://developer.mozilla.org/en-US/docs/Web/API/Screen_Capture_API/Using_Screen_Capture

const someDisplayMediaOptions: DisplayMediaStreamOptions = {
  video: {
    displaySurface: 'browser',
  },
  audio: {
    // @ts-expect-error
    suppressLocalAudioPlayback: false,
  },
  preferCurrentTab: false,
  selfBrowserSurface: 'exclude',
  systemAudio: 'include',
  surfaceSwitching: 'include',
  monitorTypeSurfaces: 'include',
};

async function startCapture(displayMediaOptions: DisplayMediaStreamOptions) {
  let captureStream = null;

  try {
    captureStream = await navigator.mediaDevices.getDisplayMedia(displayMediaOptions);
  } catch (err) {
    console.error(`Error: ${err}`);
  }
  return captureStream;
}

startCapture(someDisplayMediaOptions);
