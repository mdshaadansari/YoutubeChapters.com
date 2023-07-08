// Content script (content.js)

// Function to send a request to the OpenAI API
async function shortenLine(line) {
  const response = await fetch('https://api.openai.com/v1/engines/davinci-codex/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer YOUR_API_KEY' // Replace with your OpenAI API key
    },
    body: JSON.stringify({
      'prompt': line,
      'max_tokens': 10, // Adjust the value to control the length of the shortened line
      'temperature': 0.3 // Adjust the value to control the randomness of the output
    })
  });

  const data = await response.json();
  return data.choices[0].text.trim();
}

// Function to handle the message from the background script
function handleMessage(request, sender, sendResponse) {
  if (request.action === 'shortenLine') {
    const line = request.line;
    shortenLine(line)
      .then(shortenedLine => {
        // Send the shortened line back to the background script
        sendResponse({ shortenedLine });
      })
      .catch(error => {
        console.error('Error:', error);
        sendResponse({ error: 'An error occurred while shortening the line.' });
      });

    // Return true to indicate that the response will be sent asynchronously
    return true;
  }
}

// Add a listener to handle messages from the background script
chrome.runtime.onMessage.addListener(handleMessage);
