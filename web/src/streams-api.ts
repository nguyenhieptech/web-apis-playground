// https://developer.mozilla.org/en-US/docs/Web/API/Streams_API/Concepts

export async function readData(url: string): Promise<void> {
  const response: Response = await fetch(url);
  const reader: ReadableStreamDefaultReader<Uint8Array> | undefined = response.body?.getReader();
  if (!reader) return; // Handle the case where reader is null
  while (true) {
    const { done, value } = await reader.read();
    if (done) {
      // Do something with last chunk of data then exit reader
      return;
    }
    // Otherwise do something here to process current chunk
    console.log(value); // For example, logging the chunk value
  }
}

const aborter = new AbortController();

const button = document.querySelector('#button') as HTMLButtonElement;

if (button) {
  button.addEventListener('click', () => aborter.abort());
}

logChunks('http://example.com/somefile.txt', { signal: aborter.signal });

async function logChunks(url: string, { signal }: { signal: AbortSignal }): Promise<void> {
  const response: Response = await fetch(url, { signal });
  const reader: ReadableStreamDefaultReader<Uint8Array> = response.body?.getReader()!;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done || signal.aborted) break; // Exit loop if done or aborted
      // Do something with the chunk
      console.log(value); // For example, logging the chunk value
    }
  } finally {
    reader.releaseLock(); // Release the lock when finished or aborted
  }
}
