// Background script (background.js)

// Function to send a message to the content script....
function sendMessageToContentScript(message) {
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, message, function(response) {
      if (chrome.runtime.lastError) {
        console.error(chrome.runtime.lastError);
      } else {
        console.log('Shortened Line:', response.shortenedLine);
      }
    });
  });
}

// Function to handle the click event on the browser action icon
function handleBrowserActionClick() {
  const line = prompt('Enter a line to shorten:');
  if (line) {
    const message = { action: 'shortenLine', line: line };
    sendMessageToContentScript(message);
  }
}

// Add a listener for the browser action click event
chrome.browserAction.onClicked.addListener(handleBrowserActionClick);
