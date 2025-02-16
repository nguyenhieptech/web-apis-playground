// https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver

function exampleOne() {
  // Select the node that will be observed for mutations
  const targetNode = document.querySelector('#my-element-1') as HTMLDivElement;

  // Options for the observer (which mutations to observe)
  const config: MutationObserverInit = { attributes: true, childList: true, subtree: true };

  // Callback function to execute when mutations are observed
  function callback(mutationList: MutationRecord[], observer: MutationObserver) {
    for (const mutation of mutationList) {
      if (mutation.type === 'childList') {
        console.log('A child node has been added or removed.');
      } else if (mutation.type === 'attributes') {
        console.log(`The ${mutation.attributeName} attribute was modified.`);
      }
    }
  }

  // Create an observer instance linked to the callback function
  const observer = new MutationObserver(callback);

  // Start observing the target node for configured mutations
  observer.observe(targetNode, config);

  // Later, you can stop observing
  observer.disconnect();
}

function exampleTwo() {
  // Example 2: Detecting When an Element is Removed
  const elementToWatch = document.querySelector('#my-element-2') as HTMLDivElement;

  if (elementToWatch) {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.removedNodes.forEach((removedNode) => {
          if (removedNode === elementToWatch) {
            console.log('Element was removed from the DOM!');
          }
        });
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });

    // Example: Remove element after 5 seconds
    setTimeout(() => {
      elementToWatch.remove();
    }, 5000);
  }
}

function exampleThree() {
  // Example 3: Detecting When an Element is Added
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((addedNode) => {
        if (addedNode.nodeType === Node.ELEMENT_NODE) {
          console.log('Element was added to the DOM!');
        }
      });
    });
  });

  observer.observe(document.body, { childList: true, subtree: true });
}
